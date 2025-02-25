import { Schema, model } from "mongoose";

const CollectionSchema = new Schema(
  {
    collectionName: { type: String, required: true },
    collectionDescription: { type: String, required: true },
    publishType: { type: String, required: true },
    publishDate: { type: Date, required: true },
    fromDate: { type: Date },
    toDate: { type: Date },
    displayImage: { type: String, required: true },
    discount: { type: Number },
   
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    storyLink: { type: String },
  },
  {
    timestamps: true,
  }
);

//create Collection model
export const Collection = model("Collection", CollectionSchema);
