import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config';

export const applyDiscounts = async () => {
    const originalDB = query(collection(db, "books"), where('display', '==', true))
    const discountDB = collection(db, 'discount');

    const querySnapshot = await getDocs(originalDB)

    const books = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        books.push({
            ...doc.data(),
            id: doc.id
        });
    });

    const descuentoIndexes = [];
    for (let i = 0; i < books.length; i++) {
        if (Math.random() < 0.2) { // 20% de los libros
            descuentoIndexes.push(i);
        }
    }

    descuentoIndexes.forEach(index => {
        const book = books[index];
        const discount = 0.15; // Descuento del 15%
        const newPrice = books.unite_price * (1 - discount);
        const newDiscountDoc = { ...book, unite_price: newPrice };
        addDoc(discountDB, newDiscountDoc); // Utilizamos addDoc() para agregar el documento
    });

    return null;
};
