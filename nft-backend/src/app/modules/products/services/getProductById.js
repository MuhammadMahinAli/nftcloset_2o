import { Product } from "../product.model.js";

export const getProductByIdService = async (id) => {
  const product = await Product.findOne({ _id: id })
  .populate("collection.collectionId", "collectionName collectionDescription displayImage discount fromDate toDate")
  .sort({ createdAt: -1 });
  return product;
};