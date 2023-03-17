import React from "react";
import {
    Box,
    Button,
    Link,
    Text,
    useColorMode
} from "@chakra-ui/react";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

// React JSX login component
const Auth = () => {
    let { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth() || {};
    
    // Define function to perform login operation
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        // Async calls w/ promise
        signInWithPopup(
            auth,
            provider
        ).then(
            // Promise results available in .then
            (result) => {
                // Provides Google Access Token to access Google API
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // Should now be able to get info about user who is logged in
                const user = result.user;
            }
        ).catch(
            (error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("Authentication error " + errorCode + " " + errorMessage + " " + email + " " + credential);
            }
        );
    };
    // Define React JSX component
    return (
        <Box position={"fixed"} top="5%" right="5%">
            <Button onClick={() => toggleColorMode()}>
                {colorMode = "dark" ? <FaSun /> : <FaMoon />}
            </Button>
            {" "}
            {isLoggedIn && (
                <>
                    <Text color="green.500">{user.email}</Text>
                    <Link color="red.500" onClick={ () => auth.signOut() }>
                        Logout
                    </Link>
                </>
            )}
            {!isLoggedIn && (
                <Button leftIcon={<FaGoogle />} onClick={ () => handleAuth() } colorScheme="green">
                    Login
                </Button>
            )}
        </Box>
    );
};

export default Auth;