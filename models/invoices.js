import { BaseModel } from './../utils/baseModel.js';

// Stored procedures for the product model.
const proceduresIds = {};

export default class ProductModel extends BaseModel { 

  constructor({ date, name, state, id }) {
    super(id, undefined, date);
    this.state = state;
    this.name = name;
  }
}