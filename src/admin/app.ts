export default {
  config: {
    // your config (logo, theme, etc)
  },

  bootstrap(app) {
    app.addMenuLink({
      to: "/kitchens",
      icon: "Store", // built-in icon
      intlLabel: {
        id: "kitchens.page.title",
        defaultMessage: "Kitchens",
      },
      Component: async () => {
        const component = await import("./pages/kitchens");
        return component;
      },
    });
  },
};
