import App from "./App.vue";
import ElementPlus from 'element-plus'
import { createI18n} from "vue-i18n";
// import TC from 'element-plus/lib/locale/lang/zh-tw'
// import EN from 'element-plus/lib/locale/lang/en'
import tcLocale from '../lang/tc';
import enLocale from '../lang/en';
const messages = {
    'EN':{
        // ...EN,
        ...enLocale
    },
    'TC':{
        // ...TC,
        ...tcLocale
    }
}
const i18n:any = createI18n({
    iegacy:false,
    globalInjection:true,
    locale:'enLocale',
    messages
})
export default i18n
