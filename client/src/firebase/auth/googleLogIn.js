import {provider, auth, db} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'



export async function registerWithGoogle(){
  try {
    const res = await signInWithPopup(auth, provider)
    const newUser = {
        uid: res.user.uid,
        rol: "USER",
        email:res.user.email,
        display: true,
        fullname: res.user.displayName,
        nickname: res.user.displayName,
    }
    const collectionRef = collection(db, 'users')
    const userRef = doc(collectionRef, res.user.uid)
    await setDoc(userRef, newUser)
    console.log("Usuario creado")
  } catch (error) {
    console.log(error)
  }
}