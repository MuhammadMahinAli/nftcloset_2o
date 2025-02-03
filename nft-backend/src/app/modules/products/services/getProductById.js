import { Product } from "../product.model.js";

export const getProductByIdService = async (id) => {
  const product = await Product.findOne({ _id: id });
  return product;
};