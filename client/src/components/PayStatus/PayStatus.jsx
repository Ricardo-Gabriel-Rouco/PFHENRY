import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllProducts } from '../../redux/rootReducer/cartSlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { postOrder } from '../../firebase/firestore/orders';

const PayStatus = () => {
  const dispatch = useDispatch();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const payment_id = {payment_id : params.get('payment_id')};
  const [status, setStatus] = useState("");
  const navigate = useNavigate()
 
  useEffect(() => {
    // Elimina los productos del carrito al montar el componente
    async function checkPayStatus() {
      const response = await axios.post("https://shaky-friend-production.up.railway.app/payStatus",
        payment_id)
      if (response.data === "approved") {
        setStatus(response.data)
        const order = {
          user:params.get('idUser'),
          idOrder:params.get('payment_id'),
          status:response.data
        }
        postOrder(order)
        dispatch(removeAllProducts());
        localStorage.removeItem("cart");
        setTimeout(()=>{
          navigate('/home')
        },3000)
      }
      else {
        setStatus(response.data)
      }
    }
    checkPayStatus()
  }, []);

  return (
    <div>
      { 
        status === "approved" ? (
          <div>
            <h1>Compra Exitosa</h1>
            <p>¡Gracias por su compra! Seras dirigido a la pagina principal y en breves minutos se estara enviando el libro por mail</p>
          </div>
        ) : status === "failure" ? (
          <div>
            <h1>No se pudo realizar la compra</h1>
            <p>Serás redirigido a Home</p>
          </div>
        ) : null
      }
    </div>
  );
};

export default PayStatus;