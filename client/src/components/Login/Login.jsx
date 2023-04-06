import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getFavorites } from "../../firebase/firestore/favorites";
import { getCart } from "../../firebase/firestore/cart";
import { useDispatch, useSelector } from "react-redux";
import { addFavoritesDB } from "../../redux/rootReducer/favoriteSlice";
import { addCartDB } from "../../redux/rootReducer/cartSlice";


const Login = () => {
  const favLS = useSelector(state => state.favorite.favorites.favorites)
  const { login, loginWithGoogle, resetPassword, userStatus } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userStatus.logged) {
      navigate("/home");
    }
  }, [userStatus.logged, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!userData.email) {
        if (!userData.password)
          throw 'bothEmpty'
        else
          throw 'emptyEmail'
      }
      if (!userData.password)
        throw 'emptyPass'

      await login(userData.email, userData.password);
      const favDB = await getFavorites(userStatus.userId);

      const combinedFavorites = [...favDB, ...favLS];

      const uniqueFavorites = combinedFavorites.filter((obj, index, self) => {
        return index === self.findIndex((o) => o.id === obj.id);
      });
      
      dispatch(addFavoritesDB(uniqueFavorites));


      const cartDB = await getCart(userStatus.userId);
      if (cartDB) {
        dispatch(addCartDB(cartDB))
      }

      navigate('/home')
    } catch (error) {
      console.log(error)
      if (error.code === "auth/wrong-password")
        setErrors({ ...errors, password: "Wrong password" });
      else if (error.code === "auth/user-not-found")
        setErrors({ ...errors, email: "User not found" });
      else if (error === 'emptyEmail')
        setErrors({ ...errors, email: "Must insert email" })
      else if (error === 'emptyPass')
        setErrors({ ...errors, password: "Must insert password" })
      else if (error === 'bothEmpty')
        setErrors({ ...errors, email: "Must insert email", password: "Must insert password" })


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
      if (cartDB) {
        dispatch(addCartDB(cartDB))
      }
      navigate("/home");
    } catch (error) {
      setErrors({ ...errors, error });
    }
  }

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleResetPassword = async () => {
    if (!userData.email) return setErrors({ ...userData, email: 'ingresa un email' })
    try {
      await resetPassword(userData.email)
      alert('we send you an email to reset your password')
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    userStatus.logged ? navigate('/home') :
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <TextField
        type="text"
        name="email"
        value={userData.email}
        label="Correo electrónico"
        onChange={handleInputChange}
        style={{ margin: "1rem" }}
      />
      {errors.email && <p>{errors.email}</p>}

      <TextField
        type="password"
        name="password"
        value={userData.password}
        label="Contraseña"
        onChange={handleInputChange}
        style={{ margin: "1rem" }}
      />
      {errors.password && <p>{errors.password}</p>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "2rem" }}
      >
        Iniciar Sesion
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          registerGoogle();
        }}
        style={{ margin: "2rem" }}
      >
        Inicia sesion con Google
      </Button>
      <Link to={"/register"}>No tienes Cuenta? crea una</Link>
      <Link onClick={handleResetPassword}>Forgot password?</Link>
    </form>
  );
};

export default Login;