import style from './SearchBar.module.css';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { searchBook,clearSearchResults } from '../../redux/rootReducer/bookSlice';






const SearchBar = ({
    placeholder,
}) => {
    //ESTADO PARA SETEAR LOS VALORES DE BUSQUEDA
    const [searchValue,setSearchValue]= useState("");
    //ESTADO PARA LOS RESULTADOS DE LA BUSQUEDA
    const dispatch = useDispatch()
    // HANDLER DEL BOTON DE CLEAR DE LA SEARCHBAR
    const handleClearClick = () =>{
        setSearchValue("");
        dispatch(clearSearchResults())
    }
    // HANDLER DEL INPUT CHANGE TOMA EL VALOR PARA COMPARAR
    const handlerInputChange = (e) =>{
        setSearchValue(e.target.value)
    }

    //HANDLER DEL BOTON DE BUSQUEDA
    const handlerSearchClick = () =>{
        dispatch(searchBook(searchValue))
        }
    

    //FUNCION QUE FILTRA 





    return (
        <div className={style.SearchBarContainer}>
            <div className={style.SearchBar}>
                <input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handlerInputChange}
                />
                <button onClick={handlerSearchClick}>Search</button>
                <button onClick={handleClearClick}>Clear</button>
            </div>
        </div>

    );
}

export default SearchBar;