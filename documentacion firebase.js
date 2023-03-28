// en este caso tenemos dos opciones, usamos getData o onSnapshot, la diferencia es que cada vez que 
      // se actualiza la db, 
      // onSnapshot envia la data nueva sin necesidad de un refresh
  
    // onSnapshot(collection(db, 'books'), (snapshot) =>{
    // setBook(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}) ))
    // })

    

    /////////////OBTENER UN SOLO DATO
    // const docRef = doc(db, "cities");
    // const docSnap = await getDoc(docRef);
    
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    ///////////OBTENER TODOS LOS DATOS
    
    (async()=>{
        // const q = query(collection(db, "cities"), where("capital", "==", true));  //con capital === true
        const q = query(collection(db, "books"));
        const querySnapshot = await getDocs(q);
        
        // let data = querySnapshot.map(el=>{return {...el.data(), id:el.id}})
        // console.log(data)
        let data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({
            ...doc.data(),
            id:doc.id
          })
        });
    })()