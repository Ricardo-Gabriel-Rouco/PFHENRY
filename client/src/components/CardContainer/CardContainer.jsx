import db from '../../firebase-config'
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { doc, setDoc, getDocs, query, where } from "firebase/firestore";

import Card from '../Card/Card';
import style from './CardContainer.module.css'
import { async } from '@firebase/util';

// const books = db.collection('books');

const CardContainer = () => {

  const [books, setBooks] = useState([])

  useEffect(() => {
      
    ///////////OBTENER TODOS LOS DATOS
    
    (async()=>{
      // const q = query(collection(db, "cities"), where("capital", "==", true));  //con capital === true
      const q = query(collection(db, "books"));
      const querySnapshot = await getDocs(q);
      
      
      let data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({
          ...doc.data(),
          id:doc.id
        })
      });
      setBooks(data)
     
     
    })()
  }, [])

  return (
    <div className={style.container}>
    Esto es CardContainer y contiene:
    {books.map((book, j) =>(
      <Card 
      key={j} 
      title={book.title}
      stock={book.stock}
      price={book.price}/>
    ))}
    
    </div>


  );
}

export default CardContainer;