import { Info } from "./info.js";

export const infoMongoStore = {
  async getAllInfo(id) {
    const info = await Info.find().lean();
    return info;
  },

  async addInfo(shopId, info) {
    const newInfo = new Info({
      ...info,
      shopid: shopId,
    });
    const infoObj = await newInfo.save();
    return this.getInfoById(infoObj._id);
    },

  async getInfoByShopId(id) {
      const info = await Info.find({ shopid: id}).lean();
      return info;
    },

  async getInfoById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const info = await Info.findOne({_id: id }).lean();
      return info;
    }
      return null;
  
    },
   async deleteInfo(id) {
    try {
      await Info.deleteOne({ _id: id});
    } catch (error) {
      consoe.log("bad id");
    }
   },

   async deleteAllInfo() {
    await Info.deleteMany({});
   },

   async updateInfo(info, updatedInfo) {
    const infoDoc = await Info.findOne({_id: info._id});
    infoDoc.address = updatedInfo.address;
    infoDoc.county = updatedInfo.county;
    infoDoc.vinylRarity = updatedInfo.vinylRarity;
    await infoDoc.save();
   }

};
