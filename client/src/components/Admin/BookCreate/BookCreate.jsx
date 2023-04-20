import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import { modifyBook, postBook } from "../../../firebase/firestore/books";
import { useState, useEffect } from "react";
import { getGenres } from "../../../firebase/firestore/genres";
import validation from "./validation";
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./BookForm.module.css";
import { List } from "../List/List";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputLabel, TextField } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { getAuthors } from "../../../firebase/firestore/authors";
import { uploadImage } from "../../../firebase/storage";

export const BookCreate = (props) => {
  const navigate = useNavigate();
  const [imageType, setImageType] = useState("");
  const [genres, setGenres] = useState(undefined);
  const [authors, setAuthors] = useState(undefined);
  const [allGenres, setAllGenres] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [bookData, setBookData] = useState({});
  const [errors, setErrors] = useState({});
  const [urlImage, setUrlImage] = useState("");
  const [imageToRender, setImageToRender] = useState("");

  const createBook = async (ev) => {
    try {
      // const newBookData = { ...bookData, genres };
      const response = await modifyBook("000", { name: "test" });
      console.log(response);
      // navigate("/admin/books");
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

    const fetchAuthors = async () => {
      const allAuthors = await getAuthors();
      setAllAuthors(allAuthors);
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    const newData = {};
    newData.authors = authors;
    newData.genres = genres;

    setBookData({ ...bookData, ...newData });
  }, [authors, genres]);

  const handleInputChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setErrors(validation(bookData, imageType));
  }, [bookData]);

  const handleImageType = (e) => {
    setImageType(e.target.value);
    setUrlImage("");
    setImageToRender("");
    if (bookData.image !== undefined) setBookData({ ...bookData, image: "" });
  };

  const imageTypeOptions = [
    { id: "file", name: "File" },
    { id: "url", name: "URL" },
  ];

  const handleImageChange = async (file) => {
    setBookData({ ...bookData, image: file });
    await uploadImage(file, imageType, "0000");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImageToRender(event.target.result);
    };
  };

  const MyImg = () => {
    return (
      <div style={{ position: "relative" }}>
        <img
          src={imageToRender}
          alt="uploaded_Image"
          onError={() => {
            setBookData({ ...bookData, image: "" });
            setUrlImage("");
            setImageToRender("");
          }}
          style={{
            maxHeight: "15em",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
          }}
        />
        <Button
          onClick={() => {
            setBookData({ ...bookData, image: null });
            setImageToRender("");
          }}
          sx={{ position: "absolute", top: "0%", right: "0%" }}
        >
          <CancelRoundedIcon />
        </Button>
      </div>
    );
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
              format={(e) => bookData.isbn}
            />
            {errors.isbn ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.isbn && errors.isbn}
              </p>
            ) : null}
            <TextInput
              onChange={handleInputChange}
              label="Title"
              source="title"
              style={{ margin: "0 ", fontSize: "2rem", fontWeight: "bold" }}
              format={(e) => bookData.title}
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
            {imageType === "file" ? (
              <>
                <ImageInput
                  source="image"
                  label="Image"
                  accept="image/*"
                  onChange={handleImageChange}
                ></ImageInput>
              </>
            ) : imageType === "url" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <TextInput
                    label="Image URL"
                    source="urlImage"
                    name="urlImage"
                    format={(e) => urlImage}
                    onChange={(e) => setUrlImage(e.target.value)}
                    sx={{ marginRight: "1em" }}
                  />
                  <Button
                    onClick={() => {
                      setBookData({ ...bookData, image: urlImage });
                      setImageToRender(urlImage);
                    }}
                    variant="contained"
                    color="primary"
                    sx={{ ml: 1 }}
                  >
                    Accept URL
                  </Button>
                </div>
              </>
            ) : null}
            {imageToRender ? <MyImg /> : null}
            {errors.image ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.image && errors.image}
              </p>
            ) : null}
          </div>
          <div>
            <br></br>
            <List
              fullList={allAuthors}
              selected={authors}
              setSelected={setAuthors}
              prop={"Authors"}
            />
            {errors.authors ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.authors}
              </p>
            ) : null}
            <br></br>
            <TextInput
              multiline
              label="Description"
              source="description"
              onChange={handleInputChange}
              style={{ width: "50rem" }}
              format={(e) => bookData.description}
            />
            <br></br>
            <NumberInput
              label="Price $"
              source="price"
              onChange={handleInputChange}
              defaultValue={bookData.price}
              style={{ margin: "0 2rem " }}
              options={{ style: "currency", currency: "USD" }}
              format={(e) => bookData.price}
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
              style={{ margin: "0 2rem " }}
              format={(e) => bookData.year}
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
              style={{ margin: "0 2rem " }}
              format={(e) => bookData.editorial}
            />
            {errors.editorial ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.editorial && errors.editorial}
              </p>
            ) : null}
            {/* <InputLabel htmlFor="genres">Genres:</InputLabel> */}
            <List
              fullList={allGenres}
              selected={genres}
              setSelected={setGenres}
              prop="Genres"
            />
            {errors.genres ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.genres}
              </p>
            ) : null}

            <br></br>
          </div>
        </SimpleForm>
      </Create>
    </div>
  );
};
