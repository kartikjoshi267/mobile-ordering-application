import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/buyer/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Cart from "./pages/buyer/Cart.jsx";
import SellerDashboard from "./pages/seller/SellerDashboard.jsx";
import {useAuth} from "./context/AuthenticationContext.jsx";

const App = () => {
    const {user} = useAuth();

    return (
        <>
            <Routes>
                <Route path="/" element={user && user.role === 'seller' ? <SellerDashboard/> : <HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>
    )
};

export default App;
