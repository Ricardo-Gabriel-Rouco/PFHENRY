import React, {useState, useEffect} from 'react'
import styles from './BookForm.module.css'
import { getGenres } from '../../firebase/firestore/genres';

function BookForm() {
  // estado que maneja la subida de imagen
  const [image, setImage] = useState('')
  const handleImageInputChange = (ev)=>{
    //Esta parte solo sirve para mostrar la imagen
    const reader = new FileReader()
    reader.readAsDataURL(ev.target.files[0]);
    reader.onloadend = () => {
    setImage(reader.result)
    };
  }

  const [genres, setgenres] = useState([])
  useEffect(() => {
    async function fetchGenres (){
      const allGenres = await getGenres()
      setgenres(allGenres)
    }
    fetchGenres()
}, [])
  

  const [bookData, setbookData] = useState({
    isbn: '',
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

  const handleOptions = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setbookData({...bookData, genres: [...bookData.genres, ...selectedValues] });
  }

  const handleRemove = (value) => {
    const newGenres = bookData.genres.filter((genre) => genre !== value);
    setbookData({
      ...bookData,
      genres: newGenres
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(bookData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label htmlFor="isbn">ISBN: </label>
        <input type="text" name='isbn' placeholder='Ej: ' onChange={handleInputChange} value={bookData.isbn}/>
        <label htmlFor="title">Titulo: </label>
        <input type="text" name='title' placeholder='Ej: La llamada de Cthulhu' onChange={handleInputChange} value={bookData.title}/>
        <label htmlFor="author">Autor: </label>
        <input type="text" name='author' placeholder='Ej: H. P. Lovecraft' onChange={handleInputChange} value={bookData.author}/>
        <label htmlFor="editorial">Editorial: </label>
        <input type="text" name='editorial' placeholder='Ej: Gargola' onChange={handleInputChange} value={bookData.editorial}/>
        <select multiple={true} value={bookData.genres} onChange={handleOptions}>
          {genres?.map(genre => (
            <option key={genre.name} value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <div>
        {bookData.genres.map((genre) => (
          <div key={genre}>
            {genre}
            <button onClick={() => handleRemove(genre)}>X</button>
          </div>
        ))}
        </div>
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