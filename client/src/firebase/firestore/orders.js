import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function getOrders() {

  const q = query(collection(db, "orders"))
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({
      ...doc.data(),
      id: doc.id
    }
    )
  })
  return data
}

export async function getOrdersByUser (id) {
  try {
    const docsRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docsRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: id };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);}
}

export async function postOrder(order) {
  try {
    const collectionRef = collection(db, 'orders');
    const orderRef = doc(collectionRef, order.user);
    const orderDoc = await getDoc(orderRef);

    let ordersArray = [];

    if (orderDoc.exists()) {
      const existingData = orderDoc.data();
      ordersArray = existingData.orders;
    }
    const orderExists = ordersArray.some(e => e.idOrder === order.idOrder);
    if (!orderExists) {
      ordersArray.push({
        idOrder: order.idOrder,
        status: order.status,
        items:order.items
      });
    }

    const newOrder = {
      orders: ordersArray,
    };

    await setDoc(orderRef, newOrder);

    return "Orden creada";
  } catch (error) {
    return error;
  }
}

  // export async function modifyOrder(status) {
  //   try {
  //     const findOrder = doc(db, 'orders', `${isbn}`)
  //     await updateDoc(newBook, {
  //       authors: authors,
  //       display: true,
  //       editorial: editorial,
  //       genres: genres.map(g => g.id),
  //       image: urlImage,
  //       price: price,
  //       rating: rating,
  //       title: title,
  //       year: year
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // } 