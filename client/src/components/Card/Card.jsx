import { Link } from 'react-router-dom';
const Card = ({ currentBook }) => {


    return (
        <div>
            {currentBook.map((book, j) => (
                <div key={j}>
                    <p><Link to='/home/:id'> <button> DETAILS </button></Link></p>
                    <h1>{book.title}</h1>
                    <h2>Just imagine there is a wonderful image of a wonderful book</h2>
                    <p>Stock: {book.stock}</p>
                    <p>Price: {book.price}</p>
                    <p>Image: {<img src={book.image} alt='asdaffa' />}</p>

                </div>
            ))}
        </div>
    );
}



export default Card;