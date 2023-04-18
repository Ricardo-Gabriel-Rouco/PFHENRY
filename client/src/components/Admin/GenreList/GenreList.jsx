import { AutocompleteArrayInput, ChipsArrayInput, SimpleForm } from "react-admin"
import { getGenres } from "../../../firebase/firestore/genres"
import { useEffect, useState } from "react"
import styles from "./BookForm.module.css";
import ErrorIcon from "@mui/icons-material/Error";

export const GenreList = ({errors,defaultValue}) =>{
  const [selectedGenre,setSelectedGenre]=useState([null])
  const [genresList,setGenresList]=useState([])

useEffect(()=>{
  const fetchGenres = async () =>{
    const allGenres = await getGenres();
    setGenresList(allGenres)
  }
  fetchGenres()
},[])
  
const finalChoices = genresList.map(genres=>({
  id:genres.id,
  name:genres.name}))


  
  
  
  return(
    <div>
      <AutocompleteArrayInput
      defaultValue={defaultValue}
      label='Genres'
      source='genres'
      choices={finalChoices}
      optionText='name'
      optionValue='name'
      onChange={(event,newValue)=>setSelectedGenre(newValue)}
      />
      
      {errors.genres ? (
                <p className={styles.formError}>
                  <ErrorIcon />
                  {errors.genres && errors.genres}
                </p>
              ) : null} 


    </div>
    

  )
}


