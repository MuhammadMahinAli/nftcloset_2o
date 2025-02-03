import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    orderID: { type: String, required: true },
    productID: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productInfo: {
      metarial: { type: String },
      size: { type: String },
    },
    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    crossMintOrderId: { type: String },
    trackingLink: { type: String },
    status: { type: String, enum: ["pending", "approved", "declined"] },

    digitalAsset: { type: String, enum: ["notClaimed", "claimed", "received"] },
  },
  {
    timestamps: true,
  }
);

//create Order model
export const Order = model("Order", OrderSchema);
