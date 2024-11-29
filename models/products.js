import mysqlConnection from './../connections/db.js';

class Product {
  id;

  constructor(id = null, name, type, stock, price, imageUrl) {
    if (id) this.id = id;
    this.name = name;
    this.type = type;
    this.stock = stock;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  async save() {
    try {
      
    } catch (err) {
      throw new Error("Error while saving product");
    }
  }

  async update() {
    try {
      
    } catch (err) {
      throw new Error("Error while updating product");
    }
  }
}

class ProductModel {

  async createProduct(name, type, stock, price, imageUrl) {
    try {
      const newProduct = new Product(null, name, type, stock, price, imageUrl);
      const saved = newProduct.save();

      return saved;
    } catch (err) {
      throw new Error("Error while creating product");
      
    }
  }

  async getAllProducts() {
    try {
      const [rows] = await mysqlConnection.query('CALL GetAllProducts()');

      rows[0].forEach(({ id, name, type, stock, price, imageUrl }, i) => 
        rows[0][i] = new Product(id, name, type, stock, price, imageUrl)
      );

      return rows[0];
    } catch (err) {
      throw new Error("Error while fetching products");
    }
  }
}

export default new ProductModel();