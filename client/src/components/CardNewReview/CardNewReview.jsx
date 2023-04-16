import React, { useState, useEffect } from "react";
import { TextField, Rating, Button, Grid } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/authContext";
import { getBookById } from "../../firebase/firestore/books";

const CardNewReview = ({ id, handleNewReview, setBookDetail}) => {
  const {userStatus} = useAuth() 
  const initialState = {
    id: id,
    userId: userStatus.userId,
    nickname: userStatus.nickName,
    comment: "",
    rating: 0,
    display: true,
  };

  const [errors, setErrors] = useState({
    comment: '',
    rating: 0
  })
  
  const [input, setInput] = useState(initialState);
  useEffect(() => {
    const newError = {comment: '', rating: ''}
    if(!input.comment) newError.comment= 'Comment must not be empty'
    if(parseInt(input.rating) <= 0) newError.rating= 'Stars cannot be Zero'
    setErrors(newError)
  }, [input])
  
  const handleinputReview = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!errors.comment && !errors.rating){
        await handleNewReview(input);
        const result = await getBookById(id)
        setBookDetail(result)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Grid
      container
      spacing={1}
      xs={12}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Grid
        item
        xs={12}
        sm={2}
        md={2}
        lg={2}
        xl={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <AccountCircle color="primary.main" fontSize="large" />
      </Grid>
      <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
        <TextField
          sx={{ width: "100%" }}
          id="input-with-sx"
          multiline
          maxRows={2}
          name="comment"
          value={input.comment}
          label={initialState.nickname}
          variant="standard"
          color="primary"
          onChange={handleinputReview}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        md={3}
        lg={3}
        xl={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Rating
          name="rating"
          value={input.rating}
          precision={0.5}
          onChange={handleinputReview}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "text.primary",
            },
            "& .MuiRating-iconFocus": {
              color: "text.primary",
            },
            "& .MuiRating-iconHover": {
              color: "text.primary",
            },
          }}

        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          color="primary"
          onClick={handleOnSubmit}
          variant="contained"
          size="small"
        >
          Review
        </Button>
      </Grid>
    </Grid>
  );
};

export default CardNewReview;
