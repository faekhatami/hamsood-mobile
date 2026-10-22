
import type { StoreCreationForm } from "./store-creation-context";

/**
 * داده‌هایی که قرار است برای ایجاد غرفه به بک‌اند ارسال شوند.
 * این ساختار پیشنهادی است و باید با قرارداد نهایی بک‌اند هماهنگ شود.
 */
export type CreateStorePayload = {
  categoryId: string;
  businessName: string;
  username: string;
  description: string;
  province: string;
  county: string;
  licenses: {
    type: string;
    description: string;
  }[];
};

/**
 * تبدیل وضعیت فرم رابط کاربری به داده مناسب API
 */
export function mapStoreFormToPayload(
  form: StoreCreationForm
): CreateStorePayload {
  return {
    categoryId: form.categoryId,
    businessName: form.businessName.trim(),
    username: form.username.trim().replace(/^@+/, ""),
    description: form.description.trim(),
    province: form.province,
    county: form.county,
    licenses: form.licenses.map((license) => ({
      type: license.type.trim(),
      description: license.description.trim(),
    })),
  };
}
