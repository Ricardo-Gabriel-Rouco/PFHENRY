import db from '../../firebase-config'
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import Card from '../Card/Card';
import style from './CardContainer.module.css'

const CardContainer = () => {

  const [book, setBook] = useState([])

    useEffect(() => {
        // en este caso tenemos dos opciones, usamos getData o onSnapshot, la diferencia es que cada vez que 
        // se actualiza la db, 
        // onSnapshot envia la data nueva sin necesidad de un refresh
    
      onSnapshot(collection(db, 'books'), (snapshot) =>{
      setBook(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}) ))
    })
    }, [])

    return (
      <div className={style.container}>
      Esto es CardContainer y contiene:
      {book.map((book, j) =>(
        <Card 
        key={j} 
        title={book.title}
        stock={book.stock}
        price={book.price}/>
      ))}
      <Card />
      </div>


    );
}

export default CardContainer;