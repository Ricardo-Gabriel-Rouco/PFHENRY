import { AutocompleteArrayInput } from "react-admin";
import { getGenres } from "../../../firebase/firestore/genres";
import { useEffect, useState } from "react";
import styles from "./BookForm.module.css";
import ErrorIcon from "@mui/icons-material/Error";

export const GenreList = ({ errors, allGenres, genres, setGenres }) => {
  const [customInput, setCustomInput] = useState("");
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    setGenresList(allGenres);
  }, [allGenres]);

  return (
    <div>
      <AutocompleteArrayInput
        label="Genres"
        source="genres"
        choices={genresList}
        optionValue="name"
        inputValue={genres}
        onChange={(value) => setGenres(Array.from(new Set(value.filter(el=>el!==undefined))))}
        onCreate={(value) => {
          const newValue = { id: genresList.length, name: value.toUpperCase() };
          setGenresList(Array.from(new Set([...genresList, newValue])));
          return newValue;
        }}
      />

      {errors.genres ? (
        <p className={styles.formError}>
          <ErrorIcon />
          {errors.genres && errors.genres}
        </p>
      ) : null}
    </div>
  );
};
