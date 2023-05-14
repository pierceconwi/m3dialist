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
import { deleteShow, toggleShowStatus } from "../api/shows";

const ShowList = () => {
    const [ shows, setShows ] =  React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setShows([]);
            return;
        }
        const q = query(
            collection(db, "shows"),
            where("user", "==", user.uid)
        );
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
                setShows(ar);
            }
        );
    };
    useEffect(
        () => {
            refreshData();
        },
        [user]
    );
    const handleShowDelete = async (id) => {
        if(
            confirm("Are you sure you want to delete?")
        ) {
            deleteShow(id);
        }
    };
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleShowStatus(
            {
                docId: id,
                status: newStatus
            }
        );
        toast(
            {
                title: `Show marked ${newStatus}`,
                status: newStatus == "completed" ? "success" : "warning"
            }
        );
    };
    return (
        <Box mt={5}>
            <SimpleGrid colums={{ base: 1, md: 3 }} spacing={8}>
                { shows && 
                  shows.map(
                    (show) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark=lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key={show.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            {show.title}
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
                                onClick={ () => handleShowDelete(show.id) }
                            >
                                <FaTrash />
                            </Badge>
                            <Badge
                                color={show.status == "pending" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)"
                                }}
                                float="right"
                                size="xs"
                                onClick={ () => handleToggle(show.id, show.status)}
                            >
                                { show.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                            </Badge>
                            <Badge
                                float="right"
                                opacity="0.8"
                                bg={ show.status == "pending" ? "yellow.500" : "green.500" }
                            >
                                { show.status }
                            </Badge>
                        </Heading>
                        <Text>
                            { show.description }
                        </Text>
                    </Box>
                    )
                  )
                }
            </SimpleGrid>
        </Box>
    );
};

export default ShowList;