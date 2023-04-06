import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export async function createUser(email, password) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
            uid: res.user.uid,
            rol: "USER",
            display: true,
        }
        const collectionRef = collection(db, 'users')
        const userRef = doc(collectionRef, res.user.uid)
        await setDoc(userRef, newUser)
    } catch (error) {
        throw error
    }
}

export async function sigInWithMail(email, password) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res
    } catch (error) {
        throw error
    }
}

export async function logOut() {
    try {
        signOut(auth)
    } catch (error) {
        console.log(error)
    }
}

export async function verifyUserSesion() {
    await onAuthStateChanged(auth, currentUser => {
        if (currentUser) {
            return currentUser.uid
        }
        else {
            console.log("No hay ningun usuario logueado")
        }
    })
}

export async function getUserById(uid) {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return {...userSnap.data()}
        } else {
            console.log('No existe el usuario!');
        }
    } catch (error) {
        console.log(error);
    }
}
