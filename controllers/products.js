import ProductModel from '../models/products.js';

export const createProduct = async (req, res) => { }

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}