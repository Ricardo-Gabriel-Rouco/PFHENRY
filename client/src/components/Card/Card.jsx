import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFavorite,
  addFavorite,
} from "../../redux/rootReducer/favoriteSlice";
import {
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { addProduct } from "../../redux/rootReducer/cartSlice";
import CardDetail from "../CardDetail/CardDetail";



  
const Card = ({ image, id, title, authors, price }) => {
    const favorite = useSelector(state => state.favorite.favorites)
    const dispatch = useDispatch();


    //FAVORITES
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if(favorite.favorites.some((book) =>book.id === id))
        {
            if (!isFav) 
                setIsFav(true);
        }
        else
            if(isFav)
                setIsFav(false)
                // eslint-disable-next-line
    }, [favorite, id]);

  
    
 

  const handleFavorite = () => {
    if (isFav) {
      dispatch(deleteFavorite(id));
      setIsFav(false);
    } else {
      dispatch(addFavorite({ image, id, title, authors, price }));

      setIsFav(true);
    }
  };

  const handleAdd = (id) => {
    dispatch(addProduct(id));
  };

  //CUADRO DE DIALOGO
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Typography variant="body2">
          {price ? <p>Price $ {price}</p> : null}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button variant="contained" size="small">
          {" "}
          <Link to={`/home/${id}`}>Details</Link>
        </Button> */}

        <Button
          variant="contained"
                   onClick={handleClickOpen}
        >
          Details
        </Button>
        {/* <Link to={`/home/${id}`}></Link> */}
        <Dialog open={open} onClose={handleClose} fullWidth={true} PaperProps={{
        style: {
          height: '100vh',
          overflow: 'hidden',
        },
      }} >
          <DialogContent>
            <CardDetail id={id} />
          </DialogContent>
        </Dialog>

        <Button
          onClick={() => handleAdd({ image, id, title, authors, price })}
        >
          <IconButton
            variant="contained"
            // color="primary"
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
