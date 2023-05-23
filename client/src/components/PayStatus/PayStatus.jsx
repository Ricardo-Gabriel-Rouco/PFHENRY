import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllProducts } from "../../redux/rootReducer/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postOrder } from "../../firebase/firestore/orders";
import { Button } from "@mui/material";
import { getMailOfUser } from "../../firebase/firestore/users";
import { availableItems } from "../Cart/Cart";
import { getBooks } from "../../firebase/firestore/books";

const PayStatus = () => {
  const dispatch = useDispatch();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const payment_id = params.get("payment_id");
  const idUser = params.get("idUser");
  const statusPayment = params.get("status");
  const cart = useSelector((state) => state.cart);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  useEffect(() => {
    async function checkPayStatus() {
      switch (statusPayment) {
        case "approved":
          const displayableBooks = await getBooks();
          console.log(displayableBooks);
          const items = availableItems(displayableBooks, cart).map((el) => {
            return {
              id: el.id,
              title: el.title,
              price: el.unit_price,
              quantity: el.quantity,
            };
          });
          console.log(items);
          setStatus(statusPayment);
          let order = {
            user: idUser,
            idOrder: payment_id,
            status: statusPayment,
            items,
          };
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          await postOrder(order);
          let email = await getMailOfUser(idUser);
          // let response = axios.post("http://localhost:3001/mail", { mail: email, reason: "link", items:cart.cart.cart})
          axios.post("/mail", {
            mail: email,
            reason: "link",
            items: cart.cart.cart,
          });
          dispatch(removeAllProducts());
          localStorage.removeItem("cart");
          break;

        case "failure":
          setStatus(statusPayment);
          order = {
            user: idUser,
            idOrder: payment_id,
            status: statusPayment,
          };
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          await postOrder(order);
          email = await getMailOfUser(idUser);
          axios.post("/mail", { mail: email, reason: "failed" });
          break;

        case "null":
          navigate("/home");
          break;

        default:
          break;
      }
    }
    checkPayStatus();// eslint-disable-next-line
  }, []);

  return (
    <div>
      {status === "approved" ? (
        <div>
          <h1>Compra Exitosa</h1>
          <p>
            ¡Gracias por su compra! En breves minutos se estara enviando el
            libro por mail
          </p>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => handleNavigate()}
          >
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
            onClick={() => handleNavigate()}
          >
            Back To Home
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PayStatus;
