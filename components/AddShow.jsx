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
import useAuth from "../hooks/useAuth";
import { addShow } from "../api/shows";

const AddShow = () => {
    const [ title, setTitle ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ status, setStatus ] = React.useState("pending");
    const [ isLoading, setIsLoading ] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth() || {};
    const handleShowCreate = async () => {
        if ( !isLoggedIn ) {
            toast(
                {
                    title: "You must be logged in to add a show.",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                }
            );
            return;
        } else {
            setIsLoading(true);
            const show = {
                title,
                description,
                status,
                userId: user.uid
            };
            await addShow(show);
            setIsLoading(false);
            setTitle("");
            setDescription("pending");
            toast(
                {
                    title: "Show added!",
                    status: "success"
                }
            );
            await new Promise(r => setTimeout(r, 1500));
            window.location.assign("/");
        }
    };
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Show title"
                    value={title}
                    onChange={ (e) => setTitle( e.target.value ) }
                />
                <Textarea 
                    placeholder="Show description"
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
                        Unwatched ⌛
                    </option>
                    <option 
                        value={"watched"} 
                        style={{ color: "green",fontWeight: "bold" }}
                    >
                        Watched ✅
                    </option>
                </Select>
                <Button
                    onClick={ () => handleShowCreate() }
                    disabled={ title.length < 1 || description.length < 1 || isLoading }
                    colorScheme="green"
                    variant="solid"
                >
                    Add Show
                </Button>
            </Stack>
        </Box>
    );
};

export default AddShow;