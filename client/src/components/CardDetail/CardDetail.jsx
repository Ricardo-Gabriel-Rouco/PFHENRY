import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../firebase/firestore/books";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./CardDetail.module.css";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { IconButton, Paper, List } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Review from "./Review/Review.jsx";

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bookDetail, setBookDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    dispatch(getBookById(id))
      .then((response) => {
        setBookDetail(response.payload);
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
          </CardContent>
          {bookDetail.reviews ? (
            <>
              <Typography variant="h5">
                <p>Reviews</p>
              </Typography>
              <Paper style={{ maxHeight: 200, overflow: "auto" }}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    bgcolor: "background.paper",
                  }}
                >
                  {bookDetail.reviews.map((review) => (
                    <Review
                      key={review.id}
                      id={review.id}
                      user={review.user}
                      comment={review.comment}
                      rating={review.rating}
                    />
                  ))}
                </List>
              </Paper>
            </>
          ) : null}
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
