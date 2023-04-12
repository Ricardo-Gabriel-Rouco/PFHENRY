import { Link } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { addProduct } from "../../redux/rootReducer/cartSlice";
import CardDetail from "../CardDetail/CardDetail";

const Card = ({ image, id, title, authors, price, editorial }) => {
  const favorite = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();

  //FAVORITES
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favorite.favorites.some((book) => book.id === id)) {
      if (!isFav) setIsFav(true);
    } else if (isFav) setIsFav(false);
    // eslint-disable-next-line
  }, [favorite, id]);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(deleteFavorite(id));
      setIsFav(false);
    } else {
      dispatch(addFavorite({ image, id, title, authors, price, editorial }));
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
        <Button
          variant="contained"
          size="small"
          onClick={() => handleAdd({ image, id, title, authors, price })}
        >
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
          }}
          image={image}
          alt={title}
        />
        <CardContent sx={{ padding: "5px" }}>
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body2">
            {price ? <p>Price $ {price}</p> : null}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleClickOpen}>
            Details
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                bgcolor: "primary.light",
                color: "primary",
              },
            }}
          >
            <DialogContent>
              <CardDetail id={id} />
            </DialogContent>
            <DialogActions>
              <Grid
                container
                spacing={3}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  margin: "auto",
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
                      variant="outlined"
                      color="secondary"
                      sx={{
                        transition: "color 0.5s",
                        "&:hover": {
                          color: "secondary.contrastText",
                        },
                      }}
                      endIcon={<BookmarkOutlinedIcon />}
                      onClick={() => handleFavorite()}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{
                        transition: "color 0.5s",
                        "&:hover": {
                          color: "secondary.contrastText",
                        },
                      }}
                      endIcon={<BookmarkBorderOutlinedIcon />}
                      onClick={() => handleFavorite()}
                    >
                      Add
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
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      transition: "color 0.5s",
                      "&:hover": {
                        color: "secondary.contrastText",
                      },
                    }}
                    endIcon={<ShoppingCartIcon />}
                    onClick={() =>
                      handleAdd({ image, id, title, authors, price })
                    }
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                color="secondary"
                endIcon={<ExitToAppIcon />}
                onClick={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 2,
                  top: "20px",
                  right: "20px",
                  transition: "color 0.5s",
                  "&:hover": {
                    color: "secondary.contrastText",
                  },
                }}
              ></Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Grid>
    </Grid>
  );
};

export default Card;
