module.exports = {
  routes: [
    {
      method: "GET",
      path: "/kitchen", // Strapi will prefix this with /api automatically
      handler: "kitchen.getKitchens",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/kitchen/update-approval-status",
      handler: "kitchen.updateApproval",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/kitchen",
      handler: "kitchen.updateKitchen",
      config: { auth: false },
    },
  ],
};
