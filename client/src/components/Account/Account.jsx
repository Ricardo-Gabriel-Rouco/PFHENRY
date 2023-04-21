import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getOrdersByUser } from "../../firebase/firestore/orders";
import { Grid, Paper, Typography, CardMedia, TableCell, TableRow, TableHead, Table, TableContainer } from '@mui/material';
import { useSelector } from "react-redux";

function Account() {
    const { userStatus } = useAuth()
    const [orders, setOrders] = useState([]);
    const displayableBooks = useSelector((state) => state.books.displayableBooks)

    useEffect(() => {
        async function fetchOrders() {
            const data = await getOrdersByUser(userStatus.userId);
            setOrders(data);
        }
        fetchOrders();
    }, [userStatus.userId]);

    const getOrders = [
        ...new Set(
            orders.flatMap((authors) => authors.items.flatMap((a) => a.id))
        ),
    ];


    const favoriteInfo = displayableBooks.filter((book) => { return getOrders.includes(book.id) })
    console.log(favoriteInfo)
    const userData = favoriteInfo.map((book) => {
        return {
            id: book.id,
            price: book.unit_price,
            image: book.image,
            title: book.title,
        }
    })

    const combinedData = orders.map((order) => {
        const items = order.items.map((item) => {
            const book = userData.find((b) => b.id === item.id);
            return {
                ...item,
                image: book.image,
                title: book.title,
                price: book.price,
            };
        });
        return {
            date: order.date,
            items,
        };
    });
    console.log(combinedData)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%', alignContent: 'center', boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }} aria-label="orders table">
                {combinedData ? combinedData.map((order) => (
                    <>
                        <TableHead>
                            <TableCell align="left">
                                <Typography fontSize={'15px'} fontWeight='bold'>
                                    {new Date(order.date).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' })}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography fontSize={'13px'} fontWeight='bold'>
                                    {`Total: ${order.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}`}
                                </Typography>
                            </TableCell>
                        </TableHead>
                        <TableRow sx={{ color: "InfoBackground" }} hover={true} key={order.id}>
                            <TableCell colSpan={3}>
                                <Grid container spacing={2}>
                                    {order.items.map((item) => (
                                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                                            <Paper sx={{ display: 'flex', alignItems: 'center', padding: 2, '&:hover': { bgcolor: 'InfoBackground' } }}>
                                                <CardMedia
                                                    component="img"
                                                    border='1px solid'
                                                    borderRadius="10px"
                                                    image={item.image}
                                                    sx={{ width: 90, height: 90, mr: 2, boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }}
                                                />
                                                <div>
                                                    <Typography fontWeight='bold' variant="subtitle1" gutterBottom>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        ${item.price}
                                                    </Typography>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </>
                )) : 'You have no books purchased'}
            </Table>
        </TableContainer >
    );
}

export default Account;