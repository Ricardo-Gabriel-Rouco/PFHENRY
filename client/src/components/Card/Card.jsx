import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFavorite,
  addFavorite,
} from "../../redux/rootReducer/favoriteSlice";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { addProduct } from "../../redux/rootReducer/cartSlice";
import { openModal } from "../../redux/rootReducer/bookSlice";

const Card = ({
  image,
  id,
  title,
  authors,
  price,
  editorial,
  display,
  discount,
}) => {
  const favorite = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();

  //FAVORITES
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favorite.favorites.includes(id)) {
      if (!isFav) setIsFav(true);
    } else if (isFav) setIsFav(false);
    // eslint-disable-next-line
  }, [favorite, id]);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(deleteFavorite(id));
      setIsFav(false);
    } else {
      dispatch(addFavorite(id));

      setIsFav(true);
    }
  };

  const handleAdd = (id) => {
    dispatch(addProduct({id}));
  };
  

  return (
    <>
    <Grid
      container
      spacing={2}
      sx={{
        margin: "15px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "450px",
        width: "300px",
        borderRadius: "10px",
        bgcolor: "success.light",
        boxShadow: "0px 0px 10px black",
        transition: "bgcolor 1s, color 0.5s",
        "&:hover": {
          bgcolor: "primary.light",
          color: "text.shiny",
        },
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {isFav ? (
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => handleFavorite()}
          >
            <BookmarkOutlinedIcon />
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleFavorite()}
          >
            <BookmarkBorderOutlinedIcon />
          </Button>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {/* <Button
          variant="contained"
          size="small"
          onClick={() => handleAdd(id)}
        > */}
        <Button variant="contained" size="small" onClick={() => handleAdd(id)}>
          <ShoppingCartIcon />
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "0px auto",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          sx={{
            width: "10rem",
            height: "14rem",
            objectFit: "cover",
            marginTop: "0px",
            mr: 1.5,
          }}
          image={image}
          alt={title}
        />
        <CardContent sx={{ padding: 1, mr: 1 }}>
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body2">
            {discount ? (
              <>
                <s>${price}</s>{" "}
                <span>${((price * (100 - discount)) / 100).toFixed(2)}</span>
              </>
            ) : (
              <>${price}</>
              // price
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={()=>dispatch(openModal(id))}>
            Details
          </Button>
        </CardActions>
      </Grid>
    </Grid>
          </>
  );
};

export default Card;
