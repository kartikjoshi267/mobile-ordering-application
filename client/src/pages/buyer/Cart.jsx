import React, {useEffect} from 'react';
import {useCart} from "../../context/CartContext.jsx";
import Navbar from "../../components/buyer/Navbar.jsx";
import {useAuth} from "../../context/AuthenticationContext.jsx";
import CartItem from "../../components/buyer/CartItem.jsx";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const {cartItems, onRemoveItem, setCartItems} = useCart();
    const {getUser, user} = useAuth();

    useEffect(() => {
        getUser();
        setCartItems(user?.cart);
    }, [cartItems]);

    const navigate = useNavigate();

    if (!user) {
        navigate('/');
        return null;
    }

    const checkout = () => {
        for (let item of cartItems){
            onRemoveItem(item._id);
        }
    }

    return (
        <div className={"my-8 mx-9"}>
            <Navbar/>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
                {!cartItems || cartItems?.length === 0 ? (
                    <p className="text-gray-400 text-center text-3xl pt-10">Your cart is empty.</p>
                ) : (
                    <div>
                        {cartItems?.map((item) => (
                            <CartItem item={item} key={item._id}/>
                        ))}
                        <div className="mt-4">
                            <p className="text-xl font-semibold">Total: ${calculateTotal(cartItems)}</p>
                            <button
                                className="cursor-pointer bg-blue-500 p-2 my-3 rounded-xl hover:bg-blue-600 text-white duration-200"
                                onClick={checkout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function to calculate the total price of items in the cart
const calculateTotal = (cartItems) => {
    return cartItems?.reduce((total, item) => total + item.price, 0).toFixed(2);
};

export default Cart;
