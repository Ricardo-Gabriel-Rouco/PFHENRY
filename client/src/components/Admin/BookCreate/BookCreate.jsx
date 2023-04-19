import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import { postBook } from "../../../firebase/firestore/books";
import { useState, useEffect } from "react";
import { getGenres } from "../../../firebase/firestore/genres";
import validation from "./validation";
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./BookForm.module.css";
import { GenreList } from "../GenreList/GenreList";
import { useNavigate } from "react-router-dom";
import { Input, InputLabel, Button } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export const BookCreate = (props) => {
  const navigate = useNavigate();
  const [imageType, setImageType] = useState("");
  const [genres, setGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [bookData, setBookData] = useState({});
  const [errors, setErrors] = useState({});

  const createBook = async () => {
    try {
      const newBookData = { ...bookData, genres };
      const response = await postBook(newBookData);
      console.log(response);
      navigate("/admin/books");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const allGenres = await getGenres();
      setAllGenres(allGenres);
    };
    fetchGenres();
  }, []);

  const handleInputChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setErrors(validation(bookData));
    console.log(bookData.image);
  }, [bookData]);

  const handleImageType = (e) => {
    setImageType(e.target.value);
    setBookData({ ...bookData, image: undefined });
  };

  const imageTypeOptions = [
    { id: "file", name: "File" },
    { id: "url", name: "URL" },
  ];

  const handleImageChange = (image) => {
    console.log(typeof image);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event) => {
      setBookData({ ...bookData, image: event.target.result });
    };
    return { src: image };
  };

  const MyImg = () => {
    return (
      <div style={{ position: "relative" }}>
        <img
          src={bookData.image}
          alt="uploaded_Image"
          // onError={() => {
          //   if (imageType === "file") setBookData({ ...bookData, image: null });
          //   else setErrors({...errors, image:"Invalid Link"})
          // }}
          style={{
            maxHeight: "15em",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
          }}
        />
        <Button
          onClick={() => setBookData({ ...bookData, image: null })}
          sx={{ position: "absolute", top: "0%", right: "0%" }}
        >
          <CancelRoundedIcon />
        </Button>
      </div>
    );
  };

  const ImageInputField = () => {
    if (imageType === "file") {
      return (
        <>
          <ImageInput
            source="image"
            label="Image"
            accept="image/*"
            onChange={handleImageChange}
          ></ImageInput>

          {bookData.image ? <MyImg /> : null}
        </>
      );
    } else if (imageType === "url") {
      return (
        <>
          <>
          <TextInput
              label="Image URL"
              source="image"
              onChange={handleInputChange}
              name="image"
              
            />
            {/* <InputLabel htmlFor="imageLink">Url Imagen:</InputLabel>
            <Input
              type="text"
              name="image"
              value={bookData.image}
              onChange={handleInputChange}
            /> */}
          </>
          {bookData.image ? <MyImg /> : null}
        </>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "75%",
        alignSelf: "center",
        margin: "15rem",
      }}
    >
      <Create {...props} style={{ alignSelf: "center", display: "flex" }}>
        <SimpleForm onSubmit={createBook}>
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextInput
              label="ISBN"
              source="isbn"
              onChange={handleInputChange}
              name="isbn"
              defaultValue={bookData.isbn}
            />
            {errors.isbn ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.isbn && errors.isbn}
              </p>
            ) : null}
            <TextInput
              defaultValue={bookData.title}
              onChange={handleInputChange}
              label="Title"
              source="title"
              style={{ margin: "0 ", fontSize: "2rem", fontWeight: "bold" }}
            />
            {errors.title ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.title && errors.title}
              </p>
            ) : null}
            <SelectInput
              optionText="name"
              onChange={handleImageType}
              choices={imageTypeOptions}
              source="Image Type"
              style={{ alignSelf: "center", display: "flex" }}
            />
            <ImageInputField style={{ alignSelf: "center", display: "flex" }} />
          </div>
          <div>
            <br></br>
            <TextInput
              label="Author"
              source="authors"
              defaultValue={bookData.authors}
              style={{ margin: "0 2rem " }}
              onChange={handleInputChange}
            />
            {errors.authors ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.authors && errors.authors}
              </p>
            ) : null}
            <br></br>
            <TextInput
              multiline
              label="Description"
              source="description"
              onChange={handleInputChange}
              style={{ width: "50rem" }}
            />
            <br></br>
            <NumberInput
              label="Price $"
              source="price"
              onChange={handleInputChange}
              defaultValue={bookData.price}
              style={{ margin: "0 2rem " }}
              options={{ style: "currency", currency: "USD" }}
            />
            {errors.price ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.price && errors.price}
              </p>
            ) : null}
            <br></br>
            <TextInput
              label="Year"
              source="year"
              onChange={handleInputChange}
              defaultValue={bookData.year}
              style={{ margin: "0 2rem " }}
            />
            {errors.year ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.year && errors.year}
              </p>
            ) : null}
            <br></br>
            <TextInput
              label="Editorial"
              source="editorial"
              onChange={handleInputChange}
              defaultValue={bookData.editorial}
              style={{ margin: "0 2rem " }}
            />
            {errors.editorial ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.editorial && errors.editorial}
              </p>
            ) : null}
            {/* <InputLabel htmlFor="genres">Genres:</InputLabel> */}
            <GenreList
              errors={errors}
              allGenres={allGenres}
              genres={genres}
              setGenres={setGenres}
            />

            <br></br>
          </div>
        </SimpleForm>
      </Create>
    </div>
  );
};
