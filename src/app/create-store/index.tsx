
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#05D1D2";

const SECTIONS = [
  { id: "information", title: "اطلاعات غرفه *" },
  { id: "licenses", title: "مجوز ها *" },
  { id: "introduction", title: "معرفی *" },
  { id: "area", title: "محدوده *" },
];

export default function CreateStoreScreen() {
  const { categoryTitle } = useLocalSearchParams<{
    categoryTitle: string;
  }>();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
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
      >
        <Text style={styles.categoryLabel}>دسته‌بندی انتخاب‌شده</Text>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>
            {categoryTitle || "دسته‌بندی انتخاب نشده"}
          </Text>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={PRIMARY}
          />
        </View>

        <View style={styles.sections}>
        {SECTIONS.map((section) => (
            <Pressable
                key={section.id}
                style={styles.sectionRow}
                onPress={() => {
                    if (section.id === "information") {
                      router.push("/create-store/information");
                    } else if (section.id === "licenses") {
                      router.push("/create-store/licenses");
                    } else if (section.id === "area") {
                      router.push("/create-store/area");
                    }
                  }}
            >
                <Text style={styles.sectionTitle}>{section.title}</Text>

                <Ionicons
                    name="pencil-outline"
                    size={21}
                    color="#666666"
                />
            </Pressable>
        ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.confirmButton}
          onPress={() => {
            // اتصال مراحل بعدی را در ادامه پیاده‌سازی می‌کنیم.
          }}
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
