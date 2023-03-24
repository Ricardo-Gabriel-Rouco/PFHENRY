import { Clean, booksDetail, addBookById } from "../../redux/rootReducer/bookSlice";
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from './Detail.module.css';

const CardDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    

    useEffect(() => {
        console.log(id)
        dispatch(addBookById(id));
        return () => {
            dispatch(Clean("detail"))
        }
    }, [dispatch, id]);

    return (
        <>
            <Link to='/home'><button className={style.btn}>Volver</button></Link>
        </>
    )
}
export default CardDetail;