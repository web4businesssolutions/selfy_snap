const ProductDetail = require('../model/productDtails');

exports.createProductDetail = async (req, res) => {
  try {
    const body = req.body;

    const image = req.files.find(f => f.fieldname === 'image')?.filename;
    const images = req.files.filter(f => f.fieldname === 'images').map(f => f.filename);

    const product = new ProductDetail({
      ...body,
      image: image ? `/uploads/${image}` : '',
      images: images.map(name => `/uploads/${name}`),
      bulletPoints: body.bulletPoints?.split(',') || [],
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET all products
exports.getAllProductDetails = async (req, res) => {
  try {
    const products = await ProductDetail.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single product by ID
exports.getSingleProductDetail = async (req, res) => {
  try {
    const product = await ProductDetail.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete product by ID
exports.deleteProductDetail = async (req, res) => {
  try {
    await ProductDetail.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product by ID
exports.updateProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Find the product first
    const product = await ProductDetail.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    // Extract uploaded files
    const image = req.files.find(f => f.fieldname === 'image')?.filename;
    const images = req.files.filter(f => f.fieldname === 'images').map(f => f.filename);

    // Prepare updated fields
    const updatedFields = {
      ...body,
      image: image ? `/uploads/${image}` : product.image, // keep old image if not updated
      images: images.length > 0 ? images.map(name => `/uploads/${name}`) : product.images,
      bulletPoints: body.bulletPoints ? body.bulletPoints.split(',') : product.bulletPoints,
    };

    // Update document
    const updatedProduct = await ProductDetail.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};