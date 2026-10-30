import Mongoose from "mongoose";

const { Schema } = Mongoose;

const shopSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Shop = Mongoose.model("Shop", shopSchema);
