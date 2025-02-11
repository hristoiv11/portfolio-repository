import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(HttpBackend) // Loads translations from backend
    .use(LanguageDetector) // Detects user language
    .use(initReactI18next) // Initializes react-i18next
    .init({
        lng: localStorage.getItem("i18nextLng") || "en", // Default language
        fallbackLng: "en",
        debug: true,
        backend: {
            loadPath: "http://localhost:8080/api/translations?lang={{lng}}", // Fetch from backend
        },
        interpolation: { escapeValue: false },
    })
    .then(() => console.log("✅ i18n initialized successfully")) // ✅ Handle Promise
    .catch((err) => console.error("❌ i18n initialization failed", err)); // ✅ Handle errors

export default i18n;

