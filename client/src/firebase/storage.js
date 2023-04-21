import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '../firebase/firebase-config'
import axios from 'axios'
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

////// Crear input para subir imagen a storage

export const getURL = async (id) => {
    try {
        const url = await getDownloadURL(ref(storage, `${id}.jpg`))
        return url
    } catch (error) {
        throw new Error(error)
    }
    
} 

export const uploadImage = async (image, type, id) => {
    const imagesRef = ref(storage, `${id}.jpg`);
    
    try {
        if(type === "file"){
            const snapshot = await uploadBytes(imagesRef, image)
            console.log("File uploaded successfully");

        }
    
        else if(type === "url"){
            // Fetch the file from the URL
            const res = await (axios.get(image,{responseType:'arraybuffer'}))
            // console.log(res)
            // Convert file to blob
            const blob = new Blob([res.data], {type: res.headers['content-type']});
            // Upload file to Storage
            await uploadBytes(imagesRef, blob)
            console.log("File uploaded successfully");
        }
        const url = await getURL(id)
        console.log(url)
        return url
        
    } catch (error) {
        console.log(error)
        
    }

}

export const updateBookAddLinkPDF = async () => {
    try {
        const q = query(collection(db, "books"), where('display', '==', true))
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id
      }
      )
    })

    const getURL = async (id) => {
      let response = await getDownloadURL(ref(storage, `Books/${id}.pdf`))
      return response
    };
    
    data.forEach(async e => {
      let urlBook = await getURL(e.id)
      const newBook = doc(db, 'books', e.id)
      await updateDoc(newBook, {
        linkBook:urlBook
      })
    })
    } catch (error) {
        return error.message
    }
}

// const [image, setImage] = useState('');

//     const handleInputChange = (ev)=>{
//         //Esta parte solo sirve para mostrar la imagen
//         const reader = new FileReader()
//         reader.readAsDataURL(ev.target.files[0]);
//         reader.onloadend = () => {
//             setImage(reader.result)
//         };

        //Esto es para subir al Storage
    //     const imagesRef = ref(storage, 'test1.jpeg');
    //     uploadBytes(imagesRef, ev.target.files[0],{contentType: 'image/jpeg',}).then((snapshot) => {
    //         console.log(snapshot);
    //         });
    // }

    // const onClose = () => {
    //     setImage('')
    // }




    // {!image?
    //     <input 
    //     type='file'
    //     accept='image/*'
    //     name="image" 
    //     placeholder="Select an image" 
    //     onChange={handleInputChange}/>
        
    //     :<div >
    //         <img  src={image} alt='uploaded_Image'/>
    //         <div >
    //             <button onClick={onClose}>X</button>
    //         </div>
    //     </div>
    // }