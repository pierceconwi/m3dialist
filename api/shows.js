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