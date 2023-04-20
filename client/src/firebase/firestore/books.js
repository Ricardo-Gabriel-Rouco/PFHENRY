import {
  getDocs,
  query,
  collection,
  where,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase-config";

const regexTitle = /^[a-zA-Z0-9\s]+$/;
const regexAuthor = /^[a-zA-Z\s]+(\.[a-zA-Z\s]+)*$/;
const regexNumber = /^[0-9]+$/;
const regexPublisher = /^[a-zA-Z\s]+$/;

export async function getBooks() {
  const q = query(collection(db, "books"), where("display", "==", true));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return data;
}

export async function getAllTheBooks() {
  const q = query(collection(db, "books"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return data;
}

export async function getBookById(id) {
  try {
    const docsRef = doc(db, "books", id);
    const docSnap = await getDoc(docsRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: id };
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBook(id) {
  try {
    const docsRef = doc(db, "books", id);
    await updateDoc(docsRef, {
      display: false,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function postBook(book) {
  // validaciones, muchas validaciones
  if (!book.isbn) throw new Error("ISBN must be specified");
  if (!regexNumber.test(book.isbn.toString()))
    throw new Error("ISBN must be a number");
  if (
    !(
      (book.isbn.toString().length !== 10) ^
      (book.isbn.toString().length !== 13)
    )
  )
    throw new Error("Invalid ISBN");

  if (!book.title) throw new Error("Title must be specified");
  if (book.title.length > 100)
    throw new Error("Title must be at most 100 characters");
  if (!regexTitle.test(book.title))
    throw new Error("Only numbers, letters or spaces are allowed in Title");

  if (book.image === "") throw new Error("Must insert an image");
  if (book.image === null) throw new Error("Invalid link or file");

  if (!book.authors.length)
    throw new Error("At least one author must be specified");
  else {
    try {
      book.authors.forEach((el) => {
        if (el.length > 50) throw 50;
        if (!regexAuthor.test(el)) throw "RegExp failed";
      });
    } catch (err) {
      if (err === 50)
        throw new Error("Authors must be at most 50 characters each");
      else throw new Error("Only letters or points are allowed");
    }
  }

  if (!book.editorial) throw new Error("Publisher must be specified");
  if (!book.editorial.length > 50)
    throw new Error("Publisher must be at most 50 characters");
  if (!regexPublisher.test(book.editorial))
    throw new Error("Only letters are allowed in Publisher");

  if (!book.price) throw new Error("Price must be specified");
  if (isNaN(book.price)) throw new Error("Price must be a number");
  if (book.price <= 0) throw new Error("Price must be a positive number");

  if (book.year && !regexNumber.test(book.year.toString()))
    throw new Error("Year must be a number");
  if (book.year && book.year > new Date().getFullYear())
    throw new Error("Year must be at most this year");

  if (!book.genres.length)
    throw new Error("At least one genre must be specified");
  else {
    try {
      book.genres.forEach((el) => {
        if (el.length > 50) throw 50;
        if (!regexPublisher.test(el)) throw "RegExp failed";
      });
    } catch (err) {
      if (err === 50)
        throw new Error("Genres must be at most 50 characters each");
      else throw new Error("Only letters are allowed");
    }
  }
  // fin validaciones
  try {
    const docsRef = doc(db, "books", book.isbn);
    const docSnap = await getDoc(docsRef);
    if (!docSnap.exists()) {
      const newBook = {
        ...book,
        display: true,
      };
      const collectionRef = collection(db, "books");
      const docRef = doc(collectionRef, book.isbn);
      console.log(newBook);
      await setDoc(docRef, newBook);
      return {
        date: newBook,
      };
    } else {
      return { error: "Ya existe un libro con ese ID" };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Error al crear el libro",
    };
  }
}
// despues voy a revisar esta funcion, por favor usarla con precaucion
export async function modifyBook(isbn, props) {
  try {
    const newBook = doc(db, "books", `${isbn}`);
    await updateDoc(newBook, props);
  } catch (error) {
    console.log(error);
  }
}

// Metodo update para Reviews
// Propuesta para mañana: solo guardar el id del ususario(userId) y con eso buscar el nombre del usuario, para asi prevenimos los cambios
// lo que causaria que eliminemos directamente la propiedad nickname
export async function updateBookReviews({
  id,
  nickname,
  comment,
  rating,
  display,
  userId,
}) {
  try {
    const udBookReview = doc(db, "books", id);
    await updateDoc(udBookReview, {
      reviews: arrayUnion({
        comment,
        rating,
        userId,
        user: nickname,
        display,
      }),
    });
    return alert("Comment register!");
  } catch (error) {
    console.log(error);
  }
}
