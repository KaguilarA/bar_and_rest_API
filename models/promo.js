import BaseModel from "../../utils/baseModel.js";

const proceduresIds = {
  addProduct: "AddProductToPromo",
  register: "CreatePromo",
  getById: "GetPromoById",
  getAll: "GetAllPromos",
  getLanding: "GetLandingPromos",
  getProducts: "GetProductsByPromo",
  removeProduct: "RemoveProductToPromo",
  update: "UpdatePromoById",
  updatePrice: "UpdatePromoPrice",
  updateLandingState: "UpdateOnLandingPromo",
  updateQuantity: "UpdatePromoProductsQuantity",
  updateState: "UpdatePromoState",
};

export default class PromoModelMySQL extends BaseModel {

  constructor({
    id,
    name,
    description,
    price,
    days_of_week,
    image_url,
    products_quantity,
    specific_date,
    state,
    author_id,
    product_ids,
    date_created,
    date_updated,
  }) {
    super({ id, name, description, image_url, state, date_created, date_updated });
    if (price) this.price = price;
  }

  /**
   * Parses an array of product data and returns an array of PromoModelMySQL instances.
   * @param {Array<Object>} data - The array of product data to parse.
   * @returns {Array<PromoModelMySQL>} An array of PromoModelMySQL instances.
   */
  static parseData(data) {
    return Array.from(data, value => new PromoModelMySQL(value));
  }
}