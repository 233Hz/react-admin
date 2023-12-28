import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

/**
 * 参考 https://juejin.cn/post/7170886445278691358
 */

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18next;
