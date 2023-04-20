import { doc, updateDoc } from "firebase/firestore";
import { uploadImage } from "../storage";
import { db } from "../firebase-config";

export async function updateUser(userId, nickname, profile, adress){
    const userRef = doc(db, 'users', userId)
    let imageProfile
    if(profile) imageProfile = await uploadImage(profile, 'file', userId)
    try {
        const updateObj = {}
        if (nickname) updateObj.nickname = nickname
        if (profile) updateObj.profile = imageProfile
        if (adress) updateObj.adress = adress
        await updateDoc(userRef, {...updateObj})
        
    } catch (error) {
      console.log(error)
    }
  }
  