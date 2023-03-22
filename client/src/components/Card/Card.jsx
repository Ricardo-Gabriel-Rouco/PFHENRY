import style from "./Card.module.css";
import img_book from "../../image/book.jpg";

const Card = (props) => {
  return (
    <div className={style.card}>
      <img
        src={props.image ? props.image : img_book}
        alt={props.title}
        className={style.image}
      />
      <h3>{props.title}</h3>
      <h5>Just imagine there is a wonderful image of a wonderful book</h5>
      <h5 className={style.floatingRight}>Stock: {props.stock}</h5>
      <h5 className={style.floatingLeft}>Price: {props.price}</h5>
    </div>
  );
};

export default Card;
