import { Store, User, ShoppingCart } from "lucide-react";

export default {
  config: {
    // your config (logo, theme, etc)
  },

  bootstrap(app) {
    // Kitchens link
    app.addMenuLink({
      to: "/kitchens",
      icon: Store, // built-in icon
      intlLabel: {
        id: "kitchens.page.title",
        defaultMessage: "Kitchens",
      },
      Component: async () => {
        const component = await import("./pages/kitchens/index");
        return component;
      },
      permissions: [], // optional
    });

    // Users link
    app.addMenuLink({
      to: "/users",
      icon: User, // built-in icon
      intlLabel: {
        id: "users.page.title",
        defaultMessage: "Users",
      },
      Component: async () => {
        const component = await import("./pages/users/index");
        return component;
      },
      permissions: [], // optional
    });
    app.addMenuLink({
      to: "/orders",
      icon: ShoppingCart, // built-in icon
      intlLabel: {
        id: "orders.page.title",
        defaultMessage: "Orders",
      },
      Component: async () => {
        const component = await import("./pages/orders/index");
        return component;
      },
      permissions: [], // optional
    });
  },
};
