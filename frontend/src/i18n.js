import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
        },
        lng: localStorage.getItem("language") || "en", // Load saved language
        fallbackLng: "en",
        debug: true,  // Enable debug mode to see errors
        interpolation: { escapeValue: false },
    })
    .then(() => {
        console.log("✅ i18n initialized successfully");
    })
    .catch((error) => {
        console.error("❌ Error initializing i18n:", error);
    });

// Save language selection
i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng);
});

export default i18n;
