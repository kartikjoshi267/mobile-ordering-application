import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {AuthenticationContextProvider} from "./context/AuthenticationContext.jsx";
import {BrowserRouter} from "react-router-dom";
import {CartContextProvider} from "./context/CartContext.jsx";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Toaster
            position={"top-left"}
            reverseOrder={false}
        />
        <AuthenticationContextProvider>
            <CartContextProvider>
                <App/>
            </CartContextProvider>
        </AuthenticationContextProvider>
    </BrowserRouter>
)
