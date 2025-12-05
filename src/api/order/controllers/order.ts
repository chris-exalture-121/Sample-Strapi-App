import { Context } from "koa";
import axios from "axios";

export default {
  // Get all orders
  async find(ctx: Context) {
    try {
      const response = await axios.get("http://209.59.188.82:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      ctx.status = 400;
      return { error: err.message };
    }
  },
};
