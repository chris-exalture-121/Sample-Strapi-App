"use strict";
const axios = require("axios");

module.exports = {
  async getKitchens(ctx) {
    try {
      const response = await axios.get(
        "http://209.59.188.82:8080/api/kitchen",
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      ctx.status = err.response?.status || 500;
      return { error: true, message: err.message };
    }
  },

  async updateApproval(ctx) {
    try {
      const response = await axios.post(
        "http://209.59.188.82:8080/api/kitchen/update-approval-status",
        ctx.request.body,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      ctx.status = err.response?.status || 500;
      return { error: true, message: err.message };
    }
  },
};
