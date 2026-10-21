import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const pages = [
  {
    title: 'صفحه غرفه',
    description: 'مشاهده صفحه فعلی غرفه',
    route: '/(tabs)/store' as const,
  },
  {
    title: 'افزودن محصول',
    description: 'انتخاب دسته‌بندی محصول جدید',
    route: '/add-product/category' as const,
  },
  {
    title: 'ایجاد غرفه',
    description: 'انتخاب دسته‌بندی غرفه جدید',
    route: '/create-store/category' as const,
  },
];

export default function DevelopmentMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hamsood</Text>
      <Text style={styles.subtitle}>منوی موقت توسعه</Text>

      {pages.map((page) => (
        <Pressable
          key={page.route}
          style={styles.card}
          onPress={() => router.push(page.route)}
        >
          <Text style={styles.cardTitle}>{page.title}</Text>
          <Text style={styles.description}>
            {page.description}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#222222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#777777',
  },
  card: {
    padding: 20,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    color: '#222222',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'right',
    color: '#777777',
  },
});