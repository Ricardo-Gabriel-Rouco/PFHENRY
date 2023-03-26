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

  const handleInputChange = (e) => {
    setbookData({...bookData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(bookData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titulo: </label>
        <input type="text" name='title' placeholder='Ej: La llamada de Cthulhu' onChange={handleInputChange} value={bookData.title}/>
        <label htmlFor="author">Autor: </label>
        <input type="text" name='author' placeholder='Ej: H. P. Lovecraft' onChange={handleInputChange} value={bookData.author}/>
        <label htmlFor="editorial">Editorial: </label>
        <input type="text" name='editorial' placeholder='Ej: Gargola' onChange={handleInputChange} value={bookData.editorial}/>
        <label htmlFor="genres">Generos: </label>
        <input type="text" name='genres' placeholder='Selecciona uno o varios de la lista' onChange={handleInputChange} value={bookData.genres}/>
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
        <input type="text" name='price' placeholder='Ingresa el precio' onChange={handleInputChange} value={bookData.price}/>
        <label htmlFor="year">Año de publiacion</label>
        <input type="text" name='year' placeholder='Ej: 1926' onChange={handleInputChange} value={bookData.year}/>
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