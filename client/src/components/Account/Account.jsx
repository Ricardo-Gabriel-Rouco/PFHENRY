
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getOrdersByUser } from "../../firebase/firestore/orders";
import { Grid, Paper, Typography, CardMedia, TableCell, TableRow, TableHead, Table, TableContainer, TableBody } from '@mui/material';



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
            <Table sx={{ width: '100%', alignContent: 'center' }} aria-label="orders table">
                {orders.map((order) => (<>
                    <TableHead>
                        <TableCell align="left">{new Date(order.date).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' })}</TableCell>
                    </TableHead>
                    <TableRow key={order.id}>
                        <TableCell colSpan={3}>

                            {order.items.map((book) => (
                                <Grid item xs={12} sm={6} md={4} key={book.id}>
                                    <Paper sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                                        <CardMedia
                                            component="img"
                                            image={book.image}
                                            sx={{ width: 50, height: 50, mr: 2 }}
                                        />
                                        <div>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {book.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                ${book.price}
                                            </Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                            ))}

                        </TableCell>
                    </TableRow></>
                ))}
            </Table>
        </TableContainer>
    );
}

export default Account;