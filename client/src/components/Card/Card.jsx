import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFavorite,
  addFavorite,
} from "../../redux/rootReducer/favoriteSlice";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { addProduct } from "../../redux/rootReducer/cartSlice";

const Card = ({ image, id, title, authors, price, stock }) => {
  const favorite = useSelector((state) => state.favorite.favorites);

  const dispatch = useDispatch();

  //FAVORITES
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    if (favorite)
      favorite.favorites.forEach((fav) => {
        if (fav.id === id) {
          setIsFav(true);
        }
      });
  }, [favorite, id]);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(deleteFavorite(id));
      setIsFav(false);
    } else {
      dispatch(addFavorite({ image, id, title, authors, price, stock }));

      setIsFav(true);
    }
  };

  const handleAdd = (id) => {
    dispatch(addProduct(id));
  };

  return (
    <Box
      sx={{
        margin: "30px",
        flexDirection: "column",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "box-shadow 0.3s ease",
        height: "450px",
        width: "300px",
      }}
      className={style.card}
    >
      {isFav ? (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleFavorite()}
        >
          {" "}
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
      <CardMedia
        component="img"
        height="300"
        sx={{
          width: "10rem",
          height: "14rem",
          objectFit: "cover",
          marginTop: "25px",
        }}
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {stock ? <p>Stock: {stock}</p> : null}
        </Typography>
        <Typography variant="body2">
          {price ? <p>Price: {price}</p> : null}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" href="#contained-buttons" size="small">
          {" "}
          <Link to={`/home/${id}`}>Details</Link>
        </Button>
        <Button
          onClick={() => handleAdd({ image, id, title, authors, price, stock })}
        >
          <IconButton
            variant=""
            color="primary"
            aria-label="add to shopping cart"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Button>
      </CardActions>
    </Box>
  );
};

export default Card;
