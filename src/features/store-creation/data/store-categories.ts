
export type StoreCategory = {
    id: string;
    title: string;
    icon: string;
  };
  
  export const STORE_CATEGORIES: StoreCategory[] = [
    {
      id: "food",
      title: "مواد غذایی",
      icon: "fast-food-outline",
    },
    {
      id: "beauty",
      title: "آرایشی بهداشتی",
      icon: "color-palette-outline",
    },
    {
      id: "digital",
      title: "کالای دیجیتال",
      icon: "phone-portrait-outline",
    },
    {
      id: "home",
      title: "لوازم خانگی",
      icon: "home-outline",
    },
  ];
  