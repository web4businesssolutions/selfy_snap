import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ShoppingCart, Heart, Star, Eye, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext'; // adjust path if needed

const ProductCard = ({ product }) => {
    const { _id, name, price, stock, images = [], category, rating } = product;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const hasMultipleImages = images.length > 1;

    const handleMouseEnter = () => {
        if (hasMultipleImages) {
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex(prev => (prev + 1) % images.length);
            }, 1500);
        }
    };

    const handleMouseLeave = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCurrentImageIndex(0);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login to add items to cart.");
            navigate("/login");
            return;
        }
        addToCart(product);
        toast.success("Product added to cart!");
    };

    return (
        <div
            className="flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative overflow-hidden rounded-t-xl">
                <div className="relative h-48">
                    <Link to={`/product/${_id}`}>
                        <img
                            src={`http://localhost:4000${images[currentImageIndex] || images[0]}`}
                            alt={name}
                            className="w-full h-full object-contain bg-white p-4 transition-all duration-500"
                        />
                    </Link>

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-50 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                        </button>
                        <Link to={`/product/${_id}`} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 hover:text-blue-500">
                            <Eye className="h-4 w-4" />
                        </Link>
                    </div>

                    {stock <= 0 ? (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Out of Stock
                        </span>
                    ) : (
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            In Stock
                        </span>
                    )}

                    {hasMultipleImages && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                    <Link to={`/product/${_id}`}>
                        <h3 className="text-md font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                            {name}
                        </h3>
                    </Link>

                    <p>{category}</p>

                    <div className="flex items-center mb-1">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.round(rating || 4) ? 'fill-current' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({rating || 4}.0)</span>
                    </div>
                </div>

                <div className="flex items-center mt-auto">
                    <p className="text-blue-600 font-bold text-lg">₹{price}</p>
                </div>

                <div className=" flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition text-sm font-medium
                            ${stock <= 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-yellow-300 hover:bg-yellow-400 text-black'}`}
                        disabled={stock <= 0}
                    >
                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </button>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition text-sm font-medium
                            ${stock <= 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-orange-300 hover:bg-orange-400 text-black'}`}
                        disabled={stock <= 0}
                    >
                        <CreditCard className="h-4 w-4" /> Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/productdetail/alldetails");
                setProducts(res.data.products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800 border-b-4 border-blue-500 inline-block pb-2 rounded">
                    New Arrivals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                            <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-8 bg-gray-200 rounded mt-4"></div>
                                <div className="flex gap-2">
                                    <div className="h-10 bg-gray-200 rounded flex-1"></div>
                                    <div className="h-10 bg-gray-200 rounded flex-1"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800 border-b-4 border-blue-500 inline-block pb-2 rounded">
                New Arrivals
            </h2>

            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-600">No products found</p>
                    <p className="text-gray-500 mt-2">Check back later for new arrivals</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Product;
