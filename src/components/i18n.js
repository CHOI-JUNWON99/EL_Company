import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
      },
    },
    ko: {
      translation: {
        welcome: "환영합니다",
      },
    },
  },
  lng: "ko", // 기본 언어 설정
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
