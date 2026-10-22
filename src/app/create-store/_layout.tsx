import { StoreCreationProvider } from "@/features/store-creation/store-creation-context";
import { Stack } from "expo-router";

export default function CreateStoreLayout() {
  return (
    <StoreCreationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </StoreCreationProvider>
  );
}