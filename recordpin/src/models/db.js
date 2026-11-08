import { userMemStore } from "./mem/user-mem-store.js";
import { shopStore } from "./mem/shopname-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { shopJsonStore } from "./json/shop-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { shopMongoStore } from "./mongo/shop-mongo-store.js";
import { infoMongoStore } from "./mongo/info-mongo-store.js";

export const db = {
  userStore: null,
  shopStore: null,
  infoStore: null,

  init(storeType) {
    switch (storeType) {
        case "json":
        this.userStore = userJsonStore;
        this.shopStore = shopJsonStore;
        this.infoStore = infoJsonStore;
        break;
        case "mongo":
            this.userStore = userMongoStore;
            this.shopStore = shopMongoStore;
            this.infoStore = infoMongoStore;
            connectMongo();
            break;
        default:
            this.userStore = userMemStore;
            this.shopStore = shopStore;
            this.infoStore = infoMemStore;
    }

  },
};