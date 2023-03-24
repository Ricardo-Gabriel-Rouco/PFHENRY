import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterByAuthor } from "../../redux/rootReducer/bookSlice";

export const FilterOptions = ({ setCurrentPage }) => {
  const booksList = useSelector((state) => state.books.allBooks);

  const dispatch = useDispatch();

  console.log(setCurrentPage);

  const handlerAuthor = (e) => {
    e.preventDefault();
    dispatch(filterByAuthor(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <select>
        <option value="all" onClick={handlerAuthor}>
          All Authors
        </option>
        {booksList.length &&
          booksList.map((elem, index) => (
            <option key={index} value={elem.author} onClick={handlerAuthor}>
              {elem.author}
            </option>
          ))}
      </select>
    </div>
  );
};
