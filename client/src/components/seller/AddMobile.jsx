import React, {useState} from 'react';

const AddMobile = ({onAddMobile}) => {
    const [mobile, setMobile] = useState({
        name: '', os: '', processor: '', price: '', type: '', memory: ''
    });

    const handleAddMobile = () => {
        onAddMobile(mobile);
        setMobile({
            name: '', os: '', processor: '', price: '', type: '', memory: ''
        })
    };

    const onChangeHandler = (e) => {
        setMobile({...mobile, [e.target.name]: e.target.value});
    }

    return (<div>
        <h2 className="text-2xl font-semibold mb-4">Add Mobile</h2>
        <div className="flex items-center w-full">
            <input
                type="text"
                placeholder="Enter mobile name"
                name={'name'}
                value={mobile.name}
                onChange={(e) => onChangeHandler(e)}
                className="p-2 border border-gray-300 mr-2"
            />
            <input
                type="number"
                placeholder="Enter price (in $)"
                value={mobile.price}
                name={'price'}
                onChange={(e) => onChangeHandler(e)}
                className="p-2 border border-gray-300 mr-2"
            />
            <input
                type="text"
                placeholder="Enter mobile os"
                value={mobile.os}
                name={'os'}
                onChange={(e) => onChangeHandler(e)}
                className="p-2 border border-gray-300 mr-2"
            />
            <input
                type="text"
                placeholder="Enter mobile processor"
                value={mobile.processor}
                name={'processor'}
                onChange={(e) => onChangeHandler(e)}
                className="p-2 border border-gray-300 mr-2"
            />
            <input
                type="text"
                placeholder="Enter memory size"
                value={mobile.memory}
                name={'memory'}
                onChange={(e) => onChangeHandler(e)}
                className="p-2 border border-gray-300 mr-2"
            />
            <input
                type="text"
                placeholder="Enter type"
                value={mobile.type}
                name={'type'}
                onChange={(e) => onChangeHandler(e)}
                className="p-2 border border-gray-300 mr-2"
            />
        </div>
        <button
            onClick={handleAddMobile}
            className="bg-blue-500 text-white p-2 my-5 rounded-xl hover:bg-blue-600 duration-200"
        >
            Add Mobile
        </button>
    </div>);
};

export default AddMobile;
