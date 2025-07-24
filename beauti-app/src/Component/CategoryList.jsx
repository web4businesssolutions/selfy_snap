import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const CategoryScroll = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/categories/all");
            setCategories(res.data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="bg-white py-4 px-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 min-w-max justify-center">
                {categories.map((cat) => (
                    <Link
                        to={`/category/${cat.slug}`}
                        key={cat._id}
                        className="flex flex-col items-center min-w-[72px] hover:bg-gray-100 p-2 rounded-md transition"
                    >
                        <img
                            src={`http://localhost:4000/uploads/${cat.image}`}
                            alt={cat.name}
                            className="w-14 h-14 rounded-full object-cover mb-1 shadow-sm border"
                        />
                        <span className="text-sm font-semibold text-center">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryScroll;
