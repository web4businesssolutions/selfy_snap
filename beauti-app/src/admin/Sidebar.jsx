import { Link } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaUsers,
    FaShoppingCart,
    FaThList,
} from 'react-icons/fa';

const Sidebar = () => {
    const role = localStorage.getItem('role'); // 'admin' or 'seller'

    return (
        <div className="w-full md:w-64 min-h-screen bg-gradient-to-b from-indigo-800 to-purple-800 text-white flex flex-col p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-10 tracking-wide text-center">
                Selfy<span className="text-pink-300">Snap</span>
            </h2>

            <nav className="flex flex-col gap-4 mt-4">
                {role === 'admin' && (
                    <>
                        <Link to="/admin/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white transition-all duration-200 shadow hover:shadow-md">
                            <FaTachometerAlt className="text-xl" />
                            <span className="text-base font-medium">Analytics</span>
                        </Link>

                        <Link to="/admin/vendor" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaUsers className="text-xl" />
                            <span className="text-base font-medium">Manage Vendors</span>
                        </Link>

                        <Link to="/admin/product" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaBoxOpen className="text-xl" />
                            <span className="text-base font-medium">Manage Products</span>
                        </Link>

                        <Link to="/admin/order" className="flex items-center gap-4 px-4 py-3 rounded-xl text-white hover:bg-indigo-700 transition-all duration-200">
                            <FaShoppingCart className="text-xl" />
                            <span className="text-base font-medium">Manage Orders</span>
                        </Link>

                        <Link to="/admin/user" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaUsers className="text-xl" />
                            <span className="text-base font-medium">Manage Users</span>
                        </Link>
                    </>
                )}

                {role === 'seller' && (
                    <>
                        <Link to="/admin/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white transition-all duration-200 shadow hover:shadow-md">
                            <FaTachometerAlt className="text-xl" />
                            <span className="text-base font-medium">Dashboard</span>
                        </Link>

                        <Link to="/admin/category" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaThList className="text-xl" />
                            <span className="text-base font-medium">Category</span>
                        </Link>

                        <Link to="/admin/product" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaBoxOpen className="text-xl" />
                            <span className="text-base font-medium">View Products</span>
                        </Link>

                        <Link to="/admin/order" className="flex items-center gap-4 px-4 py-3 rounded-xl text-white hover:bg-indigo-700 transition-all duration-200">
                            <FaShoppingCart className="text-xl" />
                            <span className="text-base font-medium">Orders</span>
                        </Link>

                        <Link to="/admin/stepper-product" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200">
                            <FaBoxOpen className="text-xl" />
                            <span className="text-base font-medium">Add Product</span>
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;
