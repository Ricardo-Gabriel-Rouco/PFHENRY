import {auth} from '../firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const createUser = async(mail, password) => {
  try {
    const newUser = createUserWithEmailAndPassword(auth, mail, password)
    return newUser
  }
  catch(error){
    console.log(error)
  }
}