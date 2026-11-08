import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const shopService = {
  shopURL: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.shopURL}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.shopURL}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.shopURL}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.shopURL}/api/users`);
    return res.data;
  },

  async createshop(Shop) {
    const res = await axios.post(`${this.shopURL}/api/Shops`, Shop);
    return res.data;
  },

  async deleteAllShops() {
    const response = await axios.delete(`${this.shopURL}/api/Shops`);
    return response.data;
  },

  async deleteshop(id) {
    const response = await axios.delete(`${this.shopURL}/api/Shops/${id}`);
    return response;
  },

  async getAllShops() {
    const res = await axios.get(`${this.shopURL}/api/Shops`);
    return res.data;
  },

  async getShop(id) {
    const res = await axios.get(`${this.shopURL}/api/shops/${id}`);
    return res.data;
  },
};
