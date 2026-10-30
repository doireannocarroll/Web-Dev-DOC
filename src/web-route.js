import { mainController } from "./controllers/main-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { shopController } from "./controllers/shop-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
    
  
  { method: "GET", path: "/", config: dashboardController.index },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/main", config: mainController.index },
  { method: "POST", path: "/dashboard/addshop", config: dashboardController.addShopInfo },
  { method: "GET", path: "/shop/{id}", config: shopController.index },
  { method: "POST", path: "/shop/{id}/addInfo", config: shopController.addInfo },
  { method: "GET", path: "/shopName/{id}/deleteInfo/{trackid}", config: shopController.deleteInfo },
  { method: "GET", path: "/dashboard/deleteShop/{id}", config: dashboardController.deleteShop },

];
