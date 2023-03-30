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
        console.log("Usuario creado")
    } catch (error) {
        console.log(error)
    }
}

export async function sigInWithMail(email, password) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res.user.uid)
    } catch (error) {
        console.log(error)
    }
}

export async function logOut() {
    try {
        signOut(auth)
        console.log("Usuario deslogueado")
    } catch (error) {
        console.log(error)
    }
}

export async function verifyUserSesion() {
    onAuthStateChanged(auth, async user => {
        if (user) {
            console.log(`Usuario ${user.uid} logueado`)
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
            console.log(userSnap.data())
        } else {
            console.log('No existe el usuario!');
        }
    } catch (error) {
        console.log(error);
    }
}
