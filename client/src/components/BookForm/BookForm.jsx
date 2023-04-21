import React, { useState, useEffect } from "react";
import styles from "./BookForm.module.css";
import { getGenres } from "../../firebase/firestore/genres";
import validation from "./validation";
import { Input, InputLabel, Button, Box, Container, Snackbar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ErrorIcon from "@mui/icons-material/Error";
import { postBook } from "../../firebase/firestore/books";
import background from "../../Assets/CreateFormBg.jpg";

function BookForm() {
  // estado que maneja la subida de imagen
  const [imageLink, setImageLink] = useState("");

  const [bookData, setBookData] = useState({
    // image: {},
  });

  const [errors, setErrors] = useState({});

  const [genres, setGenres] = useState([]);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  
  useEffect(() => {
    setErrors(validation(bookData));
    console.log(bookData.image)
  }, [bookData]);

  useEffect(() => {
    async function fetchGenres() {
      const allGenres = await getGenres();
      setGenres(allGenres);
    }
    fetchGenres();
  }, []);

  const onClose = () => {
    setImageLink("");
    setBookData({ ...bookData, image: "" });
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "imageLink":
        setImageLink(e.target.value);
        break;

      case "imageFile":
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        console.log(typeof (e.target.files[0]))
        reader.onloadend = () => {
          setBookData({ ...bookData, image: reader.result });
        };
        break;

      default:
        setBookData({
          ...bookData,
          [e.target.name]: e.target.value,
        });
        break;
    }
  };

  const handleOptions = (e) => {
    let selectedValues = [];

    if (bookData.genres) selectedValues = [...bookData.genres];

    const options = e.target.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setBookData({
      ...bookData,
      genres: [...selectedValues],
    });
  };

  const handleRemove = (value) => {
    const newGenres = bookData.genres.filter((genre) => genre !== value);
    setBookData({
      ...bookData,
      genres: newGenres,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postBook({ ...bookData, authors: [bookData.authors] });
      console.log(res);
    } catch (error) {
      let toHighlight = {};
      for (const key in errors) {
        console.log(key);
        if (bookData[key] === undefined) toHighlight[key] = "";
      }
      setBookData({ ...bookData, ...toHighlight });

      setAlertMessage(error.toString());
      setAlertOpen(true);
    }
  };

  const acceptImageLink = () => {
    setBookData({
      ...bookData,
      image: imageLink,
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Container sx={{ width: "55%" }}>
        <Box bgcolor="blanchedalmond">
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="isbn">ISBN: </InputLabel>
            <Input
              type="tel"
              name="isbn"
              placeholder="Ej: 9788415618683"
              onChange={handleInputChange}
              value={bookData.isbn}
            />
            {errors.isbn ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.isbn && errors.isbn}
              </p>
            ) : null}
            <InputLabel htmlFor="title">Title: </InputLabel>
            <Input
              type="text"
              name="title"
              placeholder="Ej: La llamada de Cthulhu"
              onChange={handleInputChange}
              value={bookData.title}
            />
            {errors.title ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.title && errors.title}
              </p>
            ) : null}
            <InputLabel htmlFor="authors">Authors: </InputLabel>
            <Input
              type="text"
              name="authors"
              placeholder="Ej: H. P. Lovecraft"
              onChange={handleInputChange}
              value={bookData.authors}
            />
            {errors.authors ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.authors && errors.authors}
              </p>
            ) : null}
            <InputLabel htmlFor="editorial">Publisher: </InputLabel>
            <Input
              type="text"
              name="editorial"
              placeholder="Ej: Alma ediciones"
              onChange={handleInputChange}
              value={bookData.editorial}
            />
            {errors.editorial ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.editorial && errors.editorial}
              </p>
            ) : null}
            <InputLabel htmlFor="genres">Genres:</InputLabel>
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
              {bookData.genres &&
                bookData.genres.map(
                  (genre) =>
                    bookData.genres.indexOf(genre) ===
                    bookData.genres.lastIndexOf(genre) && (
                      <div key={genre}>
                        {genre}
                        <button onClick={() => handleRemove(genre, "genres")}>
                          X
                        </button>
                      </div>
                    )
                )}
            </div>
            {errors.genres ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.genres && errors.genres}
              </p>
            ) : null}
            <InputLabel htmlFor="image">Image: </InputLabel>
            {!bookData.image ? (
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  placeholder="Select an image"
                  onChange={handleInputChange}
                />
                <InputLabel htmlFor="imageLink">Url Imagen:</InputLabel>
                <div>
                  <Input
                    type="text"
                    name="imageLink"
                    value={imageLink}
                    onChange={handleInputChange}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={acceptImageLink}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.image}>
                {bookData.image ? (
                  <img
                    src={bookData.image}
                    alt="uploaded_Image"
                    onError={() => setBookData({ ...bookData, image: null })}
                  />
                ) : null}
                <div>
                  <button onClick={onClose}>X</button>
                </div>
              </div>
            )}
            {errors.image ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.image && errors.image}
              </p>
            ) : null}
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              type="tel"
              name="price"
              placeholder="Ingresa el precio"
              onChange={handleInputChange}
              value={bookData.price}
            />
            {errors.price ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.price && errors.price}
              </p>
            ) : null}
            <InputLabel htmlFor="year">Year</InputLabel>
            <Input
              type="tel"
              name="year"
              placeholder="Ej: 1926"
              onChange={handleInputChange}
              value={bookData.year}
            />
            {errors.year ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.year && errors.year}
              </p>
            ) : null}
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 1 }}
              >
                <SaveIcon /> Save
              </Button>
            </div>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} message={alertMessage} />
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default BookForm;
