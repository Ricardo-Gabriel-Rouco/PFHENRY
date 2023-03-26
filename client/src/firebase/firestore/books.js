import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { db } from '../firebase-config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export async function getBooks() {

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


export const getBookById = createAsyncThunk(
  'books/getById',
  async (id) => {
    try {
      const docsRef = doc(db, 'books', id);
      const docSnap = await getDoc(docsRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: id };
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);}
  })

export async function deleteBook(id) {
  try {
    const docsRef = doc(db, 'books', id)
    await updateDoc(docsRef, {
      display: false
    })
  } catch (error) {
    console.log(error)
  }
}

export async function postBook(isbn, author, editorial, genre, urlImage, price, rating, title, year) {
  // validaciones, muchas validaciones
  if (isbn.isNaN()) throw new Error('Isbn must be a number')
  if (!isbn.toString().length >= 10 && !isbn.toString().length <= 13) throw new Error("invalid ISBN")
  if (!author) throw new Error('Author must be specified')
  if (!author.isNaN()) throw new Error('Format Error')
  if (!editorial) throw new Error('Editorial must be specified')
  if (!editorial.isNaN()) throw new Error('Format Error')
  if (price.isNaN()) throw new Error('Price must be a number')
  if (price <= 0) throw new Error('Price must be superior than zero')
  if (rating < 0 || rating > 5) throw new Error('Rating must be between 0 and 5')
  if (!title) throw new Error('Title required is')
  // fin validaciones
  try {
    const newBook = doc(db, 'books', `${isbn}`)
    await setDoc(newBook, {
      author: author,
      display: true,
      editorial: editorial,
      genre: genre.map(g => g.id),
      image: urlImage,
      price: price,
      rating: rating,
      title: title,
      year: year
    })
  } catch (error) {
    console.log(error)
  }
}
// despues voy a revisar esta funcion, por favor usarla con precaucion
export async function modifyBook(isbn, author, editorial, genre, urlImage, price, rating, title, year) {
  try {
    const newBook = doc(db, 'books', `${isbn}`)
    await updateDoc(newBook, {
      author: author,
      display: true,
      editorial: editorial,
      genre: genre.map(g => g.id),
      image: urlImage,
      price: price,
      rating: rating,
      title: title,
      year: year
    })
  } catch (error) {
    console.log(error)
  }
} 
