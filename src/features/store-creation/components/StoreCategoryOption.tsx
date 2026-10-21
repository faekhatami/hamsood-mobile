
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { StoreCategory } from "../data/store-categories";

const PRIMARY = "#05D1D2";

type Props = {
  category: StoreCategory;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function StoreCategoryOption({
  category,
  selected,
  onSelect,
}: Props) {
  return (
    <Pressable
      onPress={() => onSelect(category.id)}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      style={styles.option}
    >
      <View style={styles.rightSide}>
        <Ionicons
          name={category.icon as keyof typeof Ionicons.glyphMap}
          size={23}
          color="#444444"
        />
        <Text style={styles.title}>{category.title}</Text>
      </View>

      <View
        style={[
          styles.checkCircle,
          selected && styles.selectedCircle,
        ]}
      >
        {selected && (
          <Ionicons name="checkmark" size={15} color="#FFFFFF" />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: 64,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EAEAEA",
  },
  rightSide: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 14,
    color: "#292929",
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
});
