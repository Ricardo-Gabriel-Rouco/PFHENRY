import { getDocs, query, collection, where, doc, getDoc, updateDoc, addDoc, setDoc } from "firebase/firestore"
import { db } from '../firebase-config'

export async function getGenres() {

  const q = query(collection(db, "genres"))
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({
      ...doc.data(),
      // id: doc.id
    }
    )
  })
  return data
}


export async function getGenreById(id) {
  try {
    const docsRef = doc(db, 'genres', id)
    const docSnap = await getDoc(docsRef)
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: id };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error)
  }
}

export async function deleteGenre(id) {
  try {
    const docsRef = doc(db, 'genres', id)
    await updateDoc(docsRef, {
      display: false
    })
  } catch (error) {
    console.log(error)
  }
}

export async function postGenre(name) {
  // validaciones, muchas validaciones

  // fin validaciones
  try {
    const newGenre = doc(db, 'genres')
    await addDoc(newGenre, {
      name: name,
      display: true
    })
  } catch (error) {
    console.log(error)
  }
}
// despues voy a revisar esta funcion, por favor usarla con precaucion
export async function modifyGenre(name, id) {
  try {
    const newBook = doc(db, 'genres', id)
    await updateDoc(newBook, {
      name: name,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function addGenreAllBooks() {
  try {
    const q = query(collection(db, "books"))
    const querySnapshot = await getDocs(q);
    let genres = [];
    querySnapshot.forEach((doc) => {
      genres.push(
        doc.data().genre.toUpperCase(),
      )
    })
    genres = [...new Set(genres)]
    const genresRef = collection(db, 'genres')
    console.log(genres)
    genres.forEach(async (genre, id) => {
      const docRef = doc(genresRef, id.toString()); // Utilizar el método "doc()" para establecer el ID del documento
      await setDoc(docRef, { // Utilizar "setDoc()" en lugar de "addDoc()"
        name: genre,
        display: true
      })
    })
  } catch (error) {
    console.log(error)
  }
}