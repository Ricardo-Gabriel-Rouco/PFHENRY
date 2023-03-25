import { getDocs, query, collection, where, doc, getDoc, updateDoc, addDoc, setDoc } from "firebase/firestore"
import {db} from '../firebase-config'

export async function getEditors () {

  const q = query(collection(db, "editorial"), where('display', '==', true))
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


export async function getEditorById (id) {
  try {
    const docsRef = doc(db, 'editorial', id)
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

export async function deleteEditor (id){
  try {
    const docsRef = doc(db, 'editorial', id)
    await updateDoc(docsRef, {
      display: false
    })
  } catch (error) {
    console.log(error)
  }
}

export async function postEditor (name){
  // validaciones, muchas validaciones

  // fin validaciones
  try {
    const newAuthor = doc(db, 'editorial')
    await addDoc(newAuthor, {
      name: name,
      display: true
    })
  } catch (error) {
    console.log(error)
  }
}
// despues voy a revisar esta funcion, por favor usarla con precaucion
export async function modifyEditor (name, id){
  try {
    const newBook = doc(db, 'editorial', id)
    await updateDoc(newBook, {
      name: name,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function addEditorialAllBooks() {
  try {
    const q = query(collection(db, "books"))
    const querySnapshot = await getDocs(q);
    let editorial = [];
    querySnapshot.forEach((doc) => {
      if(doc.data().editorial !== null){
        editorial.push(
          doc.data().editorial.toUpperCase(),
        )
      }  
    })
    editorial = [...new Set(editorial)]
    const editorialRef = collection(db, 'editorial')
    console.log(editorial)
    editorial.forEach(async (editorial, id) => {
      const docRef = doc(editorialRef, id.toString()); // Utilizar el método "doc()" para establecer el ID del documento
      await setDoc(docRef, { // Utilizar "setDoc()" en lugar de "addDoc()"
        name: editorial,
        display: true
      })
    })
  } catch (error) {
    console.log(error)
  }
}
