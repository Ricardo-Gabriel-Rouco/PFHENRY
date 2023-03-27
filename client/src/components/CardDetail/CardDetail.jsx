import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../firebase/firestore/books";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import style from './CardDetail.module.css'

const CardDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [bookDetail, setBookDetail] = useState(null);
    const [showDetail, setShowDetail] = useState(false)

    useEffect(() => {
        dispatch(getBookById(id))
            .then((response) => {
                setBookDetail(response.payload);
                setShowDetail(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch, id]);

    return (
        <>
            <div className={style.cardContainer}>{showDetail ? (
                <div className={style.card}>
                    <h2>{bookDetail.title}</h2>
                    <p>Author: {bookDetail.author}</p>
                    <p>Editorial: {bookDetail.editorial}</p>
                    <p>Genre: {bookDetail.genre}</p>
                    <img src={bookDetail.image} alt={bookDetail.title} />
                    <p>Price: {bookDetail.price}</p>
                    <p>Rating: {bookDetail.rating}</p>
                    <p>Year: {bookDetail.year}</p>
                </div>
            ) : (
                <p>Loading book detail...</p>
            )}
            </div>
            <Link to='/home'><button >HOME</button></Link>
            <Link to='/buy'><button>BUY BOOK</button></Link>
        </>
    );
};


export default CardDetail;
