import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryScroll = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://selfy-snap-o6ka.onrender.com/api/categories/all");
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
                        <div key={cat._id} className="flex flex-col items-center min-w-[72px]">
                            <img
                                src={`https://selfy-snap-o6ka.onrender.com/uploads/${cat.image}`}
                                alt={cat.name}
                                className="w-14 h-14 rounded-full object-cover mb-1 shadow-sm border"
                            />
                            <span className="text-sm font-semibold text-center">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default CategoryScroll;
