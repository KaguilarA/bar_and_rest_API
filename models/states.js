import BaseModel from "../utils/baseModel.js";

// Stored procedures for the state model.
const proceduresIds = {
  getAll: "GetAllStates",
  getById: "GetStateById",
  register: "CreateState",
  update: "UpdateStateById",
};

/**
 * Class representing a state.
 * @extends BaseModel
 */
export default class StateModelMySQL extends BaseModel {

  get registerParams() {
    return [this.name];
  }

  get updateParams() {
    return [this.id, this.name];
  }

  /**
   * Parses an array of product data and returns an array of StateModelMySQL instances.
   * @param {Array<Object>} data - The array of product data to parse.
   * @returns {Array<StateModelMySQL>} An array of StateModelMySQL instances.
   */
  static parseData(data) {
    return Array.from(data, value => new StateModelMySQL(value));
  }

  static async getAll() {
    try {
      const [row] = awaitStateModelMySQL.executeProcedure(
        proceduresIds.getAll,
        null,
        StateModelMySQL.parseData
      );

      return row;
    } catch (err) {
      throw new Error("Error while fetching states");
    }
  }

  static async getById(userId) {
    try {
      const [row] = await StateModelMySQL.executeProcedure(
        proceduresIds.getById,
        [userId],
        StateModelMySQL.parseData
      );

      return row[0];
    } catch (err) {
      throw new Error("Error while fetching state");
    }
  }

  static async register(data) {
    try {
      const { registerParams } = new StateModelMySQL(data);
      const { affectedRows } = await StateModelMySQL.executeProcedure(
        proceduresIds.register,
        registerParams
      );

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error("Error while registering state");
    }
  }

  static async update(data) {
    try {
      const { updateParams } = new StateModelMySQL(data);
      const { affectedRows } = await StateModelMySQL.executeProcedure(
        proceduresIds.update,
        updateParams
      );

      if (affectedRows === 1) return { updated: true };
    } catch (err) {
      throw new Error("Error while updating state");
    }
  }
}