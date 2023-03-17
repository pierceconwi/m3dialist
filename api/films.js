// This file is for interaction with Firestore database
import { db } from "../firebase";
// 
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

// create an async function as an arrow function
const addFilm = async ( { userId, title, description, status } ) => {
    try {
        await addDoc(
            // reference the Firestore database and films doc within
            collection(db, "films"),
            {
                // Format: app var name: firestore doc var name
                user: userId,
                title: title,
                description: description,
                status: status,
                createdAt: new Date().getTime()
            }
        );
    } catch (err) {
        console.log(err);
    }
};

const toggleFilmStatus = async ( { docId, status } ) => {
    try {
        // reference existing Firestore doc by id
        const filmRef = doc(db, "films", docId);
        // update specified doc
        await updateDoc(
            docId,
            {
                status: status
            }
        )
    } catch (err) {
        console.log(err);
    }
};

const deleteFilm = async ( docId ) => {
    try {
        // reference existing Firestore doc by id
        const filmRef = doc(db, "films", docId);
        await deleteDoc( filmRef );
    } catch (err) {
        console.log(err);
    }
};

export { addFilm, toggleFilmStatus, deleteFilm };