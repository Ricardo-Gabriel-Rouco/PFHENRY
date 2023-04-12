import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import {
  searchBook,
  clearSearchResults,
} from "../../redux/rootReducer/bookSlice";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { border } from "@mui/system";

const SearchBar = ({ placeholder }) => {
  // eslint-disable-next-line
  const books = useSelector((state) => state.books.displayableBooks);

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
      setSearchValue("");
    }
  };

  function filterOptions(options, { inputValue }) {
    // Only show options that include the input value
    return !inputValue.length
      ? ""
      : options
          .filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 5); // Limit the number of displayed options to 5
  }

  return (
    <div className={style.SearchBarContainer}>
      <div className={style.SearchBar}>
        <Paper
          sx={{ display: "flex", alignSelf: "center", width: "80%", p: "0" }}
          //   margin="dense"
        >
          <Autocomplete
            freeSolo
            // id="free-solo-2-demo"
            disableClearable
            options={books.map((el) => el.title)}
            sx={{ flex: 1, width: "100%", borderWidth: "0" }}
            filterOptions={filterOptions}
            value={searchValue}
            onInput={handlerInputChange}
            onKeyDown={handlerKeyDown}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ml: 1, flex: 1, marginLeft: "0", marginRight: "1px" }}
                label="Search book"
                InputLabelProps={{ focused: true, style: { color: "black" } }}
                // margin="dense"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  endAdornment:true
                }}
              />
            )}
          />
          {/* <InputBase
            type="text"
            margin="dense"
            placeholder={placeholder}
            value={searchValue}
            onChange={handlerInputChange}
            className={style.SearchInput}
            onKeyDown={handlerKeyDown}
            sx={{ ml: 1, flex: 1 }}
          /> */}
          <IconButton
            type="button"
            sx={{ p: "px" }}
            aria-label="search"
            onClick={handlerSearchClick}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
};

export default SearchBar;
