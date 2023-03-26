import React, {useState} from 'react'

function BookForm() {
  // estado que maneja la subida de imagen
  const [image, setImage] = useState('');
  const handleImageInputChange = (ev)=>{
    //Esta parte solo sirve para mostrar la imagen
    const reader = new FileReader()
    reader.readAsDataURL(ev.target.files[0]);
    reader.onloadend = () => {
    setImage(reader.result)
    };
  }

  const [bookData, setbookData] = useState({
    title: '',
    author: '',
    editorial: '',
    genres: [],
    price: '',
    year: ''

  })

  const onClose = () => {
    setImage('')
  }

  return (
    <div>
      <form action="">
        <label htmlFor="title">Titulo: </label>
        <input type="text" placeholder='Ej: La llamada de Cthulhu' />
        <label htmlFor="author">Autor: </label>
        <input type="text" placeholder='Ej: H. P. Lovecraft'/>
        <label htmlFor="editorial">Editorial: </label>
        <input type="text" placeholder='Ej: Gargola'/>
        <label htmlFor="genres">Generos: </label>
        <input type="text" placeholder='Selecciona uno o varios de la lista'/>
        <label htmlFor="image">Imagen: </label>
        {!image?
        <input 
        type='file'
        accept='image/*'
        name="image" 
        placeholder="Select an image" 
        onChange={handleImageInputChange}/>
        
        :<div >
          <img  src={image} alt='uploaded_Image'/>
          <div >
            <button onClick={onClose}>X</button>
          </div>
        </div>
        }
        <label htmlFor="price" >Precio</label>
        <input type="text" placeholder='Ingresa el precio'/>
        <label htmlFor="year">Año de publiacion</label>
        <input type="text" placeholder='Ej: 1926'/>
        <button type='submit'>Guardar</button>
      </form>
    </div>
  )
}

export default BookForm

    // Esto es para subir al Storage
    // vamos a usar un dispatch para esa accion
    // const imagesRef = ref(storage, 'test1.jpeg');
    //   uploadBytes(imagesRef, ev.target.files[0],{contentType: 'image/jpeg',}).then((snapshot) => {
    //   console.log(snapshot);
    // });