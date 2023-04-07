import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../firebase/firestore/books";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Paper,
  List,
  ListSubheader,
  Grid,
} from "@mui/material";
import CardsReview from "../CardsReview/CardsReview";
import CardNewReview from "../CardNewReview/CardNewReview";
import loading from "../../Assets/Loading.gif";

let nickname = "Claudio"; //Traer el "nickname" del usuario que esta loogeado

const CardDetail = ({ id }) => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const [bookDetail, setBookDetail] = useState({});

  useEffect(() => {
    dispatch(getBookById(id))
      .then((response) => {
        // setBookDetail(MyBook); //reemplazar en modo PRODUCCION
        setBookDetail(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, id]);

  return bookDetail.id ? (
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 4,
        bgcolor: "#ffecb3",
        width: 800,
        maxWidth: "50vw",
        maxHeight: "71vh",
        overflowY: "auto",
        marginLeft: "4px",
        marginTop: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CardMedia
          component="img"
          image={bookDetail?.image}
          alt={bookDetail?.title}
          sx={{ height: 300, width: 200 }}
        />
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          {bookDetail?.title}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {bookDetail?.author}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bookDetail?.editorial}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {bookDetail?.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Price: $${bookDetail?.price}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Rating: ${bookDetail?.rating}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Year: ${bookDetail?.year}`}
        </Typography>
        {/* new change "Show reviews" */}
        {bookDetail.reviews ? (
          bookDetail.reviews.find((obj) => obj.user === nickname) ? (
            ""
          ) : (
            <>
              <Paper
                elevation={4}
                sx={{
                  maxHeight: 200,
                  overflow: "auto",
                  margin: "auto",
                  width: "90%",
                }}
              >
                <List
                  sx={{
                    width: "95%",
                    margin: "auto",
                  }}
                >
                  <CardNewReview
                    key={bookDetail.id}
                    id={bookDetail.id}
                    nickname={nickname}
                  />
                </List>
              </Paper>
            </>
          )
        ) : (
          <>
            <Paper
              elevation={4}
              sx={{
                maxHeight: 200,
                overflow: "auto",
                margin: "auto",
                width: "90%",
              }}
            >
              <List
                sx={{
                  width: "95%",
                  margin: "auto",
                }}
              >
                <CardNewReview
                  key={bookDetail.id}
                  id={bookDetail.id}
                  nickname={nickname}
                />
              </List>
            </Paper>
          </>
        )}
        {bookDetail.reviews ? (
          <>
            <Paper
              elevation={4}
              sx={{
                maxHeight: 200,
                overflow: "auto",
                margin: "8px auto",
                width: "90%",
              }}
            >
              <List
                sx={{
                  width: "95%",
                  margin: "auto",
                }}
                subheader={
                  <ListSubheader color="primary" sx={{ display: "flex" }}>
                    Comments
                  </ListSubheader>
                }
              >
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
          </>
        ) : null}
        {/* new change "Show reviews" */}
      </Box>
    </Card>
  ) : (
    <img style={{ width: "100%" }} src={loading} alt="loading" />
  );
};

export default CardDetail;
