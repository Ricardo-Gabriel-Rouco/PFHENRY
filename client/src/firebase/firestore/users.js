import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore"
import { db } from '../firebase-config';



export async function getAllTheUsers() {

  const q = query(collection(db, "users"))
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({
      ...doc.data(),
      id: doc.id
    }
    )
  })
  return data
}

export async function modifyUser(uid, display) {
  try {
    const userRef = doc(db, 'users', `${uid}`)
    await updateDoc(userRef, {
      display ,

    })
  } catch (error) {
    console.log(error)
  }
}



