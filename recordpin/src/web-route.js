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
    
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "GET", path: "/about", config: aboutController.index },
    { method: "GET", path: "/shop/{id}", config: shopController.index },
    
    { method: "GET", path: "/dashboard/deleteshop/{id}", config: dashboardController.deleteshop },
    { method: "GET", path: "/shop/{id}/deleteinfo/{infoid}", config: shopController.deleteinfo },

    { method: "POST", path: "/dashboard/addshop", config: dashboardController.addshop },
    { method: "POST", path: "/shop/{id}/addInfo", config: shopController.addInfo },

    { method: "POST", path: "/shop/{id}/uploadimage", config: shopController.uploadImage },
    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];
