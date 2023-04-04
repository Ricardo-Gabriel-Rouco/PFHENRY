import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { db } from '../firebase-config';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
      console.log(error)
    }
  }