import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
    // Define a state variable and associated function to change its value
    const [ user, setUser ] = useState(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    // Ask React to manage our state variables based on the block of code we provide
    useEffect(
        // pass anonymous arrow func to react's useEffect()
        () => {
            auth.onAuthStateChanged(
                // we are passing another anon func to firebase's onAuthStateChanged
                (user) => {
                    // with the user object value that firebase returns, set react states
                    // 1) is there a user and 2) is there a user ID, then TRUE, otherwise return FALSE
                    setIsLoggedIn( user && user.uid ? true : false );
                    setUser( user );
                }
            );
        }
    );
}

export default useAuth;