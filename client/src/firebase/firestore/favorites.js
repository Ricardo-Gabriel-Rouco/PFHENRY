import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function postFav(favorites, userId) {
    try {
        const newFav = {
            favoriteList: favorites,
            display: true,
        }
        const collectionRef = collection(db, 'favorites')
        const favRef = doc(collectionRef, userId)
        await setDoc(favRef, newFav)
        return "Favorites guardado"
    } catch (error) {
        console.log(error)
    }
}

export async function getFavorites(id) {
    try {
      const docRef = doc(db, 'favorites', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          return docSnap.data().favoriteList;
      } else {
        return [];
      }
    } catch (error) {
      console.error(`Error al obtener datos del documento con ID ${id}: `, error);
    }
  }