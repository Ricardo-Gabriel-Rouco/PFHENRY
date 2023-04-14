const { getDocs, query, collection, where, doc, getDoc, updateDoc } = require("firebase/firestore");
const db = require('../firebase-config')

async function getBooks () {
  const q = query(collection(db, "books"), where("display", "==", true))
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


async function getBookById (id) {
  try {
    const docsRef = doc(db, 'books', id)
    const docSnap = await getDoc(docsRef)
    if (docSnap.exists()) {
        return {...docSnap.data(), id: id};
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  } catch (error) {
    console.log(error)
  }
}

async function deleteBook (id){
  try {
    const docsRef = doc(db, 'books', id)
    await updateDoc(docsRef, {
      display: false
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getBooks,
  getBookById,
  deleteBook
}

//   id = Number(id)
//   const q = query(collection(db, "books"), where("id", "==", id))
//   const querySnapshot = await getDocs(q);
//   let data = [];
//   querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//     data.push({
//       ...doc.data(),
//       id:doc.id
//     })
//   })
//   return data