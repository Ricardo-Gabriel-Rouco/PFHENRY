import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ currentBook }) => {


    return (
        <div className={style.cardContainer} >
            {currentBook.map((book, j) => (
                <div className={style.card} key={j}>
                    <h4>{book.title}</h4>
                    <h5><img src={book.image} alt={book.name} /></h5>
                    <p>Stock: {book.stock}</p>
                    <p>Price: {book.price}</p>
                    <Link to={`/home/${book.id}`}>
                        <button> More details</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}



export default Card;