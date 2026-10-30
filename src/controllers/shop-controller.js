import { db } from "../models/db.js";
import { InfoSpec } from "../models/joi-schemas.js";

export const shopController = {
    index: {
        handler: async function (request, h) {
            const shopName = await db.shopname.getShopNameById(request.params.id);
            const viewData = {
                title: "Shop Name",
                shopName: shopName,
            };
            return h.view("shop", viewData);
        },
    },

    addInfo: {
    validate: {
      payload: InfoSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const shopName = await db.shopNameMemStore.getShopNameById(request.params.id);
        return h.view("shop", { title: "Add info error", shopName, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const shopName = await db.shopNameMemStore.getShopNameById(request.params.id);
      const newInfo = {
        address: request.payload.address,
        county: request.payload.county,
        vinylRarity: request.payload.vinylRarity,
      };
      await db.infoStore.addInfo(shopName._id, newInfo);
      return h.redirect(`/shop/${shopName._id}`);
    },
  },
      deleteInfo: {
    handler: async function(request, h) {
      const shopName = await db.shopNameMemStore.getShopNameById(request.params.id);
      await db.shopInfoMemStore.deleteShopInfoById(request.params.infoid);
      return h.redirect(`/shopName/${shopName._id}`);
    },
  },

};
