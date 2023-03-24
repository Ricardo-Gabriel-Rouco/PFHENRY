import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterByAuthor, filterByGenre } from "../../redux/rootReducer/bookSlice";

export const FilterOptions = ({ setCurrentPage }) => {
  const booksList = useSelector((state) => state.books.allBooks);

  const dispatch = useDispatch();

  const formatArray = (array) => {
    let set = new Set(array);
    return Array.from(set);
  };

  const handlerAuthor = (e) => {
    e.preventDefault();
    dispatch(filterByAuthor(e.target.value));
    setCurrentPage(1);
  };

  const handlerGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  };

  return (
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
    </div>
  );
};
