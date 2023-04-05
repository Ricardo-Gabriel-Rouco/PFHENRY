import React, { useState, useEffect } from "react";
import { Box, TextField, Rating, Button, Paper } from "@mui/material";
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
    //hacer PUSH del objeto INPUT al registro con el "id" correspondiente
  };

  return (
    <Paper
      elevation={8}
      style={{ width: 415, height: 120, overflow: "auto", marginBottom: 5 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 1,
        }}
        component="form"
      >
        <AccountCircle color="secondary" sx={{ mr: 0.5, my: 0.5 }} />
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
        <Rating
          name="rating"
          value={input.rating}
          precision={0.5}
          onChange={handleinputReview}
        />
      </Box>
      <Button
        type="submit"
        color="secondary"
        onClick={handleOnSubmit}
        variant="contained"
        size="small"
      >
        Review
      </Button>
    </Paper>
  );
};

export default CardNewReview;
