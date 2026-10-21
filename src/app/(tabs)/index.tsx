
import ProductCard from "@/features/seller/components/ProductCard";
import { products } from "@/features/seller/data/products";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated, Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";


const riceImage1 = require("../../assets/images/rice-profile.png")
const riceImage2 = require("../../assets/images/rice-category.png")
const handsImage = require("../../assets/images/teamwork.jpg")
const tomatoImage = require("../../assets/images/tomato-paste.png")


const teal = "#08C4C5";


const shortcuts = [
  { title: "شرایط همکاری", icon: handsImage  },
  { title: "فروش تکی", icon: tomatoImage  },
  { title: "فروش ویژه", icon: riceImage2  },
  { title: "طرف قرارداد", icon: "🔗" },
];


export default function SellerProfile() {
  const router = useRouter();

  const addButtonOpacity = useRef(new Animated.Value(1)).current;
  const lastScrollY = useRef(0);
  const isButtonVisible = useRef(true);
  const [buttonShown, setButtonShown] = useState(true);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const difference = currentY - lastScrollY.current;

    if (currentY < 10) {
      if (!isButtonVisible.current) {
        isButtonVisible.current = true;
        setButtonShown(true);

        Animated.timing(addButtonOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    } else if (difference > 5 && isButtonVisible.current) {
      isButtonVisible.current = false;
      setButtonShown(false);

      Animated.timing(addButtonOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (difference < -5 && !isButtonVisible.current) {
      isButtonVisible.current = true;
      setButtonShown(true);

      Animated.timing(addButtonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentY;
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content"  />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>♙</Text>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>کسب و کار برنج فروشان طارم</Text>
          </View>
          <Text style={styles.headerIcon}>⋮</Text>
        </View>

        {/* Seller information */}
        <View style={styles.profile}>
          <View style={styles.avatarWrapper}>
            <Image
              source={riceImage1}
              style={styles.avatar}
            />
            <View style={styles.addBadge}>
              <Text style={styles.addText}>+</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>۱۵</Text>
              <Text style={styles.statLabel}>دنبال کننده</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>۲۰</Text>
              <Text style={styles.statLabel}>فروش</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.stat}>
              <Text style={styles.rating}>⭐ ۴.۵</Text>
              <Text style={styles.statLabel}>امتیاز</Text>
            </View>
          </View>
        </View>

        {/* Seller description */}
        <View style={styles.description}>
          <Text style={styles.sellerName}>برنج فروشان طارم</Text>
          <Text style={styles.location}>📍 خرمدره</Text>
          <Text style={styles.descriptionText}>
            ما در این صفحه به خرید عمده برنج به صورت مستقیم از برنج
            فروشان طارم اقدام می‌کنیم و در این راستا اهدافی داریم که
            ان‌شاءالله به لطف خداوند به آن‌ها برسیم.
          </Text>
        </View>

        {/* Shortcuts */}
        <View style={styles.shortcuts}>
          {shortcuts.map((item) => (
            <Pressable key={item.title} style={styles.shortcut}>
              <View style={styles.shortcutCircle}>
                <Text style={styles.shortcutIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.shortcutLabel}>{item.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* Ads title */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>آگهی ها</Text>
        </View>

        {/* Products */}
        <View style={styles.products}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </View>
      </ScrollView>

      <Animated.View
        pointerEvents={buttonShown ? "auto" : "none"}
        style={[
          styles.floatingAddButton,
          { opacity: addButtonOpacity },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.push("/category-selection")}
          activeOpacity={0.8}
          style={styles.floatingAddButtonTouch}
        >
          <Text style={styles.floatingAddButtonText}>+</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        {[
          ["▥", "داشبورد"],
          ["▤", "پیام ها"],
          ["♧", "خانه"],
          ["♙", "مشتریان"],
          ["⬡", "سفارشات"],
        ].map(([icon, label]) => (
          <Pressable key={label} style={styles.navItem}>
            <Text
              style={[
                styles.navIcon,
                label === "خانه" && styles.selected,
              ]}
            >
              {icon}
            </Text>
            <Text
              style={[
                styles.navLabel,
                label === "خانه" && styles.selected,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    height: 90,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
    textAlign: "right",
  },
  headerIcon: {
    fontSize: 27,
    color: "#777777",
    paddingHorizontal: 8,
  },
  profile: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 35,
    marginBottom: 35,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 55,
  },
  addBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#FFFFFF",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addText: {
    fontSize: 28,
    color: "#777777",
    lineHeight: 32,
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 10,
  },
  stat: {
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  statNumber: {
    fontSize: 23,
    color: teal,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 15,
    color: "#333333",
  },
  rating: {
    fontSize: 18,
    color: teal,
  },
  separator: {
    width: 1,
    height: 55,
    backgroundColor: "#DDDDDD",
  },
  description: {
    paddingHorizontal: 30,
    alignItems: "flex-end",
    marginBottom: 30,
  },
  sellerName: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222222",
    textAlign: "right",
  },
  location: {
    fontSize: 15,
    color: "#888888",
    marginTop: 12,
  },
  descriptionText: {
    fontSize: 17,
    lineHeight: 29,
    color: "#333333",
    textAlign: "right",
    marginTop: 35,
  },
  shortcuts: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    marginVertical: 28,
  },
  shortcut: {
    alignItems: "center",
    flex: 1,
  },
  shortcutCircle: {
    width: 76,
    height: 76,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#E3E3E3",
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutIcon: {
    fontSize: 30,
  },
  shortcutLabel: {
    fontSize: 13,
    color: "#666666",
    marginTop: 12,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 30,
    marginTop: 18,
    marginBottom: 28,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDDDDD",
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222222",
  },
  products: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 14,
    gap: 12,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingVertical: 12,
    elevation: 12,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  navIcon: {
    fontSize: 27,
    color: "#777777",
  },
  navLabel: {
    fontSize: 13,
    color: "#777777",
  },
  selected: {
    color: teal,
  },
  floatingAddButton: {
    position: "absolute",
    right: 20,
    bottom: 90,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: teal,
    elevation: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  
  floatingAddButtonTouch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
  floatingAddButtonText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "300",
    lineHeight: 40,
  },
});
