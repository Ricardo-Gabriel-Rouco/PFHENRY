//import db from "../../firebase-config";
//import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
//import { doc, setDoc, getDocs, query, where } from "firebase/firestore";
import Card from "../Card/Card";
import style from "./CardContainer.module.css";
//import { async } from "@firebase/util";
import { useSelector } from "react-redux";

import Paginate from "../../components/Paginate/Paginate";

import { FilterOptions } from "../filters/FilterOptions";
import { Grid } from "@mui/material";
import Cards from "@mui/material/Card";

// const books = db.collection('books');

const CardContainer = () => {
  const booksList = useSelector((state) => state.books.booksToFilter);

  const [errorFilter, setErrorFilter] = useState();

  // console.log(booksList);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBook = booksList.slice(indexOfFirstBook, indexOfLastBook);

  function nextHandler() {
    const totalBooks = booksList.length; //books.length deberá ser el estado de reduxToolkit de todos los libros.
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
      <FilterOptions setCurrentPage={setCurrentPage} setErrorFilter={setErrorFilter} />
      <Cards>
        <Grid container spacing={1} justifyContent="center">
          {currentBook.map((c, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={c.id}>
              <div key={index}>
                <Card
                  id={c.id}
                  author={c.author}
                  image={c.image}
                  title={c.title}
                  stock={c.stock}
                  price={c.price}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Cards>
      <div className={style.paginate}>
        <Paginate
          paginated={paginated}
          allBooks={booksList.length}
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
