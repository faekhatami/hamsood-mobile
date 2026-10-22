import { useStoreCreation } from "@/features/store-creation/store-creation-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StoreCategoryOption from "@/features/store-creation/components/StoreCategoryOption";
import { STORE_CATEGORIES } from "@/features/store-creation/data/store-categories";

const PRIMARY = "#05D1D2";

export default function CreateStoreCategoryScreen() {
  const { form, updateField } = useStoreCreation();

  const selectedCategoryId = form.categoryId;

  const handleConfirm = () => {
    if (!selectedCategoryId) {
      Alert.alert("توجه", "لطفاً دسته‌بندی غرفه را انتخاب کنید.");
      return;
    }
  
    const selectedCategory = STORE_CATEGORIES.find(
      (category) => category.id === selectedCategoryId
    );
  
    if (!selectedCategory) {
      Alert.alert("خطا", "دسته‌بندی انتخاب‌شده معتبر نیست.");
      return;
    }
  
    router.push({
      pathname: "/create-store",
      params: {
        categoryId: selectedCategory.id,
        categoryTitle: selectedCategory.title,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ایجاد غرفه</Text>

        <Pressable
          onPress={() => {
            // بعداً به صفحه قبلی متصل می‌شود.
          }}
          accessibilityRole="button"
          accessibilityLabel="بازگشت"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={21} color="#555555" />
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* Main content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>دسته بندی</Text>

          <Pressable
            onPress={() => {
              Alert.alert(
                "راهنمای انتخاب حوزه کسب و کار",
                "دسته‌بندی‌ای را انتخاب کنید که با زمینه اصلی فعالیت غرفه شما مطابقت دارد."
              );
            }}
          >
            <Text style={styles.helpText}>
              راهنمای انتخاب حوزه کسب و کار
            </Text>
          </Pressable>
        </View>

        <View style={styles.options}>
          {STORE_CATEGORIES.map((category) => (
            <StoreCategoryOption
              key={category.id}
              category={category}
              selected={selectedCategoryId === category.id}
              onSelect={(id) => updateField("categoryId", id)}            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.footer}>
        <Pressable
          onPress={handleConfirm}
          style={({ pressed }) => [
            styles.confirmButton,
            pressed && styles.pressedButton,
          ]}
          accessibilityRole="button"
        >
          <Text style={styles.confirmText}>تایید</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    minHeight: 56,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E5E5",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#292929",
  },
  helpText: {
    fontSize: 11,
    color: PRIMARY,
  },
  options: {
    paddingHorizontal: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  confirmButton: {
    minHeight: 48,
    backgroundColor: PRIMARY,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  pressedButton: {
    opacity: 0.8,
  },
  confirmText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
