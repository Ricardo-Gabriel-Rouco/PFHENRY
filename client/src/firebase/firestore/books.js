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

export async function postBook(book) {
  // validaciones, muchas validaciones
  if (isNaN(book.isbn)) throw new Error('Isbn must be a number')
  if (!(book.isbn.toString().length !== 10 ^ book.isbn.toString().length !== 13)) throw new Error("invalid ISBN")
  if (!book.author) throw new Error('Author must be specified')
  if (!isNaN(book.author)) throw new Error('Format Error')
  if (!book.editorial) throw new Error('Editorial must be specified')
  if (!isNaN(book.editorial)) throw new Error('Format Error')
  if (isNaN(book.price)) throw new Error('Price must be a number')
  if (book.price <= 0) throw new Error('Price must be superior than zero')
  if (!book.title) throw new Error('Title is required')
  if (isNaN(book.year)) throw new Error('Year must be a number')
  if (book.year && book.year > new Date().getFullYear()) throw new Error('Year must be at most this year')
  // fin validaciones
  try {
    const newBook = {
      author: book.author,
      display: true,
      editorial: book.editorial,
      genre: book.genres,
      image: book.image.link,
      price: book.price,
      title: book.title,
      year: book.year
    }
    const collectionRef = collection(db, 'books')
    const docRef = doc(collectionRef, book.isbn)
    console.log(newBook)
    await setDoc(docRef, newBook)
    return "Libro creado"
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
