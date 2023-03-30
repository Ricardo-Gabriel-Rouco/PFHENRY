import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useEffect, useState } from 'react';



const Cart = () => {

    const [cart, setCart] = useState(getCart());
    const [total, setTotalPrice] = useState(0)

    useEffect(() => {
        const newTotalPrice = cart.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
        setTotalPrice(newTotalPrice);
    }, [cart]);

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    useEffect(() => {
        const cartFromLocalStorage = getCart();
        setCart(cartFromLocalStorage);
    }, []);


    //controller


    const addToCart = (product) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(p => p.id === product.id);

        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        updateCartInLocalStorage(updatedCart);
    }

    const removeFromCart = (productId) => {
        const productIndex = cart.findIndex((p) => p.id === productId);

        if (productIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[productIndex] = {
                ...updatedCart[productIndex],
                quantity: updatedCart[productIndex].quantity - 1
            };
            if (updatedCart[productIndex].quantity === 0) {
                updatedCart.splice(productIndex, 1);
            }

            setCart(updatedCart);
            updateCartInLocalStorage(updatedCart);
        }
    };

    const updateCartInLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    function removeAll() {
        localStorage.removeItem('cart');
    }
    //handlers
    const handleAdd = (id) => {
        addToCart(id)

    };

    const handleRemove = (id) => {
        removeFromCart(id)
    };

    const handleRemoveAll = () => {
        removeAll()

    };



    return (
        <div>
            <h2>Cart</h2>
            <h3>Products</h3>
            {cart && cart.length ? cart.map((product) => {
                return (
                    <div key={product.id}>
                        <p>{product.title}</p>
                        <p>({product.authors})</p>
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
            }) : 
            <h6>Total price:</h6>}
            <Button onClick={() => handleRemoveAll()} variant="contained" color="secondary" size="small">
                Remove all products
            </Button>
        </div>
    )
}


export default Cart;


//link snackbar para notificación de agregado de libro // https://mui.com/material-ui/react-snackbar/