import style from "./Card.module.css";
import img_book from "../../image/book.jpg";

const Card = (props) => {
    
    
        return (
        <div>
            <h1>{props.title}</h1>
            <h2>Just imagine there is a wonderful image of a wonderful book</h2>
            <p>Stock: {props.stock}</p>
            <p>Price: {props.price}</p>
        </div>

    );
}

export default Card;
