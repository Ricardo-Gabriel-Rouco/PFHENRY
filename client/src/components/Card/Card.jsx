
const Card = ({currentBook}) => {
    
    
    return (
        <div>
            {currentBook.map((book, j) => (
                <div key={j}>
                    <h1>{book.title}</h1>
                    <h2>Just imagine there is a wonderful image of a wonderful book</h2>
                    <p>Stock: {book.stock}</p>
                    <p>Price: {book.price}</p>
                </div>
            ))}
        </div>
    );
}



export default Card;