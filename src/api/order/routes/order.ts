export default {
  routes: [
    // Get all orders
    {
      method: "GET",
      path: "/orders",
      handler: "order.find",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
