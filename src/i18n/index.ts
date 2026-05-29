import vi from "./locales/vi.json";
import en from "./locales/en.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: en,
    },
    vi: {
      common: vi,
    },
  },
  lng: "vi", 
  fallbackLng: "en",
  defaultNS: "common", //Namespace mặc định khi gọi t()
  interpolation: {
    escapeValue: false,//Không escape vì React đã xử lý
  },
});

export default i18n;
