import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Drawer,
    Box
} from '@mui/material';

import { deleteFavorite } from '../../redux/rootReducer/favoriteSlice'
import { addProduct } from '../../redux/rootReducer/cartSlice';
import { closeFav } from '../../redux/rootReducer/toogleFavSlice';


const Favorites = () => {
    const favorites = useSelector(state => state.favorite.favorites);
    const dispatch = useDispatch();
    const toogleFav = useSelector(state => state.toogleFav.isOpen);

    const handleDelete = (id) => {
        dispatch(deleteFavorite(id));
    };

    const addToCart = (book) => {
        dispatch(addProduct(book))
        dispatch(deleteFavorite(book.id))
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
            <Drawer anchor={'bottom'} open={toogleFav} onClose={() => { dispatch(closeFav()) }}>
                <Box sx={{ maxHeight: '80%', p: 2 }}>
                    <TableContainer component={Paper} style={{ margin: '0 auto', width: '100%' }}>
                        <Table aria-label='simple table' style={{ tableLayout: 'fixed' }}>
                            <colgroup>
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                            </colgroup>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#FFD600' }}>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Authors</TableCell>
                                    <TableCell>Editorial</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Delete</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favorites ? favorites.favorites.map((favorite, index) => (
                                    <TableRow sx={styles.tableRow} key={index}>
                                        <TableCell sx={styles.tableCell}>{favorite.title}</TableCell>
                                        <TableCell sx={styles.tableCell}>{favorite.authors.join(', ')}</TableCell>
                                        <TableCell sx={styles.tableCell}>{favorite.editorial}</TableCell>
                                        <TableCell sx={{ ...styles.tableCell, maxWidth: '100px' }}>
                                            <img src={favorite.image} alt='asdf' style={{ width: '30%', height: 'auto' }} />
                                        </TableCell>
                                        <TableCell sx={styles.tableCell}>{favorite.price}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDelete(favorite.id)} variant="contained" color="primary" size='small'>Delete</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => addToCart(favorite)} variant="contained" color="primary" size='small'>Add to Cart</Button>
                                        </TableCell>
                                    </TableRow>
                                )) : 'There is no Favorites added'}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Drawer>
        </>)

}

export default Favorites;
