import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthenticationContext.jsx";
import { ShoppingCartIcon } from "@heroicons/react/outline";

const Navbar = () => {
    const { loggedIn, user, logoutHandler, getUser } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center md:mb-10 mb-0">
            <Link to={"/"} className="text-3xl font-bold text-center md:text-left">
                Mobile Ordering App
            </Link>
            <hr className={"h-0.5 md:hidden bg-black w-1/2 my-4"} />
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                {loggedIn ? (
                    <div className="flex space-x-3 items-center">
                        {user && user.role === 'buyer' && <Link to={"/cart"}>
                            <ShoppingCartIcon className="w-10 h-10 py-2" />
                        </Link>}
                        <div className="p-2">
                            <span className="font-bold text-blue-600">{user?.username}</span>
                        </div>
                        <button
                            onClick={logoutHandler}
                            className="cursor-pointer bg-red-500 p-2 rounded-xl hover:bg-red-600 text-white duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link
                            to="/login"
                            className="bg-blue-500 mr-4 p-2 rounded-xl hover:bg-blue-600 text-white duration-200"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-green-500 p-2 rounded-xl hover:bg-green-600 text-white duration-200"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
