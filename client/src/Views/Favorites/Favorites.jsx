import { useSelector, useDispatch } from 'react-redux';
import style from './Favorites.module.css';
import {
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';

import { deleteFavorite } from '../../redux/rootReducer/favoriteSlice'

import { addProduct } from '../../redux/rootReducer/cartSlice';


const Favorites = () => {
    const favorites = useSelector(state => state.favorite.favorites)
    const dispatch = useDispatch()


const handleDelete = (id) => {
        dispatch(deleteFavorite(id));
    };

const addToCart = (id) => {
    dispatch(addProduct(id))
    dispatch(deleteFavorite(id))
    alert('Libro agregado al carrito')
}




    const styles = {
        tableCell: {
            color: '#8a5509',
            fontWeight: 'bold',
        },
        tableRow: {
            backgroundColor: '#f7f5f5',
            '&:hover': {
                backgroundColor: '#f7d835',
            },
        },
    };


    return (
        <>
            <div className={style.container}>
                <TableContainer backgroundColor='#f7f5f5' component={Paper} style={{ margin: '0 auto', width: '100%' }}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Authors</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {favorites? favorites.favorites.map((favorite, index) => (

                                <TableRow sx={styles.tableRow} key={index}>
                                    <TableCell sx={styles.tableCell}>{favorite.id}</TableCell>
                                    <TableCell sx={styles.tableCell}>{favorite.title}</TableCell>
                                    <TableCell sx={styles.tableCell}>{favorite.authors.join(', ')}</TableCell>
                                    <TableCell sx={styles.tableCell}>
                                        <img src={favorite.image} alt='asdf' style={{ width: '10%' }} />

                                    </TableCell>
                                    <TableCell sx={styles.tableCell}>{favorite.price}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDelete(favorite.id)} variant="contained" color="primary" size='small'>Delete</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => addToCart(favorite)}variant="contained" color="primary" size='small'>Add to Cart</Button>

                                    </TableCell>
                                </TableRow>
                            )): 'There is no Favorites added'}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                </div>
            </div>
        </>
    );
}

export default Favorites;
