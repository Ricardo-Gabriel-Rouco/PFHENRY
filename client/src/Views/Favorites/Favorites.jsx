import { useSelector } from 'react-redux';
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
import { Link } from 'react-router-dom'

const Favorites = (props) => {
    const favorites = useSelector(state => state.favorite.favorites)

console.log(favorites.handleFavorite)
    

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
                            {favorites.map((favorite, j) => (
                                <TableRow key={j}>
                                    <TableCell>{favorite.id}</TableCell>
                                    <TableCell>{favorite.title}</TableCell>
                                    <TableCell>{favorite.author}</TableCell>
                                    <TableCell>
                                        <img src={favorite.image} alt='asdf' style={{ width: '10%' }} />
                                    </TableCell>
                                    <TableCell>{favorite.price}</TableCell>
                                    <TableCell>
                                        <Button onClick = {favorite.handleFavorite} variant="contained" color="primary" size='small'>Delete</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size ='small'>Buy</Button>
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
export default Favorites