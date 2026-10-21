
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
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#05D1D2";

const LICENSE_TYPES = [
  "جواز کسب",
  "مجوز فعالیت",
  "پروانه بهره‌برداری",
  "سایر موارد",
];

type License = {
  id: number;
  type: string;
  description: string;
};

export default function StoreLicensesScreen() {
  const [licenses, setLicenses] = useState<License[]>([
    { id: 1, type: "", description: "" },
  ]);
  const [activeLicenseId, setActiveLicenseId] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const updateLicense = (
    id: number,
    field: "type" | "description",
    value: string
  ) => {
    setLicenses((current) =>
      current.map((license) =>
        license.id === id ? { ...license, [field]: value } : license
      )
    );
  };

  const addLicense = () => {
    const newId = Date.now();

    setLicenses((current) => [
      ...current,
      { id: newId, type: "", description: "" },
    ]);
    setActiveLicenseId(newId);
  };

  const handleConfirm = () => {
    const incomplete = licenses.some(
      (license) => !license.type
    );

    if (incomplete) {
      Alert.alert("اطلاعات ناقص", "لطفاً نوع تمام مجوزها را انتخاب کنید.");
      return;
    }

    Alert.alert(
      "مجوزها",
      "اطلاعات فرم دریافت شده است؛ ذخیره‌سازی و ارسال به سرور در مرحله اتصال بک‌اند انجام می‌شود."
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color="#444444" />
        </Pressable>
        <Text style={styles.headerTitle}>ایجاد غرفه</Text>
      </View>

      <View style={styles.divider} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {licenses.map((license, index) => (
          <View key={license.id} style={styles.licenseBlock}>
            {licenses.length > 1 && (
              <View style={styles.licenseHeading}>
                <Text style={styles.licenseHeadingText}>
                  مجوز {index + 1}
                </Text>

                <Pressable
                  onPress={() =>
                    setLicenses((current) =>
                      current.filter((item) => item.id !== license.id)
                    )
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="#888888"
                  />
                </Pressable>
              </View>
            )}

            <Text style={styles.label}>نوع مجوز</Text>

            <Pressable
              style={styles.selectInput}
              onPress={() => {
                setActiveLicenseId(license.id);
                setDropdownVisible(true);
              }}
            >
              <Ionicons
                name="chevron-down"
                size={22}
                color={PRIMARY}
              />
              <Text
                style={[
                  styles.selectText,
                  !license.type && styles.placeholder,
                ]}
              >
                {license.type || "لطفا انتخاب کنید..."}
              </Text>
            </Pressable>

            <Text style={styles.label}>توضیحات مجوز</Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={license.description}
              onChangeText={(value) =>
                updateLicense(
                  license.id,
                  "description",
                  value
                )
              }
              placeholder="توضیحات مجوز را وارد کنید"
              placeholderTextColor="#AAAAAA"
              maxLength={128}
              multiline
              textAlign="right"
              textAlignVertical="top"
            />

            <Text style={styles.counter}>حداکثر 128 کاراکتر</Text>

            <Text style={styles.label}>عکس مجوز</Text>

            <Pressable
              style={styles.imagePicker}
              onPress={() =>
                Alert.alert(
                  "افزودن عکس مجوز",
                  "انتخاب عکس را پس از اضافه کردن قابلیت آپلود پیاده‌سازی می‌کنیم."
                )
              }
            >
              <Ionicons
                name="image-outline"
                size={36}
                color={PRIMARY}
              />
              <View style={styles.addIcon}>
                <Ionicons name="add" size={16} color={PRIMARY} />
              </View>
            </Pressable>
          </View>
        ))}

        <Pressable style={styles.addLicenseButton} onPress={addLicense}>
          <View style={styles.addButtonIcon}>
            <Ionicons name="add" size={19} color="#FFFFFF" />
          </View>
          <Text style={styles.addLicenseText}>افزودن مجوز جدید</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>تایید</Text>
        </Pressable>
      </View>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>انتخاب نوع مجوز</Text>

            {LICENSE_TYPES.map((type) => (
              <Pressable
                key={type}
                style={styles.option}
                onPress={() => {
                  updateLicense(activeLicenseId, "type", type);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.optionText}>{type}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    minHeight: 56,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#222222" },
  divider: { height: 1, backgroundColor: "#E5E5E5" },
  content: { flex: 1 },
  contentContainer: { padding: 20, paddingBottom: 28 },
  licenseBlock: { marginBottom: 24 },
  licenseHeading: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  licenseHeadingText: { fontSize: 15, fontWeight: "600", color: "#444444" },
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
    marginBottom: 16,
  },
  selectText: { fontSize: 14, color: "#333333" },
  placeholder: { color: "#AAAAAA" },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#222222",
  },
  descriptionInput: { minHeight: 100 },
  counter: {
    fontSize: 11,
    color: "#AAAAAA",
    textAlign: "right",
    marginTop: 6,
    marginBottom: 12,
  },
  imagePicker: {
    width: 112,
    height: 112,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: PRIMARY,
    borderRadius: 10,
    backgroundColor: "#F2FEFE",
    marginTop: 4,
  },
  addIcon: {
    position: "absolute",
    right: 25,
    bottom: 25,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  addLicenseButton: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: PRIMARY,
    borderRadius: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 4,
  },
  addButtonIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  addLicenseText: { color: PRIMARY, fontSize: 15, fontWeight: "500" },
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
  confirmButtonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  dropdown: {
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
  option: {
    minHeight: 46,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  optionText: { textAlign: "right", fontSize: 14, color: "#333333" },
});
