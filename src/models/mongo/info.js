import Mongoose from "mongoose";

const { Schema } = Mongoose;

const infoSchema = new Schema({
  address: String,
  county: String,
  vinylRarity: String,
  shopid: {
    type: Schema.Types.ObjectId,
    ref: "ShopName",
  },
});

export const Info = Mongoose.model("Info", infoSchema);
