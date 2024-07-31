import "@/assets/icons/iconfont/iconfont.js";
import RenDeptTree from "@/components/ren-dept-tree";
import RenRadioGroup from "@/components/ren-radio-group";
import RenRegionTree from "@/components/ren-region-tree";
import RenSelect from "@/components/ren-select";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/display.css";
import "element-plus/theme-chalk/index.css";
import locale from "element-plus/es/locale/lang/zh-cn";
import { createApp } from "vue";
import { createPinia } from "pinia";
import '@/assets/css/index.scss';
import App from "./App.vue";
import router from "./router";
import i18n from './utils/lang'
import md5 from 'js-md5';
import * as ElementPlusIcons from "@element-plus/icons-vue";
import global from './utils/global_variable';
import axios from "axios";
import "virtual:svg-icons-register";

const app = createApp(App);
app.provide('$md5', md5);
Object.keys(ElementPlusIcons).forEach((iconName) => {
  app.component(iconName, ElementPlusIcons[iconName as keyof typeof ElementPlusIcons]);
});
app
  .use(createPinia())
  .use(router)
  .use(RenRadioGroup)
  .use(RenSelect)
  .use(ElementPlus,{locale})
  .use(i18n)
  // .use(VueCookies)
  .use(RenDeptTree)
  .use(RenRegionTree)
  .use(ElementPlus, { size: "default", locale: locale })
  .mount("#app");

window.axios = axios;
