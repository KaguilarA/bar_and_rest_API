import ProductModel from '../models/products.js';

/**
 * Activates a product.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const activateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Product ID is required' });
    const product = await ProductModel.updateState(parseInt(id), true);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * Creates a new product.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!product.name || !product.type || !product.imageUrl || !product.stock || !product.price) {
      res.status(400).json({ message: 'All product fields are required' });
    }
    const newProduct = await ProductModel.register(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

/**
 * Disables a product.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const disableProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Product ID is required' });
    const product = await ProductModel.updateState(parseInt(id), false);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * Gets all products.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * Gets a product by ID.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Product ID is required' });
    const product = await ProductModel.getById(parseInt(id));
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * Gets products by type.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const getProductByType = async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) res.status(400).json({ message: 'Product type is required' });
    const products = await ProductModel.getByType(type);
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * Updates a product.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!product.id) res.status(400).json({ message: 'Product ID is required' });
    const updatedProduct = await ProductModel.update(product);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * Updates the stock of a product.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const updateProductStock = async (req, res) => {
  try {
    const { id, stock } = req.body;
    if (!id || !stock) res.status(400).json({ message: 'Product ID and stock are required' });
    const product = await ProductModel.updateStock(parseInt(id), parseInt(stock));
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}