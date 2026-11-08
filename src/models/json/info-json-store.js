import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const infoJsonStore = {
  async getAllInfo() {
    await db.read();
    return db.data.info;
  },

  async addInfo(info) {
    await db.read();
    info._id = v4();
    db.data.info.push(info);
    await db.write();
    return info;
  },

  async getInfoByShopId(id) {
    await db.read();
    return db.data.info.filter((info) => info.shopid === id);
  },

  async getInfoById(id) {
    await db.read();
    return db.data.info.find((info) => info._id === id);
  },

  async deleteinfo(id) {
    await db.read();
    const index = db.data.info.findIndex((info) => info._id === id);
    db.data.info.splice(index, 1);
    await db.write();
  },

  async deleteAllInfo() {
    db.data.info = [];
    await db.write();
  },

  async updateInfo(info, updatedInfo) {
    info.address = updatedInfo.address;
    info.county = updatedInfo.county;
    info.vinylRarity = updatedInfo.vinylRarity;
    await db.write();
  },
};
