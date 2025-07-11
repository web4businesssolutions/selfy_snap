import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://selfy-snap-o6ka.onrender.com/api/productdetail/singledetail/${id}`);
                setProduct(res.data.product);
                setSelectedImage(`https://selfy-snap-o6ka.onrender.com${res.data.product.images?.[0]}`);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError('Failed to load product.');
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center mt-10">Loading product...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden transition-all duration-300">
                {/* Left: Image Preview */}
                <div className="md:w-1/2 p-6 bg-gray-50">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-full h-80 object-contain rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
                    />

                    <div className="grid grid-cols-4 gap-3">
                        {product.images?.slice(0, 4).map((img, index) => (
                            <img
                                key={index}
                                src={`https://selfy-snap-o6ka.onrender.com${img}`}
                                alt={`Thumbnail ${index}`}
                                onClick={() => setSelectedImage(`https://selfy-snap-o6ka.onrender.com${img}`)}
                                className={`h-20 w-full object-contain cursor-pointer border p-1 rounded-lg transition duration-200 ${selectedImage === `https://selfy-snap-o6ka.onrender.com${img}`
                                        ? 'border-blue-600 ring-2 ring-blue-300'
                                        : 'hover:border-blue-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
                        <p className="text-gray-900 mb-4">
                            <span className="font-semibold">Description:</span> {product.description}
                        </p>

                        <div className="text-lg font-medium text-gray-800 mb-2">
                            Price: <span className="text-gray-900 font-bold">₹{product.price}</span>
                        </div>
                        <div className="mb-1">Stock: <span className="text-gray-700">{product.stock}</span></div>
                        <div className="mb-1">Brand: <span className="text-gray-700">{product.brand}</span></div>
                        <div className="mb-1">Category: <span className="text-gray-700">{product.category?.name}</span></div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow"
                        >
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
