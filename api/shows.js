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

const addShow = async ( { userId, title, description, status } ) => {
    try {
        await addDoc(
            collection(db, "shows"),
            {
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

const toggleShowStatus = async ( { docId, status } ) => {
    try {
        const showRef = doc(db, "shows", docId);
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

const deleteShow = async ( docId ) => {
    try {
        const showRef = doc(db, "shows", docId);
        await deleteDoc( showRef );
    } catch (err) {
        console.log(err);
    }
};

export { addShow, toggleShowStatus, deleteShow };