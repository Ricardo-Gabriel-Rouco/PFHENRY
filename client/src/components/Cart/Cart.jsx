import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addProduct, removeProduct, removeAllProducts, updateCart } from '../../redux/rootReducer/cartSlice'

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const totalPrice = useSelector(state => state.totalPrice)
    //handlers
    const handleAdd = (id) => {
        dispatch(addProduct(id));
    };

    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

    const handleRemoveAll = (id) => {
        dispatch(removeAllProducts(id));
    };
    console.log(cart.totalPrice)
    

    return (
        <div>
            <h2>Cart</h2>
            <h3>Products</h3>
            {cart.cart && cart.cart.length ? cart.cart.map((product) => {
                return (
                    <div key={product.id}>
                        <p>{product.title} ({product.author})</p>
                        <img src={product.image} alt={product.title} width="100" height="150" />
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <Button onClick={() => handleAdd(product)} variant="contained" color="primary" size="small">
                            <AddIcon />
                        </Button>
                        <Button onClick={() => handleRemove(product.id)} variant="contained" color="primary" size="small">
                            <RemoveIcon />
                        </Button>
                    </div>
                );
            }) : 'You dont have products in your cart'}
            <h5>{cart.totalPrice}</h5>
            <Button onClick={() => handleRemoveAll()} variant="contained" color="secondary" size="small">
                Remove all products
            </Button>
        </div>
    )
}

export default Cart;


//link snackbar para notificación de agregado de libro // https://mui.com/material-ui/react-snackbar/