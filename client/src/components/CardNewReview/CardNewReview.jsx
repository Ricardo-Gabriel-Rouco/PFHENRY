import React, { useState, useEffect } from "react";
import { TextField, Rating, Button, Grid } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { updateBookReviews } from "../../firebase/firestore/books";

const CardNewReview = ({ id, nickname }) => {
  const initialState = {
    id: id,
    nickname: nickname,
    comment: "",
    rating: 0,
    display: true,
  };
  const [input, setInput] = useState(initialState);

  const handleinputReview = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(input);
      const res = await updateBookReviews(input);
      console.log(res);
      setInput(initialState);
    } catch (error) {
      console.log(error);
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
        <AccountCircle color="primary" fontSize="large" />
      </Grid>
      <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
        <TextField
          sx={{ width: "100%" }}
          id="input-with-sx"
          multiline
          maxRows={2}
          name="comment"
          value={input.comment}
          label={nickname}
          variant="standard"
          color="secondary"
          onChange={handleinputReview}
          required
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
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          color="secondary"
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
