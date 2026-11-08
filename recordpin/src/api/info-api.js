import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, InfoSpec, InfoSpecPlus, InfoArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";


export const infoApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const infos = await db.infoStore.getAllinfo();
        return infos;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: InfoArraySpec, failAction: validationError },
    description: "Get all infoApi",
    notes: "Returns all infoApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const info = await db.infoStore.getinfoById(request.params.id);
        if (!info) {
          return Boom.notFound("No info with this id");
        }
        return info;
      } catch (err) {
        return Boom.serverUnavailable("No info with this id");
      }
    },
    tags: ["api"],
    description: "Find shop info",
    notes: "Returns shop info",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: InfoSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const info = await db.infoStore.addInfo(request.params.id, request.payload);
        if (info) {
          return h.response(info).code(201);
        }
        return Boom.badImplementation("error creating info");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create info",
    notes: "Returns the newly created info",
    validate: { payload: InfoSpec },
    response: { schema: InfoSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.infoStore.deleteAllInfo();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all infoApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const info = await db.infoStore.getinfoById(request.params.id);
        if (!info) {
          return Boom.notFound("No info with this id");
        }
        await db.infoStore.deleteinfo(info._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No info with this id");
      }
    },
    tags: ["api"],
    description: "Delete a info",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};