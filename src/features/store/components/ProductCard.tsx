import { Image, StyleSheet, Text, View } from "react-native";
import type { SellerProduct } from "../data/products";

const teal = "#08C4C5";

type ProductCardProps = {
  product: SellerProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productStatus}>
        <Text style={styles.active}>✓ فعال</Text>
        <Text style={styles.more}>⋮</Text>
      </View>

      <Image
        source={product.image}
        style={styles.productImage}
        resizeMode="contain"
      />

      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.muted}>{product.time}</Text>
      <Text style={styles.price}>خرده: {product.price}</Text>

      <View style={styles.productActions}>
        <Text style={styles.actionIcon}>🛒</Text>
        <Text style={styles.actionIcon}>📄</Text>
        <Text style={styles.actionIcon}>♡</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 10,
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  productStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  active: {
    color: teal,
    fontSize: 14,
  },
  more: {
    fontSize: 25,
    color: "#999999",
  },
  productImage: {
    width: "100%",
    height: 190,
    marginTop: 8,
  },
  productName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222222",
    textAlign: "center",
    marginTop: 12,
  },
  muted: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
    marginTop: 20,
  },
  price: {
    fontSize: 12,
    color: "#333333",
    textAlign: "right",
    marginTop: 20,
  },
  productActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 22,
  },
  actionIcon: {
    fontSize: 22,
    color: "#777777",
  },
});