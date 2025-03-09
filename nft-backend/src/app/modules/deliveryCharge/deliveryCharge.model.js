import { Schema, model } from "mongoose";

const DeliveryChargeSchema = new Schema(
  {
   chargeFor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Accepted", "Rejected"],
    },
    paidAmount: {
      type: Number,
      required: true,
    },

  
  },
  {
    timestamps: true,
  }
);

//create DeliveryCharge model
export const DeliveryCharge = model("DeliveryCharge", DeliveryChargeSchema);
