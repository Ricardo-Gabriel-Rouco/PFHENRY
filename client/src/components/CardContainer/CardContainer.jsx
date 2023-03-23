import db from "../../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { doc, setDoc, getDocs, query, where } from "firebase/firestore";
import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { async } from "@firebase/util";
import { useSelector } from "react-redux";

import Paginate from "../../components/Paginate/Paginate";

// const books = db.collection('books');

const CardContainer = () => {
  const [books, setBooks] = useState([1, 2, 3]);

  const booksList = useSelector((state) => state.books.booksToFilter);

  console.log(booksList);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(1);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBook = booksList.slice(indexOfFirstBook, indexOfLastBook);

  function nextHandler() {
    const totalBooks = books.length; //books.length deberá ser el estado de reduxToolkit de todos los libros.
    const nextPage = currentPage;
    const firstIndex = nextPage * booksPerPage;
    if (firstIndex >= totalBooks) return;

    setCurrentPage(currentPage + 1);
  }

  function prevHandler() {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    setCurrentPage(prevPage);
  }

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={style.container}>
      <Card currentBook={currentBook} />

      <div className={style.paginate}>
        <Paginate
          paginated={paginated}
          allBooks={books.length}
          booksPerPage={booksPerPage}
          currentPage={currentPage}
          nextHandler={nextHandler}
          prevHandler={prevHandler}
        />
      </div>
    </div>
  );
};

export default CardContainer;
