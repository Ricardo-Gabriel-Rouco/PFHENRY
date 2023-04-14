import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../firebase/firestore/books";
import { useDispatch } from "react-redux";
import {
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  Paper,
  List,
  ListSubheader,
  Collapse,
  Button,
} from "@mui/material";
import CardsReview from "../CardsReview/CardsReview";
import CardNewReview from "../CardNewReview/CardNewReview";
import loading from "../../Assets/Loading.gif";
import { updateBookReviews } from "../../firebase/firestore/books";

let nickname = "Claudio"; //Traer el "nickname" del usuario que esta loogeado

const CardDetail = ({ id }) => {
  const [details, setMoreDetails] = useState(false);
  const [description, setDescription] = useState(false);

  const paramId = useParams().id;
  if (!id) id = paramId;
  const dispatch = useDispatch();
  const [bookDetail, setBookDetail] = useState({});

  useEffect(() => {
    getBookById(id)
      .then((response) => {
        // setBookDetail(MyBook); //reemplazar en modo PRODUCCION
        setBookDetail(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, id]);

  const handleNewReview = async (input) => {
    try {
      const res = await updateBookReviews(input);
      console.log(res);
      dispatch(getBookById(id))
        .then((response) => {
          setBookDetail(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return bookDetail.id ? (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 2 }}
    >
      <Grid item xs={12} md={6} lg={4}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
            bgcolor: "primary.dark",
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
              sx={{ height: 150, width: 100 }}
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
              sx={{ fontWeight: "bold", marginBottom: "15px" }}
            >
              {`Price: $${bookDetail?.price}`}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "15px" }}
            >
              {`Rating: ${bookDetail?.rating}`}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "15px" }}
            >
              <Collapse in={details} collapsedHeight={"500px"}>
                {bookDetail?.year} - {bookDetail?.editorial} -{" "}
                {bookDetail?.authors}
              </Collapse>
            </Typography>
            <Button onClick={() => setMoreDetails(!details)}>
              {details ? "View less" : "View Details"}
            </Button>
            {bookDetail && bookDetail.description && (
              <>
                <Typography
                  variant="body1"
                  align="justify"
                  gutterBottom
                  sx={{ marginBottom: "15px", width: "90%" }}
                >
                  <Collapse in={description} collapsedHeight={"500px"}>
                    {bookDetail.description}
                  </Collapse>
                </Typography>
                <Button onClick={() => setDescription(!description)}>
                  {description ? "View less" : "View Description"}
                </Button>
              </>
            )}

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
                        handleNewReview={handleNewReview}
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
                      handleNewReview={handleNewReview}
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
          </Box>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <img style={{ width: "100%" }} src={loading} alt="loading" />
  );
};

export default CardDetail;
