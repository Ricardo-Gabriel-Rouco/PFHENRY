////// Crear input para subir imagen a storage

const [image, setImage] = useState('');

    const handleInputChange = (ev)=>{
        //Esta parte solo sirve para mostrar la imagen
        const reader = new FileReader()
        reader.readAsDataURL(ev.target.files[0]);
        reader.onloadend = () => {
            setImage(reader.result)
        };

        //Esto es para subir al Storage
        const imagesRef = ref(storage, 'test1.jpeg');
        uploadBytes(imagesRef, ev.target.files[0],{contentType: 'image/jpeg',}).then((snapshot) => {
            console.log(snapshot);
            });
    }

    const onClose = () => {
        setImage('')
    }




    {!image?
        <input 
        type='file'
        accept='image/*'
        name="image" 
        placeholder="Select an image" 
        onChange={handleInputChange}/>
        
        :<div >
            <img  src={image} alt='uploaded_Image'/>
            <div >
                <button onClick={onClose}>X</button>
            </div>
        </div>
    }