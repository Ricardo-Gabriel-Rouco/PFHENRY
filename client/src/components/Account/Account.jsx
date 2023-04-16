
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getOrdersByUser } from "../../firebase/firestore/orders";
import { Grid, GridContainer, Paper, Typography, CardMedia, TableCell, TableRow, TableHead, Table, TableContainer } from '@mui/material';



function Account() {
    const { userStatus } = useAuth()
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        async function fetchOrders() {
            const data = await getOrdersByUser(userStatus.userId);
            setOrders(data);
        }
        fetchOrders();
    }, [userStatus.userId]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%', alignContent: 'center', boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }} aria-label="orders table">
                {orders.map((order) => (<>
                    <TableHead>
                        <TableCell align="left">{new Date(order.date).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' })}</TableCell>
                    </TableHead>
                    <TableRow key={order.id}>
                        <TableCell colSpan={3}>

                            <Grid container spacing={2}>
                                {order.items.map((book) => (
                                    <Grid item xs={12} sm={6} md={4} key={book.id}>

                                        <Paper sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                                            <CardMedia
                                                component="img"
                                                border='1px solid'
                                                borderRadius="10px"
                                                image={book.image}
                                                sx={{ width: 90, height: 90, mr: 2, boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }}
                                            />
                                            <div>
                                                <Typography fontWeight='bold' variant="subtitle1" gutterBottom>
                                                    {book.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    ${book.price}
                                                    <br />
                                                    Quantity: {book.quantity}
                                                </Typography>
                                            </div>
                                        </Paper>
                                    </Grid>

                                ))}
                            </Grid>

                        </TableCell>
                    </TableRow></>
                ))}
            </Table>
        </TableContainer>
    );
}

export default Account;