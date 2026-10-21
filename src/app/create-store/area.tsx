
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#05D1D2";

const PROVINCES: Record<string, string[]> = {
  تهران: ["تهران", "شهریار", "ری", "اسلامشهر", "دماوند"],
  اصفهان: ["اصفهان", "کاشان", "خمینی‌شهر", "نجف‌آباد"],
  فارس: ["شیراز", "مرودشت", "کازرون", "جهرم"],
  خراسان_رضوی: ["مشهد", "نیشابور", "سبزوار", "تربت حیدریه"],
  البرز: ["کرج", "فردیس", "نظرآباد", "ساوجبلاغ"],
};

type PickerType = "province" | "county";

export default function StoreAreaScreen() {
  const [province, setProvince] = useState("");
  const [county, setCounty] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState<PickerType>("province");

  const provinceOptions = Object.keys(PROVINCES).map((item) =>
    item === "خراسان_رضوی" ? "خراسان رضوی" : item
  );

  const countyOptions = province
    ? PROVINCES[province === "خراسان رضوی" ? "خراسان_رضوی" : province] ?? []
    : [];

  const openPicker = (type: PickerType) => {
    setPickerType(type);
    setPickerVisible(true);
  };

  const handleSelect = (value: string) => {
    if (pickerType === "province") {
      setProvince(value);
      setCounty("");
    } else {
      setCounty(value);
    }

    setPickerVisible(false);
  };

  const handleConfirm = () => {
    if (!province || !county) {
      Alert.alert(
        "اطلاعات ناقص",
        "لطفاً استان و شهرستان را انتخاب کنید."
      );
      return;
    }

    Alert.alert(
      "محدوده کسب‌وکار",
      `استان: ${province}\nشهرستان: ${county}\n\nاطلاعات هنوز به سرور ارسال نشده است.`
    );
  };

  const options =
    pickerType === "province" ? provinceOptions : countyOptions;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* نوار بالای ثابت */}
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
        {/* انتخاب استان */}
        <Text style={styles.label}>استان</Text>

        <Pressable
          style={styles.selectInput}
          onPress={() => openPicker("province")}
        >
          <Ionicons
            name="chevron-down"
            size={22}
            color={PRIMARY}
          />
          <Text
            style={[
              styles.selectText,
              !province && styles.placeholder,
            ]}
          >
            {province || "لطفا انتخاب کنید..."}
          </Text>
        </Pressable>

        {/* انتخاب شهرستان */}
        <Text style={styles.label}>شهرستان</Text>

        <Pressable
          style={[
            styles.selectInput,
            !province && styles.disabledInput,
          ]}
          disabled={!province}
          onPress={() => openPicker("county")}
        >
          <Ionicons
            name="chevron-down"
            size={22}
            color={PRIMARY}
          />
          <Text
            style={[
              styles.selectText,
              !county && styles.placeholder,
            ]}
          >
            {county || "لطفا انتخاب کنید..."}
          </Text>
        </Pressable>

        {/* محدوده کسب و کار */}
        <Text style={styles.label}>محدوده کسب و کار</Text>

        <View style={styles.mapPlaceholder}>
          <View style={styles.mapRoadHorizontal} />
          <View style={styles.mapRoadVertical} />
          <View style={styles.mapRoadDiagonal} />

          <View style={styles.mapPin}>
            <Ionicons
              name="location"
              size={38}
              color={PRIMARY}
            />
          </View>

          <View style={styles.mapCaption}>
            <Ionicons
              name="map-outline"
              size={18}
              color="#777777"
            />
            <Text style={styles.mapCaptionText}>
              نقشه محدوده کسب‌وکار
            </Text>
          </View>
        </View>

        <Text style={styles.mapHint}>
          انتخاب موقعیت روی نقشه در مرحله اتصال سرویس نقشه فعال می‌شود.
        </Text>
      </ScrollView>

      {/* دکمه پایین صفحه */}
      <View style={styles.footer}>
        <Pressable
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>تایید</Text>
        </Pressable>
      </View>

      {/* فهرست انتخاب استان و شهرستان */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setPickerVisible(false)}
        >
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>
              {pickerType === "province"
                ? "انتخاب استان"
                : "انتخاب شهرستان"}
            </Text>

            <ScrollView style={styles.optionsList}>
              {options.map((option) => (
                <Pressable
                  key={option}
                  style={styles.option}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))}

              {options.length === 0 && (
                <Text style={styles.emptyText}>
                  ابتدا یک استان انتخاب کنید.
                </Text>
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333333",
    textAlign: "right",
    marginBottom: 10,
    marginTop: 8,
  },
  selectInput: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  disabledInput: {
    backgroundColor: "#F7F7F7",
  },
  selectText: {
    fontSize: 14,
    color: "#333333",
  },
  placeholder: {
    color: "#AAAAAA",
  },
  mapPlaceholder: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#F0F3EE",
    alignItems: "center",
    justifyContent: "center",
  },
  mapRoadHorizontal: {
    position: "absolute",
    width: "120%",
    height: 24,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-12deg" }],
  },
  mapRoadVertical: {
    position: "absolute",
    width: 20,
    height: "130%",
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "25deg" }],
  },
  mapRoadDiagonal: {
    position: "absolute",
    width: "120%",
    height: 12,
    backgroundColor: "#D9E3D5",
    transform: [{ rotate: "35deg" }],
  },
  mapPin: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  mapCaption: {
    position: "absolute",
    bottom: 10,
    right: 10,
    left: 10,
    minHeight: 38,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  mapCaptionText: {
    fontSize: 12,
    color: "#777777",
  },
  mapHint: {
    marginTop: 8,
    fontSize: 11,
    color: "#AAAAAA",
    textAlign: "right",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  dropdown: {
    maxHeight: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },
  dropdownTitle: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#222222",
  },
  optionsList: {
    flexGrow: 0,
  },
  option: {
    minHeight: 46,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  optionText: {
    textAlign: "right",
    fontSize: 14,
    color: "#333333",
  },
  emptyText: {
    paddingVertical: 16,
    textAlign: "right",
    color: "#888888",
  },
});
