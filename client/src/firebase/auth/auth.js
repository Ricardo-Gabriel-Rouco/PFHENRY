// import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { uploadImage } from "../storage";
import { collection, setDoc, doc, getDoc, getDocs ,query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export async function createUser(email, password, nickName, adress, profilePicture) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const profile = await uploadImage(profilePicture, res.user.uid)
        const newUser = {
            uid: res.user.uid,
            email:res.user.email,
            nickname: nickName,
            rol: "USER",
            adress: adress,
            display: true,
            profilePicture: profile
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

export async function getUserByName(name){
    try {
        const userRef = collection(db, 'users')
        const q = query((userRef), where('nickname', '==', name))
        const querySnapshot = await getDocs(q)
        return querySnapshot.data()
    } catch (error) {
        console.log(error)
    }
}
