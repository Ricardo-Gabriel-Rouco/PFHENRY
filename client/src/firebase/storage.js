import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from '../firebase/firebase-config'
import axios from 'axios'

////// Crear input para subir imagen a storage

export const getURL = (id) => {
    getDownloadURL(ref(storage, `${id}.jpg`))
        .then((url) => {
            return(url)
        })
        .catch((error) => {
            throw new Error(error)
    });
} 

export const uploadImage = async ({file,link}, id) => {
    const imagesRef = ref(storage, `${id}.jpg`);
    

    try {
        if(file){
            const snapshot = await uploadBytes(imagesRef, file)
            console.log(snapshot)
        }
    
        else{
            // Fetch the file from the URL
            const res = await (axios.get(link,{responseType:'arraybuffer'}).data)
            // Convert file to blob
            const blob = new Blob([res], {type: res.headers['content-type']});
            // Upload file to Storage
            await uploadBytes(imagesRef, blob)
            console.log("File uploaded successfully");
        }
        
    } catch (error) {
        console.log(error)
        
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