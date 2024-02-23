import { createI18n } from 'vue-i18n'
import en from './en' //English
import zh from './zh' //Chinese
 
const i18n = createI18n({
  legacy: false, // This must be added to use CompotitionAPI.
  //locale: localStorage('lang') || 'zh', // set locale Setting default values
  locale: 'zh',
  fallbackLocale: 'zh', // set fallback locale
  messages: {
    en,
    zh, // set locale messages
  },
})
 
export default i18n
