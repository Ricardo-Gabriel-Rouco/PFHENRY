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
  const [status, setStatus] = useState("")

  useEffect(() => {
    // Elimina los productos del carrito al montar el componente
    async function checkPayStatus() {
      const response = await axios.post("https://pfhenry-production.up.railway.app/payStatus",
        dataObj.payment_id)
      return response;
    }
    const payStatus = checkPayStatus()
    if (payStatus) {
      setStatus(payStatus)
      dispatch(removeAllProducts());
      localStorage.removeItem("cart");
    }
    else{
      setStatus(payStatus)
    }
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