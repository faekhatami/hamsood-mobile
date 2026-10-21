
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  {
    id: "1",
    title: "مواد غذایی و خوراکی",
    image: require("../assets/images/food.png"),
  },
  {
    id: "2",
    title: "ابزار و تجهیزات کسب و کار",
    image: require("../assets/images/tools.png"),
  },
  {
    id: "3",
    title: "شوینده و بهداشتی",
    image: require("../assets/images/cleaning.png"),
  },
  {
    id: "4",
    title: "لوازم خانه و آشپزخانه",
    image: require("../assets/images/home.png"),
  },
  {
    id: "5",
    title: "کشاورزی و دامداری",
    image: require("../assets/images/farming.png"),
  },
  {
    id: "6",
    title: "لوازم آرایشی و مراقبتی",
    image: require("../assets/images/beauty.png"),
  },
  {
    id: "7",
    title: "کالای دیجیتال",
    image: require("../assets/images/digital.png"),
  },
  {
    id: "8",
    title: "پوشاک",
    image: require("../assets/images/clothing.png"),
  },
];

export default function CategorySelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"  />

      {/* Search bar and back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={23} color="#333333" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={19} color="#777777" />

          <TextInput
            style={styles.searchInput}
            placeholder="جستجو محصولات برای لیست ..."
            placeholderTextColor="#777777"
            textAlign="right"
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            activeOpacity={0.7}
            onPress={() => {
              // انتخاب دسته‌بندی در مرحله بعد
            }}
          >
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryText}>{item.title}</Text>
            </View>

            <Image
              source={item.image}
              style={styles.categoryImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.itemBackButton}
              activeOpacity={1}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color="#444444"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 10,
  },

  backButton: {
    width: 36,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: "#F2F2F2",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#333333",
    paddingVertical: 0,
  },

  categoryItem: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EEEEEE",
    gap: 12,
  },

  categoryTextContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  categoryText: {
    fontSize: 14,
    color: "#292929",
    textAlign: "right",
  },

  categoryImage: {
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },

  itemBackButton: {
    width: 30,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
