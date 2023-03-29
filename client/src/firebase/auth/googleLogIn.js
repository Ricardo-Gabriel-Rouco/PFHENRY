import {provider, auth} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'

export async function registerWithGoogle(){
  try {
    signInWithPopup(auth, provider)
  } catch (error) {
    console.log(error)
  }
}