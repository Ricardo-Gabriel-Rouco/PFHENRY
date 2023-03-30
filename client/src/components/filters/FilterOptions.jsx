import style from "./FilterOptions.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  filterBooks,
  orderBy,
  removeFilter,
  reset,
  display,
} from "../../redux/rootReducer/bookSlice";

export const FilterOptions = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const [genres,setGenres] = useState([])
  const [authors, setAuthors] = useState([])

  
  const booksList = useSelector((state) => state.books.booksToFilter);
  
  useEffect(() => {
    setGenres(formatArray(booksList.map((elem) => elem.genres).flat()).sort())
    setAuthors(formatArray(booksList.map((elem) => elem.authors).flat()).sort())
  }, [booksList]);

  const filters = useSelector((state) => state.books.filtersApplied);

  const [filterAuthor, setFilterAuthor] = useState(true);
  const [filterGenre, setFilterGenre] = useState(true);

  const [defaultGenre, setDefaultGenre] = useState("all");
  const [defaultOrder, setDefaultOrder] = useState("asc");

  const formatArray = (array) => {
    let set = new Set(array);
    return Array.from(set);
  };

  const filterHandler = (e) => {
    e.preventDefault();
    e.target.name === "authors" ? setFilterAuthor(false) : setFilterGenre(false);
    dispatch(filterBooks([e.target.name, e.target.value]));
    if (e.target.name === "genres") {
      setDefaultGenre(e.target.value);
    }
    setCurrentPage(1);
  };

  const handlerOrder = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setDefaultOrder(e.target.value);
    setCurrentPage(1);
  };

  const handlerReset = (e) => {
    e.preventDefault();
    dispatch(reset());
    setFilterAuthor(true);
    setFilterGenre(true);
    dispatch(display(true));
    setDefaultGenre("all");
    setDefaultOrder("asc");
    setCurrentPage(1);
  };

  const handlerRemoveFilter = (e) => {
    e.preventDefault();
    filters[e.target.id][0] === "authors" ? setFilterAuthor(true) : setFilterGenre(true);
    dispatch(removeFilter(e.target.id));
    dispatch(display(true));
    setCurrentPage(1);
  };

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.divFiltersContainer}>
        {booksList.length && filterAuthor ? (
          <select name="authors" id="authors" onChange={filterHandler} className={style.filters}>
            <option value="all">All Authors</option>
            {authors.sort().map((elem, index) =>
                elem !== null ? (
                  <option key={index} value={elem} className={style.filters}>
                    {elem}
                  </option>
                ) : null
              )}
          </select>
        ) : null}

        {booksList.length && filterGenre?
        <select
          name="genres"
          id="genres"
          onChange={filterHandler}
          className={style.filters}
        >
          <option value="all">All Genres</option>
          {booksList.length &&
            genres.map((gen, index) => (
              <option key={index} value={gen}>
                {gen}
              </option>
            ))}
        </select>
        :null}

        <select onChange={handlerOrder} className={style.filters} value={defaultOrder}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="min">Min Rating</option>
          <option value="max">Max Rating</option>
          <option value="minPrice">Min price</option>
          <option value="maxPrice">Max price</option>
        </select>

        <button onClick={handlerReset} className={style.filters}>
          Reset
        </button>
      </div>

      <div className={style.divContainer}>
        {filters &&
          filters.map((filter, index) => (
            <div key={index} id={index} className={style.divFiltersApplied}>
              <p>{`${capitalize(filter[0])}: ${filter[1]}`}</p>
              <button id={index} onClick={handlerRemoveFilter} className={style.btnFiltersApplied}>
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
