import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { db } from '../firebase-config';
import { createAsyncThunk } from '@reduxjs/toolkit';

const regexTitle = /^[a-zA-Z0-9\s]+$/
const regexAuthor = /^[a-zA-Z\s]+(\.[a-zA-Z\s]+)*$/;
const regexNumber = /^[0-9]+$/
const regexPublisher = /^[a-zA-Z\s]+$/

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
  if (!book.isbn) throw new Error('ISBN must be specified')
  if (!regexNumber.test(book.isbn.toString())) throw new Error('ISBN must be a number')
  if (!(book.isbn.toString().length !== 10 ^ book.isbn.toString().length !== 13)) throw new Error("Invalid ISBN")
  
  if (!book.title) throw new Error('Title must be specified')
  if (book.title.length > 50) throw new Error ('Title must be at most 50 characters')
  if (!regexTitle.test(book.title)) throw new Error ('Only numbers, letters or spaces are allowed in Title')
  
  if (!book.authors.length) throw new Error('Authors must be specified')
  if (!book.authors[0].length > 50) throw new Error ('Author must be at most 50 characters')
  if (!regexAuthor.test(book.authors[0])) throw new Error ('Only letters or points are allowed in Author')
  
  if (!book.editorial) throw new Error('Publisher must be specified')
  if (!book.editorial.length > 50) throw new Error ('Publisher must be at most 50 characters')
  if (!regexPublisher.test(book.editorial)) throw new Error ('Only letters are allowed in Publisher')
  
  if (book.image === '') throw new Error ('Must insert an image')
  if (book.image === null) throw new Error ('Invalid link or file')

  if (!book.price) throw new Error('Price must be specified')
  if (isNaN(book.price)) throw new Error('Price must be a number')
  if (book.price <= 0) throw new Error('Price must be a positive number')
  
  if (book.year && !regexNumber.test(book.year.toString())) throw new Error('Year must be a number')
  if (book.year && book.year > new Date().getFullYear()) throw new Error('Year must be at most this year')
  // fin validaciones
  try {
    const docsRef = doc(db, 'books', book.isbn);
    const docSnap = await getDoc(docsRef);
    if(!(docSnap.exists())) {

    const newBook = {
      ...book,
      display: true,
    }
      const collectionRef = collection(db, 'books')
      const docRef = doc(collectionRef, book.isbn)
      console.log(newBook)
      await setDoc(docRef, newBook)
      return "Libro creado"
    }
    else{
      return "Ya existe un libro con ese ID"
    }

  } catch (error) {
    console.log(error)
  }
}
// despues voy a revisar esta funcion, por favor usarla con precaucion
export async function modifyBook(isbn, authors, editorial, genres, urlImage, price, rating, title, year) {
  try {
    const newBook = doc(db, 'books', `${isbn}`)
    await updateDoc(newBook, {
      authors: authors,
      display: true,
      editorial: editorial,
      genres: genres.map(g => g.id),
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
