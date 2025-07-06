import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bg from './lang/bg.json';
import en from './lang/en.json';

export default i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {
      translation: en,
    },
    bg: {
      translation: bg,
    },
  },
});
