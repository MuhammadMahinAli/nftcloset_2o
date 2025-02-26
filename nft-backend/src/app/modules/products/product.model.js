import { Schema, model } from "mongoose";

const DigitalAssetsSchema = new Schema({
  arversion: { type: String },
  vrversion: { type: String },
  dfile: { type: String },
  technicaldesignbook: { type: String },
  virtuallobbyaccesskey: { type: String },
  ownershipofstory: { type: String },
  certification: { type: String },
  sandboxwearable: { type: String },
  vrchatwearable: { type: String },
  animated: { type: String },
  recroom: { type: String },
});

const TokenDetailsSchema = new Schema({
  blockchain: { type: String },
  tokenstandard: { type: String },
  contractaddress: { type: String },
  contractlink: { type: String },
});

const SizeWithMaterialSchema = new Schema({
  material: { type: String },
  sizes: [{ type: String }],
});

const ProductSchema = new Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    displayImage: { type: String, required: true },
    colors: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    buyingLink: { type: String },
    extraVideos: [{ type: String }],
    extraImages: [{ type: String }],
    digitalAssets: { type: DigitalAssetsSchema, required: true },
    collection: {
      collectionId: {
        type: Schema.Types.ObjectId,
        ref: "Collection",
        required: true
      }
    },
    tokenDetails: { type: TokenDetailsSchema },
    sizeChart: { type: String },
    sizeWithMaterial: [SizeWithMaterialSchema],
    isFeatured: { type: Boolean },
    isBestProduct: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

//create product model
export const Product = model("Product", ProductSchema);
