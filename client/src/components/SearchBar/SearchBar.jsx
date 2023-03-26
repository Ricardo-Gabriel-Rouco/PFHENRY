import style from './SearchBar.module.css';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { searchBook } from '../../redux/rootReducer/bookSlice';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';





const SearchBar = ({
    placeholder,
}) => {
    //ESTADO PARA SETEAR LOS VALORES DE BUSQUEDA
    const [searchValue,setSearchValue]= useState("");
    //ESTADO PARA LOS RESULTADOS DE LA BUSQUEDA
    const dispatch = useDispatch()
    // HANDLER DEL INPUT CHANGE TOMA EL VALOR PARA COMPARAR
    const handlerInputChange = (e) =>{
        setSearchValue(e.target.value)
    }

    //HANDLER DEL BOTON DE BUSQUEDA
    const handlerSearchClick = () =>{
        dispatch(searchBook(searchValue))
        setSearchValue("")
        }
    

    //ENTER BUTTON 
    const handlerKeyDown = (e)=>{
        if(e.key === 'Enter'){
            handlerSearchClick()
        }
    }

    


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(searchBook(searchValue))
        }}


    return (
        <div className={style.SearchBarContainer}>
            <div className={style.SearchBar}>
                <input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handlerInputChange}
                className={style.SearchInput}
                onKeyDown={handlerKeyDown}

                />
                <div className={style.SearchBarButtonContainer}>
                <button onClick={handlerSearchClick} className={style.SearchBarButton}><SearchOutlinedIcon/></button>
                </div>
            </div>
        </div>

    );
}

export default SearchBar;