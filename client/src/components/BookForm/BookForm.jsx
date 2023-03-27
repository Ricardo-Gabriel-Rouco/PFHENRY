import React, { useState, useEffect } from "react";
import styles from "./BookForm.module.css";
import { getGenres } from "../../firebase/firestore/genres";
import validation from './validation'

function BookForm() {
  // estado que maneja la subida de imagen
  const [imageFile, setImageFile] = useState("");
  const handleImageInputChange = (ev) => {
    //Esta parte solo sirve para mostrar la imagen
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onloadend = () => {
      // setImageFile(reader.result);
      setbookData({ ...bookData, image: { file: reader.result } });
    };
  };

  const [genres, setgenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      const allGenres = await getGenres();
      setgenres(allGenres);
    }
    fetchGenres();
  }, []);

  const [bookData, setbookData] = useState({
    isbn: "",
    title: "",
    author: "",
    editorial: "",
    genres: [],
    price: "",
    year: "",
    image: {
      link: "",
      file: "",
    },
  });

  const [errors, setErrors] = useState({
    isbn: "",
    title: "",
    author: "",
    editorial: "",
    genres: [],
    price: "",
    year: "",
    image: ''
  })

  const onClose = () => {
    setImageFile("");
    setbookData({ ...bookData, image: { link: "", file: "" } });
  };

  const handleInputChange = (e) => {
    if (e.target.name === "imageLink") {
      setbookData({ ...bookData, image: { link: e.target.value } });
    }
    setbookData({ ...bookData, [e.target.name]: e.target.value });
    setErrors(validation(bookData))
  };

  const handleOptions = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setbookData({
      ...bookData,
      genres: [...bookData.genres, ...selectedValues],
    });
  };

  const handleRemove = (value) => {
    const newGenres = bookData.genres.filter((genre) => genre !== value);
    setbookData({
      ...bookData,
      genres: newGenres,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(bookData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label htmlFor="isbn">ISBN: </label>
        <input
          type="text"
          name="isbn"
          placeholder="Ej: 9788415618683"
          onChange={handleInputChange}
          value={bookData.isbn}
        />
        {errors.isbn? <p>{errors.isbn}</p>: null}
        <label htmlFor="title">Titulo: </label>
        <input
          type="text"
          name="title"
          placeholder="Ej: La llamada de Cthulhu"
          onChange={handleInputChange}
          value={bookData.title}
        />
        {errors.title? <p>{errors.title}</p>: null}
        <label htmlFor="author">Autor: </label>
        <input
          type="text"
          name="author"
          placeholder="Ej: H. P. Lovecraft"
          onChange={handleInputChange}
          value={bookData.author}
        />
        {errors.author? <p>{errors.author}</p>: null}
        <label htmlFor="editorial">Editorial: </label>
        <input
          type="text"
          name="editorial"
          placeholder="Ej: Alma ediciones"
          onChange={handleInputChange}
          value={bookData.editorial}
        />
        {errors.editorial? <p>{errors.editorial}</p>: null}
        <label htmlFor="genres">Generos:</label>
        <select
          multiple={true}
          value={bookData.genres}
          onChange={handleOptions}
        >
          {genres
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((genre) => (
              <option key={genre.name} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>
        <div>
          {bookData.genres.map(
            (genre) =>
              bookData.genres.indexOf(genre) ===
                bookData.genres.lastIndexOf(genre) && (
                <div key={genre}>
                  {genre}
                  <button onClick={() => handleRemove(genre)}>X</button>
                </div>
              )
          )}
        </div>
        {errors.genres? <p>{errors.genres}</p>: null}
        <label htmlFor="image">Imagen: </label>
        {!imageFile ? (
          <div>
            <input
              type="file"
              accept="image/*"
              name="imageFile"
              placeholder="Select an image"
              onChange={handleImageInputChange}
            />
            <label htmlFor="imageLink">Url Imagen:</label>
            <input
              type="text"
              name="imageLink"
              value={bookData.image.link}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div>
            {bookData.image.file ? (
              <img src={bookData.image.file} alt="uploaded_Image" />
            ) : bookData.image.link ? (
              <img src={bookData.image.link} alt="uploaded_Image" />
            ) : null}
            <div>
              <button onClick={onClose}>X</button>
            </div>
          </div>
        )}
        {errors.image? <p>{errors.image}</p>: null}
        <label htmlFor="price">Precio</label>
        <input
          type="text"
          name="price"
          placeholder="Ingresa el precio"
          onChange={handleInputChange}
          value={bookData.price}
        />
        {errors.price? <p>{errors.price}</p>: null}
        <label htmlFor="year">Año de publiacion</label>
        <input
          type="text"
          name="year"
          placeholder="Ej: 1926"
          onChange={handleInputChange}
          value={bookData.year}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default BookForm;
