import React, {createContext, useContext, useState} from "react";
import {setCookie, getCookie, deleteCookie} from "../lib/utils.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

const authenticationContext = createContext(null);

export const AuthenticationContextProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logoutHandler = () => {
        deleteCookie('accessToken');
        setUser(null);
        setLoggedIn(false);
        toast.success('Logout Successful');
        window.location.reload();
    }

    const getUser = async () => {
        try {
            const accessToken = getCookie('accessToken');
            const {data} = await axios.post('/server/api/users', {}, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
            setLoggedIn(true);
            setUser(data);
        } catch (error) {

        }
    }

    const signupHandler = async (credentials) => {
        try {
            const {data} = await axios.post('/server/api/users/register', JSON.stringify(credentials), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            toast.success("Registration Successful");
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const loginHandler = async (credentials) => {
        try {
            const {data} = await axios.post('/server/api/users/login', JSON.stringify(credentials), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            toast.success("Login Successful");
            setCookie('accessToken', data?.accessToken);
            await getUser();
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    return (
        <authenticationContext.Provider
            value={{user, setUser, loggedIn, setLoggedIn, loginHandler, signupHandler, getUser, logoutHandler}}>
            {children}
        </authenticationContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authenticationContext);
}