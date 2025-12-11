import axios from "axios";

module.exports = {
  async getUsers(ctx) {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/api/user/profile/all`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (err) {
      ctx.status = err.response?.status || 500;
      return { error: true, message: err.message };
    }
  },

  async deleteUser(ctx) {
    try {
      const response = await axios.delete(
        `${process.env.SERVER_URL}/api/user/profile/${ctx.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Delete response:", response.data);
      return response.data;
    } catch (err) {
      ctx.status = err.response?.status || 500;
      return { error: true, message: err.message };
    }
  },
};
