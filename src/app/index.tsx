
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const pages = [
  {
    title: 'صفحه غرفه',
    description:
      'برای بررسی رابط کاربری؛ هنوز با جریان اصلی برنامه یکپارچه نشده است.',
    status: 'نمادین',
    statusType: 'placeholder' as const,
    route: '/(tabs)/store' as const,
  },
  {
    title: 'افزودن محصول',
    description:
      'مسیر اولیه رابط کاربری؛ هنوز برای اتصال به بک‌اند آماده نشده است.',
    status: 'نمادین',
    statusType: 'placeholder' as const,
    route: '/add-product/category' as const,
  },
  {
    title: 'ایجاد غرفه',
    description:
      'ساختار فرم و خروجی داده‌ها آماده شده است؛ اتصال به API هنوز انجام نشده.',
    status: 'آماده‌سازی داده‌ها',
    statusType: 'prepared' as const,
    route: '/create-store/category' as const,
  },
];

export default function DevelopmentMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hamsood</Text>
      <Text style={styles.subtitle}>منوی موقت توسعه</Text>

      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          در حال حاضر فقط جریان ایجاد غرفه برای آماده‌سازی اتصال به بک‌اند
          ساختاربندی شده است. هنوز هیچ‌کدام از مسیرها به API واقعی متصل نیستند.
        </Text>
      </View>

      {pages.map((page) => (
        <Pressable
          key={page.route}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push(page.route)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{page.title}</Text>

            <View
              style={[
                styles.badge,
                page.statusType === 'prepared'
                  ? styles.preparedBadge
                  : styles.placeholderBadge,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  page.statusType === 'prepared'
                    ? styles.preparedBadgeText
                    : styles.placeholderBadgeText,
                ]}
              >
                {page.status}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{page.description}</Text>
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
    marginBottom: 20,
    color: '#777777',
  },
  notice: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  noticeText: {
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'right',
    color: '#555555',
  },
  card: {
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  cardPressed: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    color: '#222222',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  placeholderBadge: {
    backgroundColor: '#F1F1F1',
  },
  preparedBadge: {
    backgroundColor: '#E0F7F7',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  placeholderBadgeText: {
    color: '#666666',
  },
  preparedBadgeText: {
    color: '#078B8C',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'right',
    color: '#777777',
  },
});
