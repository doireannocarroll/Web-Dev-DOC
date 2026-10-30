import Mongoose from "mongoose";
import { Shop } from "./shop.js";

export const shopMongoStore = {
  async getAllShops() {
    const shop = await Shop.find().lean();
    return shop;
  },

  async getShopById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const shop = await Shop.findOne({ _id: id }).lean();
      if (shop) {
        shop.tracks = await infoMongoStore.getInfoByShopId(shop._id);
      }
      return shop;
    }
    return null;
  },

  async addShop(shop) {
    const newShop = new Shop(shop);
    const shopObj = await newShop.save();
    return this.getShopById(shopObj._id);
  },

  async getUserShops(id) {
    const shop = await Shop.find({ userid: id }).lean();
    return shop;
  },

  async deleteShopById(id) {
    try {
      await Shop.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllShops() {
    await Shop.deleteMany({});
  }
};
