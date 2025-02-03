import { Product } from "../product.model.js";

export const getAllProductService = async () => {
  const products = await Product.find({});
  return products;
};
