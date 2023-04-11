import { getDocs, query, collection, where, doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore"
import {db} from "../src/firebase/firebase-config";
const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.weeklyDiscount = functions.pubsub.schedule('every monday 00:00').onRun(async (context) => {
  const originalDB = query(collection(db, "books"), where('display', '==', true))
  const discountDB = db.collection("discount");

  const querySnapshot = await getDocs(originalDB);
  const books = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    books.push({
      ...doc.data(),
      id: doc.id,
    },
    );
    return books;
  });

  const descuentoIndexes = [];
  for (let i = 0; i < books.length; i++) {
    if (Math.random() < 0.2) { // 20% de los libros
      descuentoIndexes.push(i);
    }
  }

  const batch = db.batch();
  descuentoIndexes.forEach((index) => {
    const book = books[index];
    const discount = 0.15; // Descuento del 15%
    const newPrice = books.price * (1 - discount);
    batch.set(discountDB.doc(book.id), { ...book, price: newPrice });
  });
  await batch.commit();

  return null;
});
