import style from "./FilterOptions.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterBooks, orderBy, removeFilter, reset } from "../../redux/rootReducer/bookSlice";

export const FilterOptions = ({ setCurrentPage, setErrorFilter }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const booksList = useSelector((state) => state.books.allBooks);

  const filtersBooks = useSelector((state) => state.books.booksToFilter);

  const filters = useSelector((state) => state.books.filtersApplied);

  console.log(filtersBooks);

  const [filterAuthor, setFilterAuthor] = useState(true);
  const [filterGenre, setFilterGenre] = useState(true);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const formatArray = (array) => {
    let set = new Set(array);
    return Array.from(set);
  };

  const filterHandler = (e) => {
    e.preventDefault();
    e.target.name === "author" ? setFilterAuthor(false) : setFilterGenre(false);
    dispatch(filterBooks([e.target.name, e.target.value]));
    setCurrentPage(1);
  };

  const handlerOrder = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
  };

  const handlerReset = (e) => {
    e.preventDefault();
    dispatch(reset());
    setFilterAuthor(true);
    setFilterGenre(true);
    setCurrentPage(1);
  };

  const handlerRemoveFilter = (e) => {
    e.preventDefault();
    filters[e.target.id][0] === "author" ? setFilterAuthor(true) : setFilterGenre(true);
    dispatch(removeFilter(e.target.id));
    setCurrentPage(1);
  };

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.divFiltersContainer}>
        {filterAuthor ? (
          <select name="author" id="author" onChange={filterHandler} className={style.filters}>
            <option value="all">All Authors</option>
            {booksList.length &&
              formatArray(booksList.map((elem) => elem.author).sort()).map((elem, index) =>
                elem !== null ? (
                  <option key={index} value={elem} className={style.filters}>
                    {elem}
                  </option>
                ) : null
              )}
          </select>
        ) : null}

        {filterGenre ? (
          <select name="genre" id="genre" onChange={filterHandler} className={style.filters}>
            <option value="all">All Genres</option>
            {booksList.length &&
              formatArray(booksList.map((elem) => elem.genre).sort()).map((gen, index) => (
                <option key={index} value={gen}>
                  {gen}
                </option>
              ))}
          </select>
        ) : null}

        <select onChange={handlerOrder} className={style.filters}>
          <option value="min">Min Rating</option>
          <option value="max">Max Rating</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
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
