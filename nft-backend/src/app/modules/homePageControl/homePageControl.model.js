import { Schema, model } from "mongoose";

const HomePageControlSchema = new Schema(
  {
   
   
    BannerCollection: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Collection",
          required: true,
        },
      },
    ],
    bestProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    newArrivalProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

  },
  {
    timestamps: true,
  }
);

//create HomePageControl model
export const HomePageControl = model("HomePageControl", HomePageControlSchema);
