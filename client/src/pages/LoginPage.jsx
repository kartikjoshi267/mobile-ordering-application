import React, {useState} from 'react';
import {useAuth} from "../context/AuthenticationContext.jsx";
import Navbar from "../components/buyer/Navbar.jsx";

const LoginPage = () => {
    const {loginHandler} = useAuth();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleLogin = async () => {
        await loginHandler(credentials);
    };

    return (
        <>
            <div className="my-8 mx-9">
                <Navbar/>
                <div className="flex justify-center items-center m-20">
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-4">Login</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    type="username"
                                    id="username"
                                    name={"username"}
                                    className="w-full border p-2 rounded-md"
                                    placeholder="Enter your email"
                                    value={credentials.username}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name={"password"}
                                    className="w-full border p-2 rounded-md"
                                    placeholder="Enter your password"
                                    value={credentials.password}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
