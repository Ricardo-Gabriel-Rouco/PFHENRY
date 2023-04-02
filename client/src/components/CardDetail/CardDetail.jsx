import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../firebase/firestore/books";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./CardDetail.module.css";
import {
  Box,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  Paper,
  List,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardsReview from "./Review/CardsReview";

/*********-9780007119554-**********/
const MyBook = {
  authors: ["Martin"],
  description:
    "Robb Stark wears his new-forged crown in the Kingdom of the North, but his defences are ranged against attack from the South, the land of House Stark's enemies the Lannisters. His sisters are trapped there at the whim of the Lannister boy-king Joffrey and his depraved mother Cersei.",
  display: true,
  editorial: "Harper Voyager",
  genres: ["Fantasy"],
  image:
    "https://firebasestorage.googleapis.com/v0/b/pf-henry-2d98b.appspot.com/o/9780007119554.jpg?alt=media&token=0babcd9b-d442-4d03-95ff-1b300223ef0d",
  price: 250,
  rating: 1.0,
  reviews: [
    {
      comment:
        "Me gusto mucho, parecia que todo estaba a mi alrededor.. no pude dormir.",
      rating: 4.5,
      user: "julian",
    },
    {
      comment: "That to be borning",
      rating: 0.5,
      user: "juancho",
    },
    {
      comment: "Es un libro muy largo y entretenido",
      rating: 7.5,
      user: "morayma",
    },
    {
      comment: "Lo más bonito fue el final...",
      rating: 7.0,
      user: "pericles",
    },
  ],
  title: "A Storm of Swords Part Two",
  year: 1973,
};
/***********************************/

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bookDetail, setBookDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    dispatch(getBookById(id))
      .then((response) => {
        setBookDetail(MyBook); //reemplazar en modo PRODUCCION
        // setBookDetail(response.payload);
        setShowDetail(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, id]);

  return (
    <div className={style.container}>
      {showDetail ? (
        <Box
          sx={{
            flexDirection: "column",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease",
            height: "40%",
            width: "40%",
          }}
          className={style.card}
        >
          <CardContent>
            <Typography variant="h4" color="text.primary" gutterBottom>
              {bookDetail.title}
            </Typography>
            <Typography variant="h5">
              <p>Authors: {bookDetail.authors.join(", ")}</p>
              <p>Editorial: {bookDetail.editorial}</p>
              <p>Genres: {bookDetail.genres.join(", ")}</p>
            </Typography>
            <CardMedia
              component="img"
              height="300px"
              sx={{
                width: "20%",
                height: "20%",
                marginTop: "25px",
                marginLeft: "40%",
              }}
              image={bookDetail.image}
              alt={bookDetail.name}
            />
            <Typography variant="body2">
              <p>Price: {bookDetail.price}</p>
              <p>Rating: {bookDetail.rating}</p>
              <p>Year: {bookDetail.year}</p>
            </Typography>

            {/* new change "Show reviews" */}
            <Paper style={{ maxHeight: 200, overflow: "auto" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  bgcolor: "background.paper",
                }}
              >
                {console.log(bookDetail.reviews)}
                {bookDetail.reviews.map((review) => (
                  <CardsReview
                    key={review.id}
                    id={review.id}
                    user={review.user}
                    comment={review.comment}
                    rating={review.rating}
                  />
                ))}
              </List>
            </Paper>
            {/* new change "Show reviews" */}
          </CardContent>
          <Box>
            <CardContent>
              <IconButton color="primary">
                <Link to="/home">
                  <HomeOutlinedIcon />
                </Link>
              </IconButton>
              <IconButton color="primary" aria-label="add to shopping cart">
                <Link to={`/home/cart`}>
                  <ShoppingCartIcon />
                </Link>
              </IconButton>
            </CardContent>
          </Box>
        </Box>
      ) : (
        <p>Loading book detail...</p>
      )}
    </div>
  );
};

export default CardDetail;
