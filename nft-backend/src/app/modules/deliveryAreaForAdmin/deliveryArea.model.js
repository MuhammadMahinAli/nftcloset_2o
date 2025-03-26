import { Schema, model } from "mongoose";

const DeliveryAreaSchema = new Schema({
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deliveryType: {
      type: String,
      default: "",
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    featured: {
      type: [String], 
      default: [],
    },
    deliveryDay: {
      type: String,
      default: "",
    }
},

  {
    timestamps: true,
  }
);

//create DeliveryArea model
export const DeliveryArea = model("DeliveryArea", DeliveryAreaSchema);
