import { db } from "../models/db.js";
import { InfoSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const shopController = {
    index: {
        handler: async function (request, h) {
            const shop = await db.shopStore.getShopById(request.params.id);
            const viewData = {
                title: "Shop Name",
                shop: shop,
            };
            return h.view("shop", viewData);
        },
    },

    addInfo: {
    validate: {
      payload: InfoSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const shop = await db.shopStore.getShopById(request.params.id);
        return h.view("shop", { title: "Add info error", shop, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const shop = await db.shopStore.getShopById(request.params.id);
      const newInfo = {
        address: request.payload.address,
        county: request.payload.county,
        vinylRarity: request.payload.vinylRarity,
      };
      await db.infoStore.addInfo(shop._id, newInfo);
      return h.redirect(`/shop/${shop._id}`);
    },
  },
      deleteinfo: {
    handler: async function(request, h) {
      const shop = await db.shopStore.getShopById(request.params.id);
      await db.infoStore.deleteInfoById(request.params.infoid);
      return h.redirect(`/shop/${shop._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const shop = await db.shopStore.getShopById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          shop.image = url;
          await db.shopStore.updateShop(shop);
        }
        return h.redirect(`/shop/${shop._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/shop/${shop._id}`);
      } 
  },

  payload: {
    multipart: true,
    output: "data",
    maxBytes: 209715200,
    parse: true,
  },
  },
};
