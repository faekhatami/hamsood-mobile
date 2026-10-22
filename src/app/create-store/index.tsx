import { useStoreCreation } from "@/features/store-creation/store-creation-context";
import { mapStoreFormToPayload } from "@/features/store-creation/store-creation.mapper";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#05D1D2";

const SECTIONS = [
  { id: "information", title: "اطلاعات غرفه *", enabled: true },
  { id: "licenses", title: "مجوزها *", enabled: true },
  { id: "introduction", title: "معرفی *", enabled: false },
  { id: "area", title: "محدوده *", enabled: true },
] as const;

export default function CreateStoreScreen() {
  const { form } = useStoreCreation();
  const { categoryId, categoryTitle } = useLocalSearchParams<{
    categoryId?: string;
    categoryTitle?: string;
  }>();

  const handleSectionPress = (sectionId: string) => {
    switch (sectionId) {
      case "information":
        router.push("/create-store/information");
        break;

      case "licenses":
        router.push("/create-store/licenses");
        break;

      case "area":
        router.push("/create-store/area");
        break;

      case "introduction":
        // این بخش فعلاً غیرفعال است.
        break;
    }
  };

  
  const handleCreateStore = () => {
    const payload = mapStoreFormToPayload(form);

    const missingFields: string[] = [];

    if (!payload.categoryId) {
      missingFields.push("دسته‌بندی غرفه");
    }

    if (!payload.businessName) {
      missingFields.push("نام کسب‌وکار");
    }

    if (!payload.province || !payload.county) {
      missingFields.push("محدوده فعالیت");
    }

    if (payload.licenses.length === 0) {
      missingFields.push("حداقل یک مجوز");
    }

    if (payload.licenses.some((license) => !license.type)) {
      missingFields.push("نوع مجوزها");
    }

    if (missingFields.length > 0) {
      Alert.alert(
        "اطلاعات ناقص است",
        `لطفاً این موارد را تکمیل کنید:\n${missingFields.join("\n")}`
      );
      return;
    }

    console.log(
      "CREATE STORE PAYLOAD:",
      JSON.stringify(payload, null, 2)
    );

    Alert.alert(
      "آماده‌سازی اطلاعات",
      "داده‌های غرفه آماده شده‌اند. برای مشاهده خروجی کامل، ترمینال Expo را بررسی کنید."
    );
  };


  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="بازگشت"
        >
          <Ionicons name="arrow-back" size={24} color="#444444" />
        </Pressable>

        <Text style={styles.headerTitle}>ایجاد غرفه</Text>
      </View>

      <View style={styles.divider} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.categoryLabel}>
          دسته‌بندی انتخاب‌شده
        </Text>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>
            {categoryTitle || "دسته‌بندی انتخاب نشده"}
          </Text>

          <Ionicons
            name="checkmark-circle"
            size={24}
            color={categoryId ? PRIMARY : "#AAAAAA"}
          />
        </View>

        <View style={styles.sections}>
          {SECTIONS.map((section) => (
            <Pressable
              key={section.id}
              style={[
                styles.sectionRow,
                !section.enabled && styles.disabledSection,
              ]}
              disabled={!section.enabled}
              onPress={() => handleSectionPress(section.id)}
              accessibilityRole="button"
              accessibilityState={{ disabled: !section.enabled }}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  !section.enabled && styles.disabledSectionTitle,
                ]}
              >
                {section.title}
              </Text>

              {section.enabled ? (
                <Ionicons
                  name="pencil-outline"
                  size={21}
                  color="#666666"
                />
              ) : (
                <Text style={styles.comingSoon}>به‌زودی</Text>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.confirmButton}
          onPress={handleCreateStore}
          accessibilityRole="button"
        >
          <Text style={styles.confirmButtonText}>ایجاد غرفه</Text>
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
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 28,
  },
  categoryLabel: {
    fontSize: 15,
    color: "#666666",
    textAlign: "right",
    marginBottom: 12,
  },
  categoryCard: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  sections: {
    marginTop: 28,
    gap: 12,
  },
  sectionRow: {
    minHeight: 62,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  disabledSection: {
    backgroundColor: "#F8F8F8",
    borderColor: "#EEEEEE",
  },
  disabledSectionTitle: {
    color: "#999999",
  },
  comingSoon: {
    fontSize: 11,
    color: "#999999",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  confirmButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});