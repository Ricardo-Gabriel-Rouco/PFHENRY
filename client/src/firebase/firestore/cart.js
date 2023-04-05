import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function postCart(cart, idUser) {
    try {
        const newCart = {
            cartList:cart,
            display: true,
        }
        const collectionRef = collection(db, 'cart')
        const orderRef = doc(collectionRef, idUser)
        await setDoc(orderRef, newCart)
        return "Cart guardado"
    } catch (error) {
      console.log(error)
    }
  }