// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaBoxOpen, FaUsers, FaShoppingCart } from 'react-icons/fa';

// const Sidebar = () => {
//     return (
//         <div className="w-full md:w-64 h-screen bg-slate-800 text-white flex flex-col p-4">
//             <h2 className="text-2xl font-bold mb-6">Selfy Snap</h2>

//             {/* Make sure it's not wrapped in a <ul> or apply list-none if it is */}
//             <nav className="flex flex-col gap-2 mt-14 list-none">
//                 <Link to="/admin/dashboard" className="flex items-center gap-4 hover:bg-blue-700 p-2 rounded text-white text-lg no-underline">
//                     <FaTachometerAlt className="text-xl" /> Dashboard
//                 </Link>
//                 <Link to="/admin/category" className="flex items-center gap-4 hover:bg-blue-700 p-2 rounded text-white text-lg no-underline">
//                     <FaTachometerAlt className="text-xl" /> Category
//                 </Link>

//                 <Link to="/admin/product" className="flex items-center gap-4 hover:bg-blue-700 p-2 rounded text-white text-lg no-underline">
//                     <FaBoxOpen className="text-xl" /> Products
//                 </Link>
//                 <Link to="/admin/user" className="flex items-center gap-4 hover:bg-blue-700 p-2 rounded text-white text-lg no-underline">
//                     <FaUsers className="text-xl" /> Users
//                 </Link>
//                 <Link to="/admin/order" className="flex items-center gap-4 hover:bg-blue-700 p-2 rounded text-white text-lg no-underline">
//                     <FaShoppingCart className="text-xl" /> Orders
//                 </Link>
//             </nav>
//         </div>
//     );
// };

// export default Sidebar;































import { Link } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaUsers,
    FaShoppingCart,
    FaThList,
} from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="w-full md:w-64 min-h-screen bg-gradient-to-b from-indigo-800 to-purple-800 text-white flex flex-col p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-10 tracking-wide text-center">
                Selfy<span className="text-pink-300">Snap</span>
            </h2>

            <nav className="flex flex-col gap-4 mt-4">
                <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white transition-all duration-200 shadow hover:shadow-md"
                >
                    <FaTachometerAlt className="text-xl" />
                    <span className="text-base font-medium">Dashboard</span>
                </Link>

                <Link
                    to="/admin/category"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200"
                >
                    <FaThList className="text-xl" />
                    <span className="text-base font-medium">Category</span>
                </Link>

                <Link
                    to="/admin/product"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 text-white transition-all duration-200"
                >
                    <FaBoxOpen className="text-xl" />
                    <span className="text-base font-medium">Products</span>
                </Link>

                {/* <Link
                    to="/admin/user"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200"
                >
                    <FaUsers className="text-xl" />
                    <span className="text-base font-medium">Users</span>
                </Link> */}

                <Link
                    to="/admin/order"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-white hover:bg-indigo-700 transition-all duration-200"
                >
                    <FaShoppingCart className="text-xl" />
                    <span className="text-base font-medium">Orders</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;

