import { getBooks } from '../../firebase/firestore/books.js';
import {
  addBook,
  searchBook,
  filterBooks,
  removeFilter,
  orderBy,
  reset,
  clearSearchResults,
} from '../rootReducer/bookSlice.js'

export const importBooks = () => {
    return async (dispatch) => {
        try {
            let books = await getBooks();
            
            return dispatch(addBook(books)) 
        } catch (error) {
            console.log(error)
        }   
    }
}


