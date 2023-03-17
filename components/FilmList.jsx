import React, { useEffect } from "react";
import { 
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {
    collection,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteFilm, toggleFilmStatus } from "../api/films";

// Define the React JSX component for the list
const FilmList = () => {
    const [ films, setFilms ] =  React.useState([]);
    const { isLoggedIn, user } = useAuth() || {};
    const toast = useToast();
    // Func which will update the list from Firestore DB
    const refreshData = () => {
        if (!user) {
            setFilms([]);
            return;
        }
        // If browser control hits this point, a user is logged in
        // Query Firestore collection
        const q = query(
            collection(db, "films"),
            where("user", "==", user.uid)
        );
        // Because query() is async, set up event handler w Firebase
        onSnapshot(
            q,
            (querySnapshot) => {
                // Results from q in querySnapshot
                let ar = [];
                // Loop through each doc in the results
                querySnapshot.docs.forEach(
                    (doc) => {
                        ar.push(
                            {
                                id: doc.id,
                                // If doc.data returns anything, capture it:
                                ...doc.data()
                            }
                        );
                    }
                );
                setFilms(ar);
            }
        );
    };
    // Tell React to update UI with refreshData().
    useEffect(
        () => {
            refreshData();
        },
        [user]
    );
    // Build nested function to delete a film from list
    const handleFilmDelete = async (id) => {
        if(
            confirm("Are you sure you want to delete?")
        ) {
            deleteFilm(id);
        }
    };
    // Build nested function to toggle status
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleFilmStatus(
            {
                docId: id,
                status: newStatus
            }
        );
        toast(
            {
                title: `Film marked ${newStatus}`,
                status: newStatus == "completed" ? "success" : "warning"
            }
        );
    };
    // Define JSX component to return
    return (
        <Box mt={5}>
            <SimpleGrid colums={{ base: 1, md: 3 }} spacing={8}>
                { films && 
                  films.map(
                    (film) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark=lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            {film.title}
                            {" "}
                            <Badge
                                color="red.500"
                                bg="inherit"
                                transition="0.2s"
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)"
                                }}
                                float="right"
                                size="xs"
                                onClick={ () => handleFilmDelete(film.id) }
                            >
                                <FaTrash />
                            </Badge>
                            <Badge
                                color={film.status == "pending" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)"
                                }}
                                float="right"
                                size="xs"
                                onClick={ () => handleToggle(film.id, film.status)}
                            >
                                { film.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                            </Badge>
                            <Badge
                                float="right"
                                opacity="0.8"
                                bg={ film.status == "pending" ? "yellow.500" : "green.500" }
                            >
                                { film.status }
                            </Badge>
                        </Heading>
                        <Text>
                            { film.description }
                        </Text>
                    </Box>
                    )
                  )
                }
            </SimpleGrid>
        </Box>
    );
};

export default FilmList;