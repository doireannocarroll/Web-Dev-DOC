import { v4 } from "uuid";  
import { infoMemStore } from "./info-mem-store.js";

let shopName = [];

export const shopStore = {
  async getAllShopName() {
    return shopName;
  },

    async addShopName(name) {
    name._id = v4();
    shopName.push(name);
    return name;
  },

    async getShopNameById(id) {
        return shopName.find((name) => name._id === id);
    },

      async getUserAddedShops(userid) {
    return shopName.filter((name) => name.userid === userid);
  },


    async deleteShopNameById(id) {
        const index = shopName.findIndex((name) => name._id === id);
        list.info = await infoMemStore.getInfoByShopNameId(list.id);
        return list;
    },

    async deleteAllShopName() {
        shopName = [];
    },
};