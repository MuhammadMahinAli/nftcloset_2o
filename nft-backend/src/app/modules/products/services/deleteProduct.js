//----------------- delete product

import { Product } from "../product.model.js";

export const deleteProductService = async (id) => {
    const result = await Product.findByIdAndDelete({ _id: id });
    return result;
  };