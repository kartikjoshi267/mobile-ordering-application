import React, {useEffect, useState} from "react";
import SearchBar from "../../components/buyer/SearchBar.jsx";
import ProductCard from "../../components/buyer/ProductCard.jsx";
import {Link} from "react-router-dom";
import Navbar from "../../components/buyer/Navbar.jsx";
import axios from "axios";
import {getCookie} from "../../lib/utils.js";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const initialProducts = async () => {
            const { data } = await axios.get('/server/api/mobiles?', {
                headers: {
                    Authorization: 'Bearer ' + getCookie('accessToken')
                }
            });
            setProducts(data);
        }

        initialProducts();
    }, []);

    const handleSearch = (searchTerm, selectedProperty) => {
        let filteredProducts;

        if (selectedProperty === 'all') {
            filteredProducts = products.filter((product) =>
                Object.values(product).some((value) =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            filteredProducts = products.filter((product) =>
                product[selectedProperty]
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        setProducts(filteredProducts);
    };

    return (
        <>
            <div className="my-8 mx-9">
                <Navbar/>
                <SearchBar onSearch={handleSearch}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {products?.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomePage;