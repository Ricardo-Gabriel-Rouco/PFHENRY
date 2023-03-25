import style from "./Card.module.css";

const Card = ({ currentBook }) => {
  return (
    <div className={style.cardContainer}>
      {currentBook.map((book, j) => (
        <div className={style.card} key={j}>
          <h4>{book.title}</h4>
          {book.stock ? <h5>wonderful image of a wonderful book</h5> : null}
          {book.stock ? <p>Stock: {book.stock}</p> : null}
          {book.price ? <p>Price: {book.price}</p> : null}
        </div>
      ))}
    </div>
  );
};

export default Card;
