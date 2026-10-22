
export type StoreCreationLicense = {
    /** شناسه داخلی برای مدیریت آیتم‌ها در رابط کاربری */
    localId: string;
    type: string;
    description: string;
    documentUri: string | null;
  };
  
  export type StoreCreationFormData = {
    categoryId: string | null;
  
    businessName: string;
    username: string;
    description: string;
  
    licenses: StoreCreationLicense[];
  
    province: string;
    county: string;
  };
  
  /**
   * ساختار اولیه فرم در اپلیکیشن.
   * این ساختار هنوز قرارداد نهایی API نیست.
   */
  export const INITIAL_STORE_CREATION_FORM: StoreCreationFormData = {
    categoryId: null,
  
    businessName: "",
    username: "",
    description: "",
  
    licenses: [
      {
        localId: "license-initial",
        type: "",
        description: "",
        documentUri: null,
      },
    ],
  
    province: "",
    county: "",
  };
  