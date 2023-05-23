import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Box, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getFavorites } from "../../firebase/firestore/favorites";
import { getCart } from "../../firebase/firestore/cart";
import { useDispatch, useSelector } from "react-redux";
import { addFavoritesDB } from "../../redux/rootReducer/favoriteSlice";
import { addCartDB } from "../../redux/rootReducer/cartSlice";

const Login = () => {
  const favLS = useSelector((state) => state.favorite.favorites.favorites);
  const cartLS = useSelector((sate) => sate.cart);


  const { login, loginWithGoogle, resetPassword, userStatus } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (userStatus.logged) {
      navigate("/home");
    }
  }, [userStatus.logged, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!userData.email) {// eslint-disable-next-line
        if (!userData.password) throw "bothEmpty";// eslint-disable-next-line
        else throw "emptyEmail";
      }// eslint-disable-next-line
      if (!userData.password) throw "emptyPass";

      await login(userData.email, userData.password);

      const favDB = await getFavorites(userStatus.userId);

      if (favDB && favLS) {
        const combinedFavorites = [...favDB, ...favLS];


        const uniqueFavorites = combinedFavorites.filter((obj, index, self) => {
          return index === self.findIndex((o) => o === obj);
        });


        dispatch(addFavoritesDB(uniqueFavorites));
      }

      const cartDB = await getCart(userStatus.userId);
      let combinedCart = [];

      if (cartDB && cartLS) {
        const booksMap = {};

        cartDB.forEach((book) => {
          if (!booksMap[book.id]) {
            booksMap[book.id] = { ...book, quantity: 0 };
          }
          booksMap[book.id].quantity += book.quantity;
        });

        cartLS.cart.cart.forEach((book) => {
          if (!booksMap[book.id]) {
            booksMap[book.id] = { ...book, quantity: 0 };
          }
          booksMap[book.id].quantity += book.quantity;
        });
        combinedCart = Object.values(booksMap);
        dispatch(addCartDB(combinedCart));
      }

      navigate(-1);
    } catch (error) {
      if (error.code === "auth/user-not-found") setErrors("User not found");
      else if (error.code === "auth/invalid-email") setErrors("Invalid email");
      else if (error === "emptyEmail") setErrors("Must insert email");
      else if (error.code === "auth/wrong-password")
        setErrors("Wrong password");
      else if (error === "emptyPass") setErrors("Must insert password");
      else if (error === "bothEmpty")
        setErrors("Must insert email and password");
      else console.log(error.code);
    }
  }

  async function registerGoogle() {
    try {
      await loginWithGoogle();

      const favDB = await getFavorites(userStatus.userId);
      if (favDB && favLS) {
        const combinedFavorites = [...favDB, ...favLS];

        const uniqueFavorites = combinedFavorites.filter((obj, index, self) => {
          return index === self.findIndex((o) => o.id === obj.id);
        });
        dispatch(addFavoritesDB(uniqueFavorites));
      }

      const cartDB = await getCart(userStatus.userId);
      let combinedCart = [];

      if (cartDB && cartLS) {
        const booksMap = {};

        cartDB.forEach((book) => {
          if (!booksMap[book.id]) {
            booksMap[book.id] = { ...book, quantity: 0 };
          }
          booksMap[book.id].quantity += book.quantity;
        });

        cartLS.cart.cart.forEach((book) => {
          if (!booksMap[book.id]) {
            booksMap[book.id] = { ...book, quantity: 0 };
          }
          booksMap[book.id].quantity += book.quantity;
        });

        combinedCart = Object.values(booksMap);
        dispatch(addCartDB(combinedCart));
      }
      navigate("/home");
    } catch (error) {
      setErrors({ error });
    }
  }

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleResetPassword = async () => {
    if (!userData.email) return setErrors({ ...userData, email: "insert an email" });
    setDialogOpen(true);
  };

  const handleConfirmReset = async () => {
    try {
      await resetPassword(userData.email);
      alert("We've sent you an email to reset your password");
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return userStatus.logged ? (
    navigate("/home")
  ) : (
    <Box sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
      <Paper elevation={10} style={{ borderRadius: '10px', padding: "1rem", maxWidth: "500px", backgroundColor: 'inherit' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            marginTop: "40px",
          }}
        >
          <TextField
            type="text"
            name="email"
            value={userData.email}
            label="Email"
            onChange={handleInputChange}
            style={{ margin: "0.5rem", width: '15rem' }}

          />

          <TextField
            type="password"
            name="password"
            value={userData.password}
            label="Password"
            onChange={handleInputChange}
            style={{ margin: "0.5rem", width: '15rem' }}
          />

          {errors && (
            <Typography sx={{ fontSize: "0.5em", color: "error" }} gutterBottom>
              {errors}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "0.5rem" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              registerGoogle();
            }}
            style={{ margin: '1.5rem' }}
          >
            Login with Google
          </Button>
          <Typography
            variant="body1"
            style={{ margin: "1rem", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Typography>
          <Typography
            variant="body1"
            style={{ margin: "1rem", textDecoration: "underline", cursor: "pointer" }}
            onClick={handleResetPassword}
          >
            Reset Password
          </Typography>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
              <Alert severity="error">Are you sure you want to reset your password?</Alert>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmReset} color="primary">
                Reset
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </Paper>
    </Box>

  );
};

export default Login;
