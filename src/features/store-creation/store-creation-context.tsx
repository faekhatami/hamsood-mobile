
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
  
  export type StoreLicense = {
    localId: string;
    type: string;
    description: string;
  };
  
  export type StoreCreationForm = {
    categoryId: string;
    businessName: string;
    username: string;
    description: string;
    province: string;
    county: string;
    licenses: StoreLicense[];
  };
  
  type LicenseField = "type" | "description";
  type StoreField = Exclude<keyof StoreCreationForm, "licenses">;
  
  type StoreCreationContextValue = {
    form: StoreCreationForm;
    updateField: (field: StoreField, value: string) => void;
    addLicense: () => void;
    updateLicense: (
      localId: string,
      field: LicenseField,
      value: string
    ) => void;
    removeLicense: (localId: string) => void;
    resetForm: () => void;
  };
  
  const createInitialForm = (): StoreCreationForm => ({
    categoryId: "",
    businessName: "",
    username: "",
    description: "",
    province: "",
    county: "",
    licenses: [],
  });
  
  const StoreCreationContext =
    createContext<StoreCreationContextValue | undefined>(undefined);
  
  type StoreCreationProviderProps = {
    children: ReactNode;
  };
  
  export function StoreCreationProvider({
    children,
  }: StoreCreationProviderProps) {
    const [form, setForm] = useState<StoreCreationForm>(createInitialForm);
  
    const updateField = useCallback(
      (field: StoreField, value: string) => {
        setForm((current) => ({
          ...current,
          [field]: value,
        }));
      },
      []
    );
  
    const addLicense = useCallback(() => {
      const newLicense: StoreLicense = {
        localId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: "",
        description: "",
      };
  
      setForm((current) => ({
        ...current,
        licenses: [...current.licenses, newLicense],
      }));
    }, []);
  
    const updateLicense = useCallback(
      (localId: string, field: LicenseField, value: string) => {
        setForm((current) => ({
          ...current,
          licenses: current.licenses.map((license) =>
            license.localId === localId
              ? { ...license, [field]: value }
              : license
          ),
        }));
      },
      []
    );
  
    const removeLicense = useCallback((localId: string) => {
      setForm((current) => ({
        ...current,
        licenses: current.licenses.filter(
          (license) => license.localId !== localId
        ),
      }));
    }, []);
  
    const resetForm = useCallback(() => {
      setForm(createInitialForm());
    }, []);
  
    const value = useMemo(
      () => ({
        form,
        updateField,
        addLicense,
        updateLicense,
        removeLicense,
        resetForm,
      }),
      [
        form,
        updateField,
        addLicense,
        updateLicense,
        removeLicense,
        resetForm,
      ]
    );
  
    return (
      <StoreCreationContext.Provider value={value}>
        {children}
      </StoreCreationContext.Provider>
    );
  }
  
  export function useStoreCreation() {
    const context = useContext(StoreCreationContext);
  
    if (!context) {
      throw new Error(
        "useStoreCreation must be used within StoreCreationProvider."
      );
    }
  
    return context;
  }
  