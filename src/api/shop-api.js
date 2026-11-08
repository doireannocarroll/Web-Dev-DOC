import Boom from "@hapi/boom";
import { IdSpec, ShopArraySpec, ShopSpec, ShopSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const shopApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const shops = await db.shopStore.getAllShops();
        return shops;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ShopArraySpec, failAction: validationError },
    description: "Get all shops",
    notes: "Returns all shops",
  },

    findByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const userid = request.auth.credentials._id;
        const usershops = await db.shopStore.getUsershops(userid);
        return usershops;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ShopArraySpec, failAction: validationError },
    description: "Get all shops belonging to the authenticated user",
    notes: "Returns all shops belonging to the authenticated user",
  },


  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const shop = await db.shopStore.getShopById(request.params.id);
        if (!shop) {
          return Boom.notFound("No Shop with this id");
        }
        return shop;
      } catch (err) {
        return Boom.serverUnavailable("No Shop with this id");
      }
    },
    tags: ["api"],
    description: "Find a Shop",
    notes: "Returns a Shop",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ShopSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const shop = request.payload;
        const newShop = await db.shopStore.addshop(shop);
        if (newShop) {
          return h.response(newShop).code(201);
        }
        return Boom.badImplementation("error creating shop");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Shop",
    notes: "Returns the newly created shop",
    validate: { payload: ShopSpec, failAction: validationError },
    response: { schema: ShopSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const shop = await db.shopStore.getShopById(request.params.id);
        if (!shop) {
          return Boom.notFound("No Shop with this id");
        }
        await db.shopStore.deleteShopById(shop._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Shop with this id");
      }
    },
    tags: ["api"],
    description: "Delete a shop",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.shopStore.deleteAllShops();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all ShopApi",
  },
};
