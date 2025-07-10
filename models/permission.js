import BaseModel from "../../utils/baseModel.js";

const proceduresIds = {
  addToUser: "AddPermissionToUser",
  register: "CreatePermission",
  getAll: "GetAllPermissions",
  getById: "GetPermissionById",
  getByUser: "GetPermissionsByUser",
  getList: "GetPermissionsByIds",
  removeFromUser: "RemovePermissionFromUser",
  validateUser: "ValidateUserPermission",
};

export default class PermissionModelMySQL extends BaseModel {

  /**
   * Parses an array of product data and returns an array of PermissionModelMySQL instances.
   * @param {Array<Object>} data - The array of product data to parse.
   * @returns {Array<PermissionModelMySQL>} An array of PermissionModelMySQL instances.
   */
  static parseData(data) {
    return Array.from(data, value => new PermissionModelMySQL(value));
  }
}