import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`https://selfy-snap-1-7kn9.onrender.com/api/orders/seller`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
                setFilteredOrders(res.data);
            } catch (err) {
                toast.error(err.response?.data?.error || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    // 🔍 Search filter
    useEffect(() => {
        if (!search) {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order =>
                order.items.some(item =>
                    item.product?.name?.toLowerCase().includes(search.toLowerCase())
                )
            );
            setFilteredOrders(filtered);
        }
    }, [search, orders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`https://selfy-snap-1-7kn9.onrender.com/api/orders/admin/update/${orderId}`, {
                status: newStatus,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Order status updated");

            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to update status');
        }
    };

    // 🧱 Table Columns
    const columns = [
        {
            name: 'Order ID',
            selector: row => row._id,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Product',
            cell: row => (
                <div className="flex items-center gap-2">
                    {row.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-1">
                            <img
                                src={`https://selfy-snap-1-7kn9.onrender.com${item.product.images[0]}`}
                                alt={item.product.name}
                                className="w-10 h-10 object-cover rounded"
                            />
                            <span>{item.product.name}</span>
                        </div>
                    ))}
                </div>
            ),
            grow: 2,
        },
        {
            name: 'Total Amount',
            cell: row => {
                const total = row.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
                return `₹${total.toFixed(2)}`;
            },
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            ),
        },
        {
            name: 'Placed On',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>

            <input
                type="text"
                placeholder="Search by product name"
                className="border p-2 rounded mb-4 w-full md:w-1/3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <DataTable
                columns={columns}
                data={filteredOrders}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                responsive
                defaultSortFieldId={1}
            />
        </div>
    );
};

export default Order;
