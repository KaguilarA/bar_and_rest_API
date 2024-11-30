import { BaseModel } from './../utils/baseModel.js';

export default class ProductModel extends BaseModel {

  constructor(name, type, stock, price, imageUrl, id = null) {
    super(id);
    this.name = name;
    this.type = type;
    this.stock = stock;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
