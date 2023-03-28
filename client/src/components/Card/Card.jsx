import style from './Card.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFavorite, addFavorite } from '../../redux/rootReducer/favoriteSlice'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material'
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const Card = (props) => {
    const favorites = useSelector(state => state.favorite.favorites);
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        favorites.forEach((fav) => {
            if (fav.id === props.id) {
                setIsFav(true);
            }
        });
    }, [favorites, props.id]);

    const handleFavorite = () => {
        if (isFav) {
            dispatch(deleteFavorite(props.id));
            setIsFav(false);
        } else {
            dispatch(addFavorite({ image: props.image, id: props.id, title: props.title, author: props.author, price: props.price, stock: props.stock }));

            setIsFav(true);
        }
    };

    return (
        <Box sx={{flexDirection: 'column', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'box-shadow 0.3s ease', height: '450px', width: '250px' }} className={style.card}>
            {
                isFav ? (
                    <button className={style.btnFav} onClick={() => handleFavorite()}> <BookmarkOutlinedIcon size= 'small' color='primary' /></button >
                ) : (
                    <button className={style.btnFav} onClick={() => handleFavorite()}><BookmarkBorderOutlinedIcon size='small' color='primary' /></button>
                )}
            <CardMedia
                component="img"
                height='300'
                sx={{ width: '10rem', height: '14rem', objectFit: 'cover', marginTop: '25px' }}
                image={props.image}
                alt={props.name}    
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.stock ? <p>Stock: {props.stock}</p> : null}
                </Typography>
                <Typography variant="body2">
                    {props.price ? <p>Price: {props.price}</p> : null}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='outlined' color='primary' href="#contained-buttons" size="small" sx={{textDecoration: 'none'}}> <Link to={`/home/${props.id}`}>
                    Details
                </Link></Button>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <Link to={`/home/cart`}>
                        <ShoppingCartIcon />
                    </Link>
                </IconButton>
            </CardActions>
        </Box>

    )
}

export default Card;