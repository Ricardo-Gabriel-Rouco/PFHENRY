import { getDocs, query, collection, where, doc, getDoc, updateDoc } from "firebase/firestore"
import {db} from './firebase-config'

export async function getBooks () {

  const q = query(collection(db, "books"), where('display', '==', true))
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


export async function getBookById (id) {
  try {
    const docsRef = doc(db, 'books', id)
    const docSnap = await getDoc(docsRef)
    if (docSnap.exists()) {
        return {...docSnap.data(), id: id};
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  } catch (error) {
    console.log(error)
  }
}

export async function deleteBook (id){
  try {
    const docsRef = doc(db, 'books', id)
    await updateDoc(docsRef, {
      display: false
    })
  } catch (error) {
    console.log(error)
  }
}



//   id = Number(id)
//   const q = query(collection(db, "books"), where("id", "==", id))
//   const querySnapshot = await getDocs(q);
//   let data = [];
//   querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//     data.push({
//       ...doc.data(),
//       id:doc.id
//     })
//   })
//   return data