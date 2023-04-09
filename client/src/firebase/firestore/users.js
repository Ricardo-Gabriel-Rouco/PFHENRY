import { getDocs, query, collection } from "firebase/firestore"
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

export async function getMailOfUser(id) {

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



