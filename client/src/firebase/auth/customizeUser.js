import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export async function updateUser(userId, nickname){
    const userRef = doc(db, 'users', userId)
    try {
        const updateObj = {}
        if (nickname) updateObj.nickname = nickname
        
        await updateDoc(userRef, {...updateObj})
    } catch (error) {
      console.log(error)
    }
  }
  