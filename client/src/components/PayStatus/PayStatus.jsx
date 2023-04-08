import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllProducts } from '../../redux/rootReducer/cartSlice';
import axios from 'axios';

const PayStatus = () => {
  const dispatch = useDispatch();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const data2 = params.get('data');
  const dataObj = JSON.parse(data2);

  useEffect(() => {
    // Elimina los productos del carrito al montar el componente
    async function checkPayStatus(){
        const response = await axios.post("https://pfhenry-production.up.railway.app/payStatus",
        dataObj.payment_id)
        return response;
    }
    const payStatus = checkPayStatus()
    if(payStatus){
        dispatch(removeAllProducts());
        localStorage.removeItem("cart");
    }
    
  }, []);

  return (
    <div>
      <h1>Compra Exitosa</h1>
      <p>¡Gracias por su compra!</p>
    </div>
  );
};

export default PayStatus;