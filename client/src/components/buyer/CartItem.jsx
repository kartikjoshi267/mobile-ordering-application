import React from "react";
import {useCart} from "../../context/CartContext.jsx";

const CartItem = ({ item }) => {
    const {onRemoveItem} = useCart();

    return (
        <div key={item._id}
             className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow">
            <div className="flex items-center">
                <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price?.toFixed(2)}</p>
                </div>
            </div>
            <div>
                <button
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={() => onRemoveItem(item._id)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem;