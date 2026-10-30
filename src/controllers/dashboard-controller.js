import { ShopSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const shopNames = await db.shopNameMemStore.getUserAddedShops(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        shopNames: shopNames,
      };
      return h.view("dashboard", viewData);
    },
  },

  addShop: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newShop = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.shopinfo.addShop(newShop);
      return h.redirect("/dashboard");
    },
  },
  deleteShop: {
    handler: async function (request, h) {
      const shop = await db.shopNameMemStore.getShopNameById(request.params.id);
      await db.shopNameMemStore.deleteShopNameById(shop._id);
      return h.redirect("/dashboard");
    },
  },


};
