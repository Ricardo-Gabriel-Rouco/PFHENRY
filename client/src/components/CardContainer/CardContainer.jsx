//import db from "../../firebase-config";
//import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

//import { doc, setDoc, getDocs, query, where } from "firebase/firestore";
import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { useSelector } from "react-redux";
import Paginate from "../../components/Paginate/Paginate";
import { FilterOptions } from "../filters/FilterOptions";

import { Grid } from "@mui/material";
import Cards from "@mui/material/Card";
import loading from "../../Assets/Loading.gif";
import notFound from "../../Assets/notFound.gif";

const CardContainer = () => {
  const filteredBooks = useSelector((state) => state.books.booksToFilter);

  //PAGINATED
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBook = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  function nextHandler() {
    const totalBooks = filteredBooks.length; //books.length deberá ser el estado de reduxToolkit de todos los libros.
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

  useEffect(() => {
    paginated(1);
  }, [filteredBooks]);

  return (
    <div className={style.container}>
      {filteredBooks.length ? (
        <FilterOptions setCurrentPage={setCurrentPage} />
      ) : null}
      {filteredBooks === "not found" ? (
        <div className={style.notFound}>
          <h1>No books were found</h1>
          <img src={notFound} alt="Not Found" />
        </div>
      ) : filteredBooks.length ? (
        <Cards>
          <Grid container spacing={1} justifyContent="center">
            {currentBook.map((c, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={c.id}>
                <div key={index}>
                  <Card
                    id={c.id}
                    authors={c.authors}
                    image={c.image}
                    title={c.title}
                    price={c.price}
                    editorial={c.editorial}
                    display={c.display}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </Cards>
      ) : (
        //<ComponentError />
        <img src={loading} alt="loading" />
      )}

      {Array.isArray(filteredBooks) && filteredBooks.length ? (
        <div className={style.paginate}>
          <Paginate
            paginated={paginated}
            allBooks={filteredBooks.length}
            booksPerPage={booksPerPage}
            currentPage={currentPage}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CardContainer;
