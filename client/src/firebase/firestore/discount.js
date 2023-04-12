import { addDoc, collection, query, where, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase-config';

export const applyDiscounts = async () => {
    const originalDB = query(collection(db, "books"), where('display', '==', true));
    const discountDB = collection(db, 'discount');

    const querySnapshot = await getDocs(originalDB);
    const querySnapshot2 = await getDocs(collection(db, 'discount'));
    querySnapshot2.forEach((doc) => {
        deleteDoc(doc.ref);
    });
    const books = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        books.push({
            ...doc.data(),
            id: doc.id
        });
    });

    const descuentoIndexes = [];
    for (let i = 0; i < books.length && descuentoIndexes.length <= 11; i++) {
        if (Math.random() < 0.5) { // 50% de los libros
            descuentoIndexes.push(i);
        }
    }

    const discountDocs = await getDocs(collection(db, 'discount'));
    const existingDiscounts = discountDocs.docs.map((doc) => doc.data());

    descuentoIndexes.forEach(index => {
        const book = books[index];
        const discount = 0.15; // Descuento del 15%
        const newPrice = book.price * (1 - discount);
        const existingDiscount = existingDiscounts.find((discountDoc) => discountDoc.bookId === book.id);
        if (existingDiscount) {
            setDoc(doc(discountDB, existingDiscount.id), { ...existingDiscount, price: newPrice });
        } else {
            const newDiscountDoc = { ...book, price: newPrice, bookId: book.id };
            addDoc(discountDB, newDiscountDoc);
        }
    });

    return null;
}