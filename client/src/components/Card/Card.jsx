import style from './Card.module.css'

const Card = ({currentBook}) => {
    
    
    return (
        <div className={style.cardContainer} >
            {currentBook.map((book, j) => (
                <div className={style.card} key={j}>
                    <h4>{book.title}</h4>
                    <h5>wonderful image of a wonderful book</h5>
                    <p>Stock: {book.stock}</p>
                    <p>Price: {book.price}</p>
                </div>
            ))}
        </div>
    );
}



export default Card;