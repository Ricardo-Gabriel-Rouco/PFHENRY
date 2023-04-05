import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function postFav(favorites, userId) {
    console.log(favorites.favorites, userId)
    try {
        const newFav = {
            favoriteList: favorites,
            display: true,
        }
        const collectionRef = collection(db, 'favorites')
        const orderRef = doc(collectionRef, userId)
        await setDoc(orderRef, newFav)
        return "Favorites guardado"
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFav(id) {
    try {
      const cart = doc(db, "favorites", id)
      await deleteDoc(cart)
    } catch (error) {
      console.log(error)
    }
  }