import { v4 } from "uuid";

let shopInfo = [];

export const shopInfoMemStore = {
  async getAllShopInfo() {
    return shopInfo;
  },

    async addShopInfo(shopNameId, info) {
    info._id = v4();
    info.shopNameId = shopNameId;
    shopInfo.push(info);
    return info;
    },

    async getInfoByShopNameId(shopNameId) {
        return shopInfo.filter((info) => info.shopNameId === shopNameId);
    },

    async getInfoById(id) {
        return shopInfo.find((info) => info._id === id);
    },

    async getShopInfo(shopNameId) {
        return shopInfo.filter((info) => info.shopNameId === shopNameId);
    },

    async deleteAllInfo () {
        shopInfo = [];
    },

    async updateInfo(info, updatedInfo) {
        info.address = updatedInfo.address;
        info.county = updatedInfo.county;
        info.vinylRarity = updatedInfo.vinylRarity;
    },
};