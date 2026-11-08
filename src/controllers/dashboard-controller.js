import { db } from "../models/db.js";
import { ShopSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const shops = await db.shopStore.getUserShops(loggedInUser._id);
      const viewData = {
        title: "RecordPin Dashboard",
        user: loggedInUser,
        shops: shops,
      };
      return h.view("dashboard", viewData);
    },
  },

  addshop: {
    validate: {
      payload: ShopSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const shops = await db.shopStore.getUserShops(loggedInUser._id);
        return h.view("dashboard", { title: "Add Shop Error", user: loggedInUser, shops: shops, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newShop = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.shopStore.addshop(newShop);
      return h.redirect("/dashboard");
    },
  },
  deleteshop: {
    handler: async function (request, h) {
      const shop = await db.shopStore.getShopById(request.params.id);
      await db.shopStore.deleteShopById(shop._id);
      return h.redirect("/dashboard");
    },
  },


};
