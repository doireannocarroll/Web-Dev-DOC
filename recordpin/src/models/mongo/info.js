import Mongoose from "mongoose";

const { Schema } = Mongoose;

const infoSchema = new Schema({
  address: String,
  county: String,
  vinylRarity: String,
  shopNameid: {
    type: Schema.Types.ObjectId,
    ref: "ShopName",
  },
});

export const Info = Mongoose.model("Info", infoSchema);
