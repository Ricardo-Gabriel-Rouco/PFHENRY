import style from './SearchBar.module.css';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { searchBook } from '../../redux/rootReducer/bookSlice';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, Paper, TextField } from '@mui/material';





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
                <Paper sx={{display:'flex',alignSelf:'center', width:'80%'}} margin="dense">
                            <InputBase
                            type="text"
                            margin='dense'
                            placeholder={placeholder}
                            value={searchValue}
                            onChange={handlerInputChange}
                            className={style.SearchInput}
                            onKeyDown={handlerKeyDown}
                            sx={{ml:1,flex:1}}
                            />
                            <IconButton type='button' sx={{p:'px'}} aria-label='search'>
                            <SearchIcon onClick={handlerSearchClick}/>
                    </IconButton>
                </Paper>
            </div>
        </div>

    );
}

export default SearchBar;