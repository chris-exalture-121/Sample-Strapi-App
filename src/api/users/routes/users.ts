export default {
  routes: [
    {
      method: "GET",
      path: "/users",
      handler: "users.getUsers",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/users/:id",
      handler: "users.deleteUser",
      config: {
        auth: false,
      },
    },
  ],
};
