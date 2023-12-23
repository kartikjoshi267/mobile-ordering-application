import React, {useState, useEffect} from 'react';

const SearchBar = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('all');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm, selectedProperty);
        }, 900);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, selectedProperty, onSearch]);

    const handleReset = () => {
        setSearchTerm('');
        setSelectedProperty('all');
        onSearch('', 'all');
    };

    return (
        <div className="flex items-center space-x-4">
            <input
                type="text"
                placeholder="Search by keyword"
                className="border p-2 rounded-md flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
                className="border p-2 rounded-md"
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
            >
                <option value="all">All Properties</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="type">Type</option>
                <option value="processor">Processor</option>
                <option value="memory">Memory</option>
                <option value="os">OS</option>
            </select>
            <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
                onClick={handleReset}
            >
                Reset
            </button>
        </div>
    );
};

export default SearchBar;