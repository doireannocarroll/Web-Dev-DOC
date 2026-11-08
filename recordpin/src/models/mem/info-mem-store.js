import { v4 } from "uuid";

let infos = [];

export const infoMemStore = {
  async getAllInfos() {
    return infos;
  },

    async addInfo(shopId, info) {
    info._id = v4();
    info.shopId = shopId;
    infos.push(info);
    return info;
    },

    async getInfoByShopNameId(shopId) {
        return infos.filter((info) => info.shopId === shopId);
    },

    async getInfoById(id) {
        return infos.find((info) => info._id === id);
    },

    async getShopInfo(shopId) {
        return infos.filter((info) => info.shopId === shopId);
    },

    async deleteAllInfo () {
        infos = [];
    },

    async updateInfo(info, updatedInfo) {
        info.address = updatedInfo.address;
        info.county = updatedInfo.county;
        info.vinylRarity = updatedInfo.vinylRarity;
    },
};