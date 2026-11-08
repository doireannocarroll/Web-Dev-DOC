import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const recordpinService = {
  recordpinUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.recordpinUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.recordpinUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.recordpinUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.recordpinUrl}/api/users`);
    return res.data;
  },
    async authenticate(user) {
    const response = await axios.post(`${this.recordpinUrl}/api/users/authenticate`, user);
    // eslint-disable-next-line dot-notation, prefer-template
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    // eslint-disable-next-line dot-notation
    axios.defaults.headers.common["Authorization"] = "";
  },
};
