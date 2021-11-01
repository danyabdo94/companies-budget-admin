import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import headerTranslations from "../shared-components/header/header.translation";
import companiesListTranslations from "../modules/companies/components/companies-list/companies.translations";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    debug: true,
    resources: {
        en: {
            header: headerTranslations,
            companiesListTranslations: companiesListTranslations,
        },
    },
});

export default i18n;
