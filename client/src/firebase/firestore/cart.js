import { collection, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function postCart(cart, userId) {
  try {
    const newCart = {
      cartList: cart,
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
    const cart = doc(db, "cart", id)
    await deleteDoc(cart)
  } catch (error) {
    console.log(error)
  }
}

export async function getCart(id) {
  try {
    const docRef = doc(db, 'cart', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data().cartList;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}