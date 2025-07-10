// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FiEdit2, FiTrash2 } from 'react-icons/fi';

// const Product = () => {
//     const [categories, setCategories] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [editId, setEditId] = useState(null);

//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         stock: '',
//         images: [],
//         category: '',
//         brand: ''
//     });

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const res = await axios.get('http://localhost:4000/api/categories/all');
//                 const data = Array.isArray(res.data) ? res.data : res.data.categories;
//                 setCategories(data);
//             } catch (err) {
//                 console.error('Error fetching categories:', err.message);
//             }
//         };

//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get('http://localhost:4000/api/products/my-products', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 setProducts(res.data.products);
//             } catch (err) {
//                 console.error('Error fetching products:', err.message);
//             }
//         };

//         fetchCategories();
//         fetchProducts();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = editId
//                 ? `http://localhost:4000/api/products/update/${editId}`
//                 : 'http://localhost:4000/api/products/create';

//             const method = editId ? 'put' : 'post';

//             await axios[method](url, formData, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });

//             alert(`Product ${editId ? 'updated' : 'created'}!`);
//             setShowModal(false);
//             setEditId(null);
//             setFormData({ name: '', description: '', price: '', stock: '', images: [], category: '', brand: '' });

//             const res = await axios.get('http://localhost:4000/api/products/my-products', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setProducts(res.data.products);
//         } catch (err) {
//             console.error('Error saving product:', err.message);
//         }
//     };

//     const handleEdit = (product) => {
//         setFormData({
//             name: product.name,
//             description: product.description,
//             price: product.price,
//             stock: product.stock,
//             images: product.images,
//             category: product.category._id,
//             brand: product.brand
//         });
//         setEditId(product._id);
//         setShowModal(true);
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure to delete this product?')) return;
//         try {
//             await axios.delete(`http://localhost:4000/api/products/delete/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             alert('Product deleted!');
//             const res = await axios.get('http://localhost:4000/api/products/my-products', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setProducts(res.data.products);
//         } catch (err) {
//             console.error('Error deleting product:', err.message);
//         }
//     };

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">Add Product</h2>
//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Add New Product
//                 </button>
//             </div>

//             {/* Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md mx-2 max-h-[90vh] overflow-y-auto">
//                         <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Product</h2>
//                         <form onSubmit={handleSubmit} className="space-y-3">
//                             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required className="w-full border px-3 py-2 rounded mb-2" />
//                             <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full border px-3 py-2 rounded" />
//                             <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="w-full border px-3 py-2 rounded mb-2" />
//                             <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="w-full border px-3 py-2 rounded mb-2" />
//                             <input type="file" accept="image/*" onChange={async (e) => {
//                                 const file = e.target.files[0];
//                                 const formDataImg = new FormData();
//                                 formDataImg.append('image', file);
//                                 try {
//                                     const res = await axios.post('http://localhost:4000/api/upload', formDataImg, {
//                                         headers: { 'Content-Type': 'multipart/form-data' }
//                                     });
//                                     const imageUrl = res.data.imageUrl;
//                                     setFormData((prev) => ({ ...prev, images: [...prev.images, imageUrl] }));
//                                 } catch (err) {
//                                     console.error('Image upload failed:', err.message);
//                                 }
//                             }} className="w-full border px-3 py-2 rounded" />
//                             <div className="grid grid-cols-3 gap-2 mt-2">
//                                 {formData.images.map((img, index) => (
//                                     <div key={index} className="relative">
//                                         <img src={`http://localhost:4000${img}`} alt="preview" className="w-full h-20 object-cover rounded" />
//                                         <button type="button" onClick={() => setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2">✕</button>
//                                     </div>
//                                 ))}
//                             </div>
//                             <select name="category" value={formData.category} onChange={handleChange} required className="w-full border px-3 py-2 rounded mb-2">
//                                 <option value="">Select Category</option>
//                                 {categories.map((cat) => (
//                                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                                 ))}
//                             </select>
//                             <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required className="w-full border px-3 py-2 rounded mb-2" />
//                             <div className="flex justify-end gap-2">
//                                 <button type="button" onClick={() => { setShowModal(false); setEditId(null); }} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
//                                 <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Product List */}
//             <div className="mt-8">
//                 <h3 className="text-xl font-semibold mb-3">Your Products</h3>
//                 <div className="space-y-2">
//                     {products.map((product) => (
//                         <div
//                             key={product._id}
//                             className="bg-white rounded-md shadow-sm p-3 flex items-center justify-between gap-2 text-sm"
//                         >
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     src={`http://localhost:4000${product.images[0]}`}
//                                     alt={product.name}
//                                     className="w-12 h-12 object-cover rounded"
//                                 />
//                                 <div>
//                                     <p className="font-medium truncate max-w-[150px]">{product.name}</p>
//                                     <p className="text-xs text-gray-500">₹{product.price}</p>
//                                     <p className="text-xs text-gray-500">Descriptionz; {product.description}</p>
//                                 </div>
//                             </div>
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={() => handleEdit(product)}
//                                     className="bg-yellow-400 text-white text-[10px] px-2 py-1 rounded hover:bg-yellow-500"
//                                 >
//                                     <FiEdit2 />
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(product._id)}
//                                     className="bg-red-500 text-white text-[10px] px-2 py-1 rounded hover:bg-red-600"
//                                 >
//                                     <FiTrash2 />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Product;

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
      const res = await axios.get('http://localhost:4000/api/productdetail/alldetails');
      setProducts(res.data.products);
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/productdetail/delete/${id}`);
      toast.success('Deleted successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/stepper-product/${id}`); // 👈 Navigate to the update route
  };

  const columns = [
    { name: 'Category', selector: row => row.category, sortable: true },
    { name: 'Brand', selector: row => row.brandName, sortable: true },
    { name: 'Price', selector: row => `₹${row.price?.toLocaleString('en-IN')}`, sortable: true },
    {
      name: 'Image',
      cell: row =>
        row.image ? (
          <img src={`http://localhost:4000${row.image}`} alt="product" className="h-12 w-12 object-cover" />
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
      <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>

      <input
        type="text"
        placeholder="Search by brand or category"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 p-2 w-full border rounded"
      />

      {/* Scrollable Table */}
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
