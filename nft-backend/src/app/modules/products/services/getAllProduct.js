import { Product } from "../product.model.js";

export const getAllProductService = async () => {
  const products = await Product.find({})
    .populate("collection.collectionId", "collectionName collectionDescription displayImage")
    .sort({ createdAt: -1 });
  return products;
};
