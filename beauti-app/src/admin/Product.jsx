import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User not authenticated');
        return;
      }

      const res = await axios.get('https://selfy-snap-o6ka.onrender.com/api/productdetail/myproducts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.products);
    } catch (err) {
      toast.error('Failed to fetch your products');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://selfy-snap-o6ka.onrender.com/api/productdetail/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Deleted successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/stepper-product/${id}`);
  };

  const columns = [
    { name: 'Category', selector: row => row.category, sortable: true },
    { name: 'Brand', selector: row => row.brandName, sortable: true },
    { name: 'Price', selector: row => `₹${row.price?.toLocaleString('en-IN')}`, sortable: true },
    {
      name: 'Image',
      cell: row =>
        row.image ? (
          <img src={`https://selfy-snap-o6ka.onrender.com${row.image}`} alt="product" className="h-12 w-12 object-cover" />
        ) : (
          'N/A'
        )
    },
    { name: 'Description', selector: row => row.description || 'N/A' },
    { name: 'Items', selector: row => row.numberOfItems || 'N/A' },
    { name: 'Color', selector: row => row.color || 'N/A' },
    { name: 'Sensitive', selector: row => (row.isSensitive ? 'Yes' : 'No') },
    { name: 'Expirable', selector: row => (row.isExpirable ? 'Yes' : 'No') },
    { name: 'Quantity', selector: row => row.quantity || 'N/A' },
    { name: 'Retail Price', selector: row => row.retailPrice || 'N/A' },
    { name: 'Condition', selector: row => row.itemCondition || 'N/A' },
    {
      name: 'Created At',
      selector: row =>
        new Date(row.createdAt).toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(row._id)} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredItems = products.filter(
    item =>
      item.brandName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto my-8 p-4 border rounded shadow bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">Your Products</h2>

      <input
        type="text"
        placeholder="Search by brand or category"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 p-2 w-full border rounded"
      />

      <div className="overflow-auto max-h-[600px]">
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          highlightOnHover
          responsive
          striped
          dense
        />
      </div>
    </div>
  );
};

export default ProductTable;
