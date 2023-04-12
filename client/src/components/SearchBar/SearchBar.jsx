import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import {
  searchBook
} from "../../redux/rootReducer/bookSlice";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {matchSorter} from 'match-sorter';


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

  const handlerSearchClick = (value) => {
    if(typeof(value) !== "string")
      value=searchValue
    // console.log(value)
    
    dispatch(searchBook(value));
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
      : matchSorter(options, inputValue)
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
            blurOnSelect
            options={books.map((el) => el.title)}
            sx={{ flex: 1, width: "100%", borderWidth: "0" }}
            filterOptions={filterOptions}
            value={searchValue}
            onInput={handlerInputChange}
            onChange={(e,value)=>handlerSearchClick(value)}
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
