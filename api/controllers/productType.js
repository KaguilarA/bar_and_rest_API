import BaseController from '../../utils/baseController.js';

export default class ProductTypeController extends BaseController {
  
  getAllProductTypes = async (req, res) => {
    try {
      const productTypes = await this.model.getAll();
      return res.status(200).json(productTypes);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}