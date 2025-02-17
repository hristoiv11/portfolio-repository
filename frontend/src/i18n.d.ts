import "i18next";

declare module "i18next" {
    interface i18n {
        language: string; // ✅ Ensure 'language' property exists
    }
}
