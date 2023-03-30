import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../firebase/firestore/books";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import style from './CardDetail.module.css';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material'
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

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
        <div className={style.container}>
            {showDetail ? (
                <Box sx={{ flexDirection: 'column', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'box-shadow 0.3s ease', height: '40%', width: '40%' }} className={style.card}>
                    <CardContent>
                        <Typography variant='h4' color="text.primary" gutterBottom>
                            {bookDetail.title}
                        </Typography>
                        <Typography variant="h5">
                            <p>Authors: {bookDetail.authors.join(', ')}</p>
                            <p>Editorial: {bookDetail.editorial}</p>
                            <p>Genres: {bookDetail.genres.join(', ')}</p>
                        </Typography>
                        <CardMedia
                            component="img"
                            height='300px'
                            sx={{width: '20%', height: '20%', marginTop: '25px', marginLeft: '40%'}}
                            image={bookDetail.image}
                            alt={bookDetail.name}
                        />
                        <Typography variant="body2">
                            <p>Price: {bookDetail.price}</p>
                            <p>Rating: {bookDetail.rating}</p>
                            <p>Year: {bookDetail.year}</p>
                        </Typography>
                    </CardContent>
                    <Box>
                        <CardContent>
                            <IconButton color='primary'>
                                <Link to='/home'><HomeOutlinedIcon /></Link>
                            </IconButton>
                            <IconButton color="primary" aria-label="add to shopping cart">
                                <Link to={`/home/cart`}>
                                    <ShoppingCartIcon />
                                </Link>
                            </IconButton>
                        </CardContent>
                    </Box>
                </Box>
            ) : (
                <p>Loading book detail...</p>
            )}
        </div>

    );
};



export default CardDetail;
