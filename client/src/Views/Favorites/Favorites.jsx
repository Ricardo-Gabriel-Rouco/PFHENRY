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
    Paper
} from '@mui/material';

import { deleteFavorite } from '../../redux/rootReducer/favoriteSlice'
import { Link } from 'react-router-dom'


const Favorites = () => {
    const favorites = useSelector(state => state.favorite.favorites)
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(deleteFavorite(id));
    };

    return (
        <>
            <div className={style.container}>
                <TableContainer component={Paper} style={{ margin: '0 auto', width: '100%' }}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell>Buy</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {favorites.map((favorite, index) => (
                                <TableRow key={index}>

                                    <TableCell>{favorite.id}</TableCell>
                                    <TableCell>{favorite.title}</TableCell>
                                    <TableCell>{favorite.author}</TableCell>
                                    <TableCell className={style.imageCell}>
                                        <img src={favorite.image} alt='asdf' />
                                    </TableCell>
                                    <TableCell>{favorite.price}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDelete(favorite.id)} variant="contained" color="primary" size='small'>Delete</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size='small'>Cart</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                </div>
            </div>
            <div className={style.btn}>
                <Button variant="contained" color='primary'><Link to='/home'>Back to Home</Link></Button>
            </div>
        </>
    );
}

export default Favorites;
