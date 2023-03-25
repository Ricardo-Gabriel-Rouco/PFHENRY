import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterBooks, orderByRating, removeFilter, reset } from "../../redux/rootReducer/bookSlice";

export const FilterOptions = ({ setCurrentPage }) => {
  const booksList = useSelector((state) => state.books.allBooks);

  const fliters = useSelector((state) => state.books.filtersApplied);

  const dispatch = useDispatch();

  const formatArray = (array) => {
    let set = new Set(array);
    return Array.from(set);
  };

  const handlerAuthor = (e) => {
    e.preventDefault();
    dispatch(filterBooks(["author", e.target.value]));
    setCurrentPage(1);
  };

  const handlerGenre = (e) => {
    e.preventDefault();
    dispatch(filterBooks(["genre", e.target.value]));
    setCurrentPage(1);
  };

  const handlerRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
  };

  const handlerReset = (e) => {
    e.preventDefault();
    dispatch(reset());
    setCurrentPage(1);
  };

  const handlerRemoveFilter = (e) => {
    e.preventDefault();
    dispatch(removeFilter(e.target.id));
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <select>
          <option value="all" onClick={handlerAuthor}>
            All Authors
          </option>
          {booksList.length &&
            formatArray(booksList.map((elem) => elem.author).sort()).map((elem, index) =>
              elem !== null ? (
                <option key={index} value={elem} onClick={handlerAuthor}>
                  {elem}
                </option>
              ) : null
            )}
        </select>

        <select>
          <option value="all" onClick={handlerGenre}>
            All Genres
          </option>
          {booksList.length &&
            formatArray(booksList.map((elem) => elem.genre).sort()).map((gen, index) => (
              <option key={index} value={gen} onClick={handlerGenre}>
                {gen}
              </option>
            ))}
        </select>

        <select>
          <option value="min" onClick={handlerRating}>
            Min Rating
          </option>
          <option value="max" onClick={handlerRating}>
            Max Rating
          </option>
        </select>

        <select>
          <option value="reset" onClick={handlerReset}>
            Reset
          </option>
        </select>
      </div>

      <dvi>
        {fliters &&
          fliters.map((filter, index) => (
            <div key={index} id={index}>
              <button id={index} onClick={handlerRemoveFilter}>
                X
              </button>
              <p>{filter[1]}</p>
            </div>
          ))}
      </dvi>
    </div>
  );
};
