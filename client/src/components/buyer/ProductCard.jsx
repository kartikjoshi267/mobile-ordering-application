import React from 'react';
import { StarIcon } from "@heroicons/react/solid";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthenticationContext.jsx";
import {useCart} from "../../context/CartContext.jsx";
import {toast} from "react-hot-toast";

const ProductCard = ({ _id, name, price, type, processor, memory, os }) => {
    const navigate = useNavigate();
    const { loggedIn } = useAuth();
    const { onAddToCart } = useCart();

    const onCartClick = (product) => {
        if (loggedIn)
            onAddToCart(product);
        else {
            toast('Please login or signup to add items to cart and place orders', {
                position: 'top-center',
                style: {
                    backgroundColor: 'rgba(0,0,205,0.7)',
                    color: 'white'
                }
            });
            navigate('/login');
        }
    }

    return (
        <div className="bg-gray-100 p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
            <div>
                <h2 className="text-lg font-bold mb-2">{name}</h2>
                <p className="text-gray-700">${price}</p>
                <p className="text-gray-600 mt-2">{type?.toUpperCase()} - {processor}</p>
                <p className="text-gray-600 mb-2">{memory} - {os}</p>
            </div>
            <button
                onClick={() => onCartClick({_id, name, price, type, processor, memory, os})}
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
