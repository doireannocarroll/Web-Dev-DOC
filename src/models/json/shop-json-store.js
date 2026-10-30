import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { infoJsonStore } from "./info-json-store.js";

export const shopJsonStore = {
  async getAllShops() {
    await db.read();
    return db.data.shopsName;
  },

  async addShop(shop) {
    await db.read();
    shop._id = v4();
    db.data.shops.push(shop);
    await db.write();
    return shop;
  },

  async getShopById(id) {
    await db.read();
    const list = db.data.shops.find((shop) => shop._id === id);
    return list;
  },

  async getUserShops(userid) {
    await db.read();
    return db.data.shops.filter((shop) => shop.userid === userid);
  },

  async deleteShopById(id) {
    await db.read();
    const index = db.data.shops.findIndex((shop) => shop._id === id);
    db.data.shops.splice(index, 1);
    await db.write();
  },

  async deleteAllShops() {
    db.data.shops = [];
    await db.write();
  },
};
