import { Button, Drawer, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeProduct,
  removeAllProducts,
} from "../../redux/rootReducer/cartSlice";
import { Stack, Box } from "@mui/material";
import { Divider, Grid, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toogleCart } from "../../redux/rootReducer/toogleSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export const availableItems = (displayableBooks, cart) => {
  return displayableBooks
    .filter(
      (book) => book.display && cart.cart.cart.find((el) => el.id === book.id)
    )
    .map((el) => {
      const { price: unit_price, ...rest } = el
      console.log(unit_price)
      return {
        quantity: cart.cart.cart.find(book => book.id === el.id).quantity,
        unit_price,
        ...rest
      }
    })
}

const Cart = () => {
  const { userStatus } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const abrir = useSelector((state) => state.toogle.isOpen);
  const displayableBooks = useSelector((state) => state.books.displayableBooks);

  const [order, setOrder] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setOrder({
      user: {
        name: userStatus.userId,
        email: userStatus.email,
      },
      items: availableItems(displayableBooks, cart),
    });
    // eslint-disable-next-line
  }, [cart.cart.cart]);

  //handlers
  const handleBuy = async () => {
    if (userStatus.logged) {
      try {
        const response = await axios.post(
          "/checkout",
          order
        );

        //await postOrder(response.data);
        //dispatch(removeAllProducts());
        //localStorage.removeItem("cart");
        window.open(response.data, "_self");

      } catch (error) {

        setError(error)
        setSnackbarOpen(true)
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage('You must be logged to buy');
      setTimeout(() => {
        dispatch(toogleCart());
        navigate("/login");
      }, 1000);
    };
  }


  const handleClose = () => {
    dispatch(toogleCart());
  };
  const handleAdd = (id) => {
    dispatch(addProduct({ id }));
  };

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllProducts());
  };

  return (
    <Drawer anchor={"right"} open={abrir} onClose={() => handleClose()}>
      <Box sx={{ width: "25em", p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Cart</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </Button>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        {availableItems(displayableBooks, cart)
          .map((product) => {
            return (
              <Grid container spacing={2} key={product.id}>
                <Grid item xs={4}>
                  <img src={product.image} alt={product.title} width="100%" />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">{product.title}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    ({product.authors})
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {product.discount ? (
                      <>
                        <s>{product.unit_price}</s>{" "}
                        <span>
                          {(product.unit_price * (100 - product.discount) / 100).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      product.unit_price
                    )}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Button
                      onClick={() => handleRemove(product.id)}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button
                      onClick={() => handleAdd(product.id)}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <AddIcon />
                    </Button>
                    <Typography>{product.quantity}</Typography>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        {cart.cart.cart.length === 0 && (
          <Typography variant="subtitle1">
            There is no product in your cart
          </Typography>
        )}
        {cart.cart.cart.length !== 0 && (
          <Typography variant="subtitle1">
            {"Total Price: $ " +
              availableItems(displayableBooks, cart)
                .reduce(
                  (totalPrice, book) => totalPrice + book.quantity * book.unit_price * (100 - (book.discount ? book.discount : 0)) / 100,
                  0
                )
                .toFixed(2)}
          </Typography>
        )}
        {cart.cart.cart.length !== 0 ? (
          <>
            <Button
              onClick={() => handleRemoveAll()}
              variant="contained"
              color="info"
              size="small"
              sx={{ marginTop: 2, marginRight: 2 }}
            >
              Remove all products
            </Button>
            <Button
              onClick={() => handleBuy()}
              variant="contained"
              color="info"
              size="small"
              sx={{ marginTop: 2 }}
            >
              Buy Products
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled
              onClick={() => handleRemoveAll()}
              variant="contained"
              color="secondary"
              size="small"
              sx={{ marginTop: 2, marginRight: 2 }}
            >
              Remove all products
            </Button>
            <Button
              disabled
              onClick={() => handleBuy()}
              variant="contained"
              color="secondary"
              size="small"
              sx={{ marginTop: 2 }}
            >
              Buy Products
            </Button>
          </>
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={'error'}>{snackbarMessage}</Alert>
          </Stack>
        </Snackbar>
        {error? 
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error}
        />: null}
      </Box>
    </Drawer>
  );
};

export default Cart;
