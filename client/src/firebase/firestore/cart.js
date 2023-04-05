import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function postCart(cart, userId) {
  console.log(cart)
  console.log(userId)
    try {
        const newCart = {
            cartList:cart,
            display: true,
        }
        const collectionRef = collection(db, 'cart')
        const orderRef = doc(collectionRef, userId)
        await setDoc(orderRef, newCart)
        return "Cart guardado"
    } catch (error) {
      console.log(error)
    }
  }

  export async function deleteCart(id) {
    try {
      const cart = doc(db,"cart", id)
      await deleteDoc(cart)
    } catch (error) {
      console.log(error)
    }
  }