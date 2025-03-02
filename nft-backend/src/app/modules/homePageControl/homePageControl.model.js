import { Schema, model } from "mongoose";

const HomePageControlSchema = new Schema(
  {
   
   
    BannerCollection: [
      {
        collection: {
          type: Schema.Types.ObjectId,
          ref: "Collection",
      
        },
      },
    ],
    bestProducts: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        
        },
      },
    ],
    newArrivalProducts: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
 
        },
      },
    ],
    fofLabLink:{
      type:String
    }

  },
  {
    timestamps: true,
  }
);

//create HomePageControl model
export const HomePageControl = model("HomePageControl", HomePageControlSchema);
