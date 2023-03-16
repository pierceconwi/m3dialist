// Load React in order to make a JSX component
import React from "react";
import { 
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast
} from "@chakra-ui/react";
// Import ability to check if user is logged in
import useAuth from "../hooks/useAuth";
// Import addFilm function from the API
import { addFilm } from "../api/films";

// Definte React JSX component
const AddFilm = () => {
    // For every form control, associate a React state
    const [ title, setTitle ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ status, setStatus ] = React.useState("pending");
    const [ isLoading, setIsLoading ] = React.useState(false);
    const toast = useToast();
    // Call useAuth()
    const { isLoggedIn, user } = useAuth();
    // Define function to handle Add Film operation
    const handleFilmCreate = async () => {
        // Is the user logged in?
        if ( !isLoggedIn ) {
            // Alert user that they are not logged in
            toast(
                {
                    title: "You must be logged in to add a film.",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                }
            );
            return;
        } else {
            // User is logged in if control reaches this point
            setIsLoading(true);
            // Build object value template
            const film = {
                title,
                description,
                status,
                userId: user.uid
            };
            // Pass values for "film" to API function addFilm()
            await addFilm(film);
            // Firestore doc should now exist
            setIsLoading(false);
            setTitle("");
            setDesctiption("pending");
            toast(
                {
                    title: "Film added!",
                    status: "Success"
                }
            )
        }
    };
    // Return markup for this AddFilm JSX component
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Film title"
                    value={title}
                    onChange={ (e) => setTitle( e.target.value ) }
                />
                <Textarea 
                    placeholder="Film description"
                    value={description}
                    onChange={ (e) => setDescription( e.target.value ) }
                />
                <Select 
                    value={status}
                    onChange={ (e) => setStatus( e.target.value ) }>
                    <option 
                        value={"unwatched"} 
                        style={{ color: "yellow",fontWeight: "bold" }}
                    >
                        Unwatched
                    </option>
                    <option 
                        value={"watched"} 
                        style={{ color: "green",fontWeight: "bold" }}
                    >
                        Watched
                    </option>
                </Select>
                <Button
                    onClick={ () => handleFilmCreate }
                    disabled={ title.length < 1 || description.length < 1 || isLoading }
                    variantColor="teal"
                    variant="solid"
                >
                    Add Film
                </Button>
            </Stack>
        </Box>
    );
};

export default AddFilm;