import {
  Create,
  SimpleForm,
  TextInput,
  TextField,
  ImageInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import {
  getBookById,
  modifyBook,
  postBook,
} from "../../../firebase/firestore/books";
import { useState, useEffect } from "react";
import { getGenres, postGenre } from "../../../firebase/firestore/genres";
import validation from "./validation";
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./BookForm.module.css";
import { List } from "../List/List";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { getAuthors, postAuthor } from "../../../firebase/firestore/authors";
import { uploadImage } from "../../../firebase/storage";


export const BookCreate = (props) => {
  const navigate = useNavigate();
  const [imageType, setImageType] = useState("");
  const [genres, setGenres] = useState(undefined);
  const [authors, setAuthors] = useState(undefined);
  const [allGenres, setAllGenres] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [bookData, setBookData] = useState({ description: "" });
  const [errors, setErrors] = useState({});
  const [urlImage, setUrlImage] = useState("");
  const [imageToRender, setImageToRender] = useState("");
  const [focused, setFocused] = useState(false);
  const [book, setBook] = useState({});
  const [flag, setFlag] = useState(true);

  const paramId = useParams().id;

  useEffect(() => {
    try {
      let genres, authors;
      const fetchGenres = async () => {
        const allGenres = await getGenres();
        genres = allGenres;
        setAllGenres(allGenres);
      };
      fetchGenres();

      const fetchAuthors = async () => {
        const allAuthors = await getAuthors();
        authors = allAuthors;
        setAllAuthors(allAuthors);
      };
      fetchAuthors();

      const fetchBook = async () => {
        let book = await getBookById(paramId);
        const formattedGenres = genres.filter((el) =>
          book.genres.includes(el.name)
        );
        const formattedAuthors = authors.filter((el) =>
          book.authors.includes(el.name)
        );
        setGenres(formattedGenres);
        setAuthors(formattedAuthors);
        book = {
          ...book,
          isbn: book.id,
          genres: formattedGenres,
          authors: formattedAuthors,
        };
        console.log(book);
        setBookData(book);
        setBook(book);
        setFocused(true);
        setImageType("url");
      };

      if (paramId) fetchBook();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (imageType === "url") console.log();
    if (focused) {
      console.log(book);
      setBookData({ ...bookData, image: book?.image });
    }
  }, [imageType]);

  useEffect(() => {
    const newData = {};
    newData.authors = authors;
    newData.genres = genres;

    setBookData({ ...bookData, ...newData });
  }, [authors, genres]);

  useEffect(() => {
    setErrors(validation(bookData, imageType));

    if (paramId && flag && bookData?.image?.length) {
      setBookData({ ...bookData, image: book?.image });
      setImageToRender(book.image);
      setFlag(false);
    }
  }, [bookData]);

  const createBook = async (e) => {
    try {
      let error = false;
      Object.values(errors).forEach((el) => {
        if (el.length) {
          error = true;
        }
      });
      Object.values(bookData).forEach((el) => {
        if (el === undefined) {
          error = true;
        }
      });
      if (error) throw "Missing data";

      const imageUrl = await uploadImage(
        bookData.image,
        imageType,
        bookData.isbn
      );
      const newBook = {
        ...bookData,
        authors: bookData.authors.map((el) => el.name).flat(),
        genres: bookData.genres.map((el) => el.name).flat(),
        image: imageUrl,
      };

      await postBook(newBook);

      //agrego nuevos autores
      const newAuthors = bookData.authors.filter((author) => {
        if (!allAuthors.find((el) => el.name === author.name)) return true;
      });
      const authorsPromises = newAuthors.map((el) =>
        postAuthor(el.name, el.id)
      );
      authorsPromises.length && (await Promise.all(authorsPromises));

      //agrego nuevos generos
      const newGenres = bookData.genres.filter((genre) => {
        if (!allGenres.find((el) => el.name === genre)) return true;
      });
      const genresPromises = newGenres.map((el) => postGenre(el.name, el.id));
      genresPromises.length && (await Promise.all(genresPromises));

      navigate("/admin/books");
    } catch (error) {
      let toHighlight = {};
      for (const key in errors) {
        if (bookData[key] === undefined) toHighlight[key] = "";
      }
      setBookData({ ...bookData, ...toHighlight });

      window.alert(error);
    }
  };

  const handleInputChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

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
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

      }}
    >
      <Create {...props} style={{ alignSelf: "center", display: "flex" }}>
        <SimpleForm onSubmit={createBook}
        >
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!paramId ? (
              <>
                <TextInput
                  sx={{ width: 300 }}
                  label="ISBN"
                  source="isbn"
                  focused={focused}
                  onChange={handleInputChange}
                  name="isbn"
                  format={(e) => bookData?.isbn}
                />
                {errors.isbn ? (
                  <p className={styles.formError}>
                    <ErrorIcon />
                    {errors.isbn && errors.isbn}
                  </p>
                ) : null}
              </>
            ) : (
              <Typography sx={{ marginBottom: "1em" }}>
                <TextField
                  source="myField"
                  record={{ myField: ` ISBN: ${paramId}` }}
                  sx={{ fontWeight: "bold", fontSize: "2em" }}
                />
              </Typography>
            )}
            <TextInput
              onChange={handleInputChange}
              focused={focused}
              label="Title"
              source="title"
              style={{
                margin: "0 ",
                fontSize: "2rem",
                fontWeight: "bold",
                maxWidth: 300,
              }}
              format={(e) => bookData?.title}
            />
            {errors.title ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.title && errors.title}
              </p>
            ) : null}
            <SelectInput
              optionText="name"
              format={(e) => imageType}
              onChange={handleImageType}
              choices={imageTypeOptions}
              source="Image Type"
              style={{ alignSelf: "center", display: "flex", width: 300 }}
            />
            {imageType === "file" ? (
              <>
                <ImageInput
                  source="image"
                  label="Image"
                  accept="image/*"
                  onChange={handleImageChange}
                  sx={{width: 300}}
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
                    sx={{ marginRight: "1em", maxWidth: 150 }}
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
              sx={{ maxWidth: 300 }}
              multiline
              label="Description"
              focused={focused}
              source="description"
              onChange={handleInputChange}
              style={{ width: "50rem" }}
              format={(e) => bookData?.description}
            />
            <br></br>
            <NumberInput

              label="Price $"
              source="price"
              focused={focused}
              onChange={handleInputChange}
              defaultValue={bookData?.price}
              style={{ margin: "0 2rem " }}
              sx={{width: 300}}
              options={{ style: "currency", currency: "USD" }}
              format={(e) => bookData?.price}
            />
            {errors.price ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.price && errors.price}
              </p>
            ) : null}
            <br></br>
            <TextInput
            sx={{width: 300}}
              label="Year"
              source="year"
              focused={focused}
              onChange={handleInputChange}
              style={{ margin: "0 2rem ", maxWidth: 300 }}
              format={(e) => bookData?.year}
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
              focused={focused}
              onChange={handleInputChange}
              style={{ margin: "0 2rem ", width: 300 }}
              format={(e) => bookData?.editorial}
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
              style={{ margin: '0 auto'}}
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
    </Box>
  );
};
