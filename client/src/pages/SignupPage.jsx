import React, {useState} from 'react';
import Navbar from "../components/buyer/Navbar.jsx";
import {useAuth} from "../context/AuthenticationContext.jsx";

const SignupPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer'
    });
    const {signupHandler} = useAuth();

    const onChangeHandler = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSignup = () => {
        signupHandler(credentials);
    };

    return (
        <div className="my-8 mx-9">
            <Navbar />
            <div className="flex justify-center items-center m-20">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                    <form>
                        <div className="mb-4">

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name={"username"}
                                className="w-full border p-2 rounded-md"
                                placeholder="Enter your name"
                                value={credentials.username}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name={"email"}
                                className="w-full border p-2 rounded-md"
                                placeholder="Enter your email"
                                value={credentials.email}
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
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="isBuyer"
                                className="mr-2"
                                checked={credentials.role === 'buyer'}
                                onChange={() => setCredentials({
                                    ...credentials,
                                    role: credentials.role === 'buyer' ? 'seller' : 'buyer'
                                })}
                            />
                            <label className="text-gray-600 text-sm" htmlFor="isBuyer">
                                Sign up as Buyer
                            </label>
                        </div>
                        <button
                            type="button"
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;