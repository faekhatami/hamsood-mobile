
import { useStoreCreation } from "@/features/store-creation/store-creation-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#05D1D2";

export default function StoreInformationScreen() {
  const { form, updateField } = useStoreCreation();

  const { businessName, username, description } = form;

  const handleConfirm = () => {
    if (!businessName.trim()) {
      Alert.alert("اطلاعات ناقص", "لطفاً نام کسب‌وکار را وارد کنید.");
      return;
    }
  
    router.back();
  };
  
  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      {/* نوار بالای صفحه */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityLabel="بازگشت"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#444444"
          />
        </Pressable>

        <Text style={styles.headerTitle}>ایجاد غرفه</Text>
      </View>

      <View style={styles.divider} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* متن راهنما */}
        <Text style={styles.helperText}>
          استفاده از عکس یا گیف مناسب در معرفی محصولتان، می‌تواند
          شما را نسبت به رقبا متمایز کند!
        </Text>

        {/* کادر افزودن عکس */}
        <Pressable
          style={styles.imagePicker}
          onPress={() =>
            Alert.alert(
              "افزودن عکس",
              "قابلیت انتخاب عکس را در مرحله بعد اضافه می‌کنیم."
            )
          }
          accessibilityLabel="افزودن عکس"
        >
          <Ionicons
            name="image-outline"
            size={36}
            color={PRIMARY}
          />
          <View style={styles.addIcon}>
            <Ionicons
              name="add"
              size={16}
              color={PRIMARY}
            />
          </View>
        </Pressable>

        {/* نام کسب و کار */}
        <View style={styles.field}>
          <Text style={styles.label}>نام کسب و کار</Text>

          <TextInput
            style={styles.input}
            value={businessName}
            onChangeText={(value) => updateField("businessName", value)}
            placeholder="نام کسب و کار خود را وارد کنید"
            placeholderTextColor="#AAAAAA"
            maxLength={64}
            textAlign="right"
          />

          <Text style={styles.counter}>
            حداکثر 64 کاراکتر
          </Text>
        </View>

        {/* نام کاربری کسب و کار */}
        <View style={styles.field}>
          <Text style={styles.label}>
            نام کاربری کسب و کار
          </Text>

          <View style={styles.usernameInput}>
            <Text style={styles.atSign}>@</Text>

            <TextInput
              style={styles.usernameTextInput}
              value={username}
              onChangeText={(value) =>
                updateField("username", value.replace(/^@+/, ""))
              }
              placeholder="نام کاربری"
              placeholderTextColor="#AAAAAA"
              autoCapitalize="none"
              autoCorrect={false}
              textAlign="right"
            />
          </View>
        </View>

        {/* معرفی کسب و کار */}
        <View style={styles.field}>
          <Text style={styles.label}>معرفی کسب و کار</Text>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={(value) => updateField("description", value)}
            placeholder="درباره کسب و کار خود بنویسید"
            placeholderTextColor="#AAAAAA"
            maxLength={128}
            multiline
            textAlign="right"
            textAlignVertical="top"
          />

          <Text style={styles.counter}>
            حداکثر 128 کاراکتر
          </Text>
        </View>
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
    paddingTop: 18,
    paddingBottom: 24,
  },
  helperText: {
    fontSize: 12,
    lineHeight: 20,
    color: "#999999",
    textAlign: "right",
    marginBottom: 18,
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
    marginBottom: 24,
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
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333333",
    textAlign: "right",
    marginBottom: 10,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#222222",
    backgroundColor: "#FFFFFF",
  },
  counter: {
    fontSize: 11,
    color: "#AAAAAA",
    textAlign: "right",
    marginTop: 6,
  },
  usernameInput: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  atSign: {
    fontSize: 16,
    color: "#888888",
    marginRight: 8,
  },
  usernameTextInput: {
    flex: 1,
    minHeight: 48,
    fontSize: 14,
    color: "#222222",
  },
  descriptionInput: {
    minHeight: 120,
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
});
