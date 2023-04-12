import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import {
  searchBook,
  // clearSearchResults,
} from "../../redux/rootReducer/bookSlice";
import SearchIcon from "@mui/icons-material/Search";

import { IconButton, InputBase, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ placeholder }) => {
  // eslint-disable-next-line
  const books = useSelector((state) => state.books.booksToFilter);

  // console.log(books)

  //ESTADO PARA SETEAR LOS VALORES DE BUSQUEDA
  const [searchValue, setSearchValue] = useState("");
  //ESTADO PARA LOS RESULTADOS DE LA BUSQUEDA
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // HANDLER DEL INPUT CHANGE TOMA EL VALOR PARA COMPARAR
  const handlerInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  //HANDLER DEL BOTON DE BUSQUEDA

  const handlerSearchClick = () => {
    dispatch(searchBook(searchValue));
    setSearchValue("");
    navigate("/home");
  };
  //ENTER BUTTON
  const handlerKeyDown = (e) => {
    if (e.key === "Enter") {
      handlerSearchClick();
    }
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          alignSelf: "center",
          width: "80%",
          borderColor: "primary",
          borderRadius: "10px",
          boxShadow: "-0.2px 0.4px 0.4px 0.95px rgba(255, 253, 231, 0.9)",
          bgcolor: "secondary",
        }}
        margin="dense"
      >
        <InputBase
          type="text"
          margin="dense"
          placeholder={placeholder}
          value={searchValue}
          onChange={handlerInputChange}
          onKeyDown={handlerKeyDown}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton
          type="button"
          sx={{ p: "px" }}
          aria-label="search"
          onClick={handlerSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default SearchBar;
