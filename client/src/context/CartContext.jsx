import React, {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthenticationContext.jsx";
import axios from "axios";
import {getCookie} from "../lib/utils.js";
import {toast} from "react-hot-toast";

const cartContext = createContext(null);

export const CartContextProvider = ({children}) => {
    const { loggedIn, user, getUser } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (loggedIn)
            setCartItems(user?.cart);
    }, [loggedIn]);

    // Function to add an item to the cart
    const onAddToCart = async (product) => {
        try {
            const { data } = await axios.post(import.meta.env.VITE_BACKEND_URI+'/server/api/mobiles/cart', JSON.stringify({ _id: product._id }), {
                headers: {
                    Authorization: 'Bearer ' + getCookie('accessToken'),
                    "Content-Type": 'application/json'
                }
            });
            await getUser();
            setCartItems(data?.cart);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // Function to remove an item from the cart
    const onRemoveItem = async (productId) => {
        try {
            const { data } = await axios.delete(import.meta.env.VITE_BACKEND_URI+`/server/api/mobiles/cart?productId=${productId}`, {
                headers: {
                    Authorization: 'Bearer ' + getCookie('accessToken'),
                    "Content-Type": 'application/json'
                }
            });
            await getUser();
            setCartItems(data?.cart);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <cartContext.Provider value={{ cartItems, setCartItems, onAddToCart, onRemoveItem }}>
            {children}
        </cartContext.Provider>
    );
}

export const useCart = () => {
    return useContext(cartContext);
}