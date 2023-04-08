import { collection, doc, setDoc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function postOrder(order) {
    try {
        const newOrder = {
            ...order,
            display: true,
        }
        const collectionRef = collection(db, 'orders')
        const orderRef = doc(collectionRef, order.idOrder)
        console.log(orderRef)
        await setDoc(orderRef, newOrder)
        return "Orden creado"
    } catch (error) {
      return error
    }
  }

  export async function modifyOrder(status) {
    try {
      const findOrder = doc(db, 'orders', `${isbn}`)
      await updateDoc(newBook, {
        authors: authors,
        display: true,
        editorial: editorial,
        genres: genres.map(g => g.id),
        image: urlImage,
        price: price,
        rating: rating,
        title: title,
        year: year
      })
    } catch (error) {
      console.log(error)
    }
  } 