import style from "./FilterOptions.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  filterBooks,
  orderBy,
  removeFilter,
  reset,
} from "../../redux/rootReducer/bookSlice";

export const FilterOptions = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const booksList = useSelector((state) => state.books.booksToFilter);

  useEffect(() => {
    if (Array.isArray(booksList)) {
      setGenres(
        formatArray(booksList.map((elem) => elem.genres).flat()).sort()
      );
      setAuthors(
        formatArray(booksList.map((elem) => elem.authors).flat()).sort()
      );
    }
  }, [booksList]);

  const filters = useSelector((state) => state.books.filtersApplied);

  // eslint-disable-next-line
  const [filterAuthor, setFilterAuthor] = useState(true);
  // eslint-disable-next-line
  const [filterGenre, setFilterGenre] = useState(true);

  // eslint-disable-next-line
  const [defaultGenre, setDefaultGenre] = useState("all");
  const [defaultOrder, setDefaultOrder] = useState("asc");

  const formatArray = (array) => {
    let set = new Set(array);
    return Array.from(set);
  };

  const filterHandler = (e) => {
    dispatch(filterBooks({ [e.target.name]: e.target.value }));
    if (e.target.name === "genres") {
      setDefaultGenre(e.target.value);
    }
    setCurrentPage(1);
  };

  const handlerOrder = (e) => {
    dispatch(orderBy(e.target.value));
    setDefaultOrder(e.target.value);
    setCurrentPage(1);
  };

  const handlerReset = (e) => {
    dispatch(reset());
    setDefaultGenre("all");
    setDefaultOrder("asc");
    setCurrentPage(1);
  };

  const handlerRemoveFilter = (filter) => {
    dispatch(removeFilter(filter));
    setCurrentPage(1);
  };

  if (Array.isArray(booksList) && booksList.length)
    return (
      <div className={style.mainDiv}>
        <div className={style.divFiltersContainer}>
          {authors.length > 1 ? (
            <select
              name="authors"
              id="authors"
              onChange={filterHandler}
              className={style.filters}
            >
              {filters.authors.length ? (
                <option value="all" disabled selected></option>
              ) : null}
              {!filters.authors.length ? (
                <option value="all" disabled selected>
                  All Authors
                </option>
              ) : (
                <option value="all">All Authors</option>
              )}
              {authors.map((elem, index) =>
                elem !== null ? (
                  <option key={index} value={elem} className={style.filters}>
                    {elem}
                  </option>
                ) : null
              )}
            </select>
          ) : null}

          {genres.length > 1 ? (
            <select
              name="genres"
              id="genres"
              onChange={filterHandler}
              className={style.filters}
            >
              {filters.genres.length ? (
                <option value="all" disabled selected></option>
              ) : null}
              {!filters.genres.length ? (
                <option value="all" disabled selected>
                  All Genres
                </option>
              ) : (
                <option value="all">All Genres</option>
              )}
              {genres.map((gen, index) => (
                <option key={index} value={gen} className={style.filters}>
                  {gen}
                </option>
              ))}
            </select>
          ) : null}

          <select
            onChange={handlerOrder}
            className={style.filters}
            value={defaultOrder}
          >
            <option value="asc" className={style.filters}>
              A-Z
            </option>
            <option value="desc" className={style.filters}>
              Z-A
            </option>
            <option value="min" className={style.filters}>
              Min Rating
            </option>
            <option value="max" className={style.filters}>
              Max Rating
            </option>
            <option value="minPrice" className={style.filters}>
              Min price
            </option>
            <option value="maxPrice" className={style.filters}>
              Max price
            </option>
          </select>

         
            <button onClick={handlerReset} className={style.filters}>
              Reset
            </button>

        </div>

        <div className={style.divContainer}>
          {filters.authors
            ? filters.authors.map((filter, index) => (
                <div key={index} id={index} className={style.divFiltersApplied}>
                  <p>{`Authors: ${filter}`}</p>
                  <button
                    id={index}
                    onClick={() => handlerRemoveFilter({ authors: filter })}
                    className={style.btnFiltersApplied}
                  >
                    X
                  </button>
                </div>
              ))
            : null}
          {filters.genres
            ? filters.genres.map((filter, index) => (
                <div key={index} id={index} className={style.divFiltersApplied}>
                  <p>{`Genres: ${filter}`}</p>
                  <button
                    id={index}
                    onClick={() => handlerRemoveFilter({ genres: filter })}
                    className={style.btnFiltersApplied}
                  >
                    X
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
    );
};
