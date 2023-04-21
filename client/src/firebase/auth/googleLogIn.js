import {provider, auth, db} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { getUserById } from "./auth";


export async function registerWithGoogle(){
  try {
    const res = await signInWithPopup(auth, provider)
    const currentUser = await getUserById(res.user.uid)
    const newUser = {
      uid: res.user.uid,
      rol: currentUser.rol || "USER",
      email: res.user.email,
      display: true,
      nickname: res.user.displayName,
      profilePicture: res.user.photoURL
    }
    const collectionRef = collection(db, 'users')
    const userRef = doc(collectionRef, res.user.uid)
    await setDoc(userRef, newUser)
  } catch (error) {
    console.log(error)
  }
}