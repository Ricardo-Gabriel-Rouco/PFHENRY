import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllProducts } from '../../redux/rootReducer/cartSlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { postOrder } from '../../firebase/firestore/orders';
import { Button } from '@mui/material';
import { useAuth } from '../../context/authContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';

const PayStatus = () => {
  const { userStatus } = useAuth();
  const dispatch = useDispatch();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const payment_id = { payment_id: params.get('payment_id') };
  const idUser = params.get('idUser');
  const [status, setStatus] = useState("");
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/home')
  }

  useEffect(() => {

    async function checkPayStatus() {
      const response = await axios.post("https://shaky-friend-production.up.railway.app/payStatus",
        payment_id)
      const userLogged = onAuthStateChanged(auth, async (currentUser)=>{
        return currentUser.email
      })
      console.log(userLogged)
      // if (userStatus.userId === idUser) {
      if (response.data === "approved") {
        setStatus(response.data)
        const order = {
          user: idUser,
          idOrder: params.get('payment_id'),
          status: response.data
        }
        window.history.replaceState({}, document.title, window.location.pathname);
        postOrder(order)
        dispatch(removeAllProducts());
        localStorage.removeItem("cart");
      }
      else {
        setStatus(response.data)
      }
    }
    // else {
    //   console.log(userStatus.userId)
    //   navigate('/home')
    // }
    // }
    checkPayStatus()

  }, []);

  return (
    <div>
      {
        status === "approved" ? (
          <div>
            <h1>Compra Exitosa</h1>
            <p>¡Gracias por su compra! En breves minutos se estara enviando el libro por mail</p>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ ml: 1 }}
              onClick={() => handleNavigate()}>
              Back To Home
            </Button>
          </div>
        ) : status === "failure" ? (
          <div>
            <h1>No se pudo realizar la compra</h1>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ ml: 1 }}
              onClick={() => handleNavigate()}>
              Back To Home
            </Button>
          </div>
        ) : null
      }
    </div>
  );
};

export default PayStatus;