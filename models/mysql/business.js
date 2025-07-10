import BaseModel from "../../utils/baseModel.js";

const proceduresIds = {
  register: "CreateBusiness",
  getById: "GetBusinessById",
  update: "UpdateBusiness",
};

export default class BusinessModelMySQL extends BaseModel {
  constructor({
    id,
    name,
    description,
    email,
    phone,
    imstagram_url,
    facabook_url,
    whatsapp_url,
    twitter_url,
    state
  }) {
    super({ id, name, description, state });
    if (email) this.email = email;
    if (phone) this.phone = phone;
    if (imstagram_url) this.imstagram_url = imstagram_url;
    if (facabook_url) this.facabook_url = facabook_url;
    if (whatsapp_url) this.whatsapp_url = whatsapp_url;
    if (twitter_url) this.twitter_url = twitter_url;
  }

  get registerParams() {
    return [
      this.name,
      this.description,
      this.email,
      this.phone,
      this.imstagram_url,
      this.facabook_url,
      this.whatsapp_url,
      this.twitter_url,
      this.state,
    ];
  }

  get updateParams() {
    return [
      this.id,
      this.name,
      this.description,
      this.email,
      this.phone,
      this.imstagram_url,
      this.facabook_url,
      this.whatsapp_url,
      this.twitter_url,
      this.state,
    ];
  }

  /**
   * Parses an array of product data and returns an array of BusinessModelMySQL instances.
   * @param {Array<Object>} data - The array of product data to parse.
   * @returns {Array<BusinessModelMySQL>} An array of BusinessModelMySQL instances.
   */
  static parseData(data) {
    return Array.from(data, value => new BusinessModelMySQL(value));
  }

  static async getById() {
    try {
      const [rows] = await BusinessModelMySQL.executeProcedure(
        proceduresIds.getById,
        [id],
        BusinessModelMySQL.parseData
      );

      return rows;
    } catch (err) {
      throw new Error("Error while fetching business", err);
    }
  }
}
