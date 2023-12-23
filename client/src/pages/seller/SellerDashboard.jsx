// pages/SellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import AddMobile from '../../components/seller/AddMobile';
import Navbar from "../../components/buyer/Navbar.jsx";
import axios from "axios";
import { getCookie } from "../../lib/utils.js";

const SellerDashboard = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        const fetchMobiles = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URI+'/api/mobiles/seller', {
                    headers: {
                        Authorization: 'Bearer ' + getCookie('accessToken')
                    }
                });
                const data = response.data;
                setMobiles(data);
            } catch (error) {
                console.error('Error fetching mobiles:', error);
            }
        };

        fetchMobiles();
    }, []);

    const handleAddMobile = async (newMobile) => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URI+'/api/mobiles/', newMobile, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('accessToken')
                },
            });

            if (response.status === 200) {
                const addedMobile = response.data;
                setMobiles([...mobiles, addedMobile]);
            } else {
                console.error('Failed to add mobile:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding mobile:', error);
        }
    };

    return (
        <div className="my-8 mx-9">
            <Navbar />
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-semibold mb-8">Seller Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AddMobile onAddMobile={handleAddMobile} />
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Added Mobiles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {mobiles.map((mobile) => (
                            <div
                                className="bg-gray-100 p-6 rounded-md shadow-md transition-transform transform hover:scale-105"
                                key={mobile._id}
                            >
                                <div>
                                    <h2 className="text-lg font-bold mb-2">{mobile.name}</h2>
                                    <p className="text-gray-700">${mobile.price}</p>
                                    <p className="text-gray-600 mt-2">{mobile.type?.toUpperCase()} - {mobile.processor}</p>
                                    <p className="text-gray-600 mb-2">{mobile.memory} - {mobile.os}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
