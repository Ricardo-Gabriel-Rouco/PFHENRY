import { getDocs, query, collection, where, doc, getDoc, updateDoc, addDoc } from "firebase/firestore"
import {db} from '../firebase-config'

export async function getAuthors () {

  const q = query(collection(db, "authors"), where('display', '==', true))
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


export async function getAuthorById (id) {
  try {
    const docsRef = doc(db, 'authors', id)
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

export async function deleteAuthor (id){
  try {
    const docsRef = doc(db, 'authors', id)
    await updateDoc(docsRef, {
      display: false
    })
  } catch (error) {
    console.log(error)
  }
}

export async function postAuthor (name, nationality){
  // validaciones, muchas validaciones

  // fin validaciones
  try {
    const newAuthor = doc(db, 'authors')
    await addDoc(newAuthor, {
      name: name,
      nationality: nationality,
      display: true
    })
  } catch (error) {
    console.log(error)
  }
}
// sugiero traer un objeto que contenga esas propiedades
// la funcion esta trabajando correctamente
export async function modifyAuthor (author){
  try {
    let {id, name, nationality} = author
    const newBook = doc(db, 'author', id)
    await updateDoc(newBook, {
      name: name,
      nationality: nationality
    })
  } catch (error) {
    console.log(error)
  }
}
