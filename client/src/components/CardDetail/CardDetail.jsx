import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../firebase/firestore/books";
import { useSelector } from "react-redux";

import {
  Grid,
  Container,
  Card,
  CardMedia,
  Typography,
  Paper,
  List,
  ListSubheader,
  Collapse,
  Button,
  Rating,
} from "@mui/material";
import CardsReview from "../CardsReview/CardsReview";
import CardNewReview from "../CardNewReview/CardNewReview";
import loading from "../../Assets/Loading.gif";
import { updateBookReviews, modifyBook } from "../../firebase/firestore/books";
import { useAuth } from "../../context/authContext";

const CardDetail = ({ id }) => {
  const [description, setDescription] = useState(false);
  const bookId = useSelector((state) => state.books.bookId);

  const { userStatus } = useAuth();

  const paramId = useParams().id;

  if (!id) {
    if (paramId) id = paramId;
    else {
      id = bookId;
    }
  }

  const [bookDetail, setBookDetail] = useState({});

  useEffect(() => {
    if (id)
      getBookById(id)
        .then((response) => {
          // setBookDetail(MyBook); //reemplazar en modo PRODUCCION
          setBookDetail(response);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleNewReview = async (input) => {
    await updateBookReviews(input);
    await modifyBook(id, {
      rating: !bookDetail.rating
        ? input.rating
        : (parseInt(input.rating) + parseInt(bookDetail.rating)) / 2,
    });
    getBookById(id)
      .then((response) => {
        setBookDetail(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return bookDetail.id ? (
    <Grid>
      <Grid item xs={12} md={6} lg={4}>
      <Card sx={{display:'flex'}}>
<Container sx={{flexGrow:1, border: '1px solid black',display:'flex',heigth:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <CardMedia
              component="img"
              image={bookDetail?.image}
              alt={bookDetail?.title}
              sx={{ 
                height: 300, 
                width: 250,
                objectFit:"contain"
              }}
            />
            <Typography
              variant="h5"
              component="h5"
              gutterBottom
              sx={{ fontWeight: "bold", marginTop: "15px", marginBottom: 0 }}
            >
              {bookDetail?.title}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              {`Price: $${bookDetail?.price}`}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              <Rating
                name="read-only"
                value={bookDetail?.rating}
                size="large"
                precision={0.5}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "primary",
                  },
                }}
              />
            </Typography>
            
          </Container>
          <Container
          sx={{flexGrow:1, border:'1px solid black',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'2rem'}}
          >
            {/* <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
                {bookDetail?.year} - {bookDetail?.editorial} -{" "}
                {bookDetail?.authors}
            </Typography>
            <Button onClick={() => setMoreDetails(!details)}>
              {details ? "View less" : "View Details"}
            </Button> */}
              {bookDetail && bookDetail.description && (
              <>
                <Typography
                  variant="body1"
                  align="justify"
                  gutterBottom
                  sx={{ width: "90%", color:"primary" }}
                >
                    {bookDetail.description}
                </Typography>
              </>
            )}
                        {bookDetail.reviews ? (
              <>
                <Paper
                  elevation={4}
                  sx={{
                    height:300,
                    maxHeight: "60%",
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
                      <ListSubheader
                        color="primary.dark"
                        sx={{ display: "flex" }}
                      >
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
            {bookDetail.reviews ? (
              bookDetail.reviews.find(
                (obj) => obj.user === userStatus.nickName
              ) ? (
                ""
              ) : (
                <>
                  {userStatus.logged ? (
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
                          nickname={userStatus.nickname}
                          handleNewReview={handleNewReview}
                          uid={userStatus.userId}
                        />
                      </List>
                    </Paper>
                  ) : null}
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
                      nickname={userStatus.nickname}
                      handleNewReview={handleNewReview}
                      uid={userStatus.userId}
                      setBookDetail={setBookDetail}
                    />
                  </List>
                </Paper>
              </>
            )}

            {/* new change "Show reviews" */}
          </Container>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <img style={{ width: "100%" }} src={loading} alt="loading" />
  );
};

export default CardDetail;
