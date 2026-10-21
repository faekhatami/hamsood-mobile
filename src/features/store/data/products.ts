import type { ImageSourcePropType } from "react-native";

export type SellerProduct = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: string;
  time: string;
};

const riceProductImage = require("../../../assets/images/rice-product.jpg");

export const products: SellerProduct[] = [
  {
    id: "1",
    name: "برنج کاظمی",
    image: riceProductImage,
    price: "۱۵۰,۰۰۰ تومان",
    time: "ساعت پیش ۲",
  },
  {
    id: "2",
    name: "برنج طارم",
    image: riceProductImage,
    price: "۱۸۰,۰۰۰ تومان",
    time: "ساعت پیش ۲",
  },
];