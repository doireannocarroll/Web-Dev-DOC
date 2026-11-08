import { userApi } from "./api/user-api.js";
import { shopApi } from "./api/shop-api.js";
import { infoApi } from "./api/info-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  
  { method: "POST", path: "/api/shops", config: shopApi.create },
  { method: "DELETE", path: "/api/shops", config: shopApi.deleteAll },
  { method: "GET", path: "/api/shops", config: shopApi.find },
  { method: "GET", path: "/api/shops/user", config: shopApi.findByUser },
  { method: "GET", path: "/api/shops/{id}", config: shopApi.findOne },
  { method: "DELETE", path: "/api/shops/{id}", config: shopApi.deleteOne },

  { method: "GET", path: "/api/info", config: infoApi.find },
  { method: "GET", path: "/api/info/{id}", config: infoApi.findOne },
  { method: "POST", path: "/api/info/{id}", config: infoApi.create },
  { method: "DELETE", path: "/api/info", config: infoApi.deleteAll },
  { method: "DELETE", path: "/api/info/{id}", config: infoApi.deleteOne },
];
