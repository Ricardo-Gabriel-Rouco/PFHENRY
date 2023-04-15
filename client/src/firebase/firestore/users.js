import { getDocs, query, collection, getDoc, doc } from "firebase/firestore"
import { db } from '../firebase-config';

export async function getAllTheUsers() {

  const q = query(collection(db, "users"))
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

export async function getUserById (id) {
  try {
    const docsRef = doc(db, 'users', id);
    const docSnap = await getDoc(docsRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: id };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);}
}

export async function getMailOfUser(id) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().email;
  } else {
    return "No existe el documento con el id especificado";
  }
}



