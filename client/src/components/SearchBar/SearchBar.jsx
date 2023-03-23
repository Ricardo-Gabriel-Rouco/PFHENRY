import style from './SearchBar.module.css';
import { useState } from 'react';


const SearchBar = ({
    placeholder,
    filterType,
    setCurrentPage
}) => {
    const [searchValue,setSearchValue]= useState("");
    const clearSearchBar = () =>{
        setSearchValue("")
    }

    const handleInputChange = (e) =>{
        setSearchValue(e.target.value.toLowerCase())
    }


    return (
        <div className={style.SearchBar}>
            <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            />
            <button onClick={clearSearchBar}>Clear</button>
        </div>

    );
}

export default SearchBar;