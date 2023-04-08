import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllProducts } from '../../redux/rootReducer/cartSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PayStatus = () => {
  const dispatch = useDispatch();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const payment_id = params.get('payment_id');
  // const dataObj = JSON.parse(data2);
  const [status, setStatus] = useState("")

  useEffect(() => {
    // Elimina los productos del carrito al montar el componente
    async function checkPayStatus() {
      const response = await axios.post("https://pfhenry-production.up.railway.app/payStatus",
        payment_id)
      console.log(response.data)
      if (response.data === "approved") {
        setStatus(response.data)
        dispatch(removeAllProducts());
        localStorage.removeItem("cart");
      }
      else {
        setStatus(response.data)
      }
    }
    checkPayStatus()
  }, []);

  return (
    <div>
      {status === "approved" ? (
        <div>
          <h1>Compra Exitosa</h1>
          <p>¡Gracias por su compra!</p>
        </div>
      ) : (
        <div>
          <h1>No se pudo realizar la compra</h1>
          <p>Serás redirigido a Home</p>
        </div>
      )}
    </div>
  );
};

export default PayStatus;