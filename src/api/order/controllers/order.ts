import { Context } from "koa";
import axios from "axios";

export default {
  // Get all orders
  async find(ctx: Context) {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/api/orders`, {
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

  // Update order
  async update(ctx: Context) {
    try {
      const data = ctx.request.body;

      const response = await axios.post(
        `${process.env.SERVER_URL}/api/orders`,
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err: any) {
      ctx.status = 400;
      return { error: err.message };
    }
  },
};
