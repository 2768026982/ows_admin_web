<script lang="ts">
import SvgIcon from "@/components/base/svg-icon";
import baseService from "@/service/baseService";
import { useFullscreen } from "@vueuse/core";
import {onMounted, computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store";
import userLogo from "@/assets/images/user.png";
import "@/assets/css/header.less";
import {useI18n} from "vue-i18n";
import { ElMessageBox } from "element-plus";
import global from "@/utils/global_variable";
import {useCookies} from "vue3-cookies"

interface IExpand {
  userName?: string;
}

/**
 * 顶部右侧扩展区域
 */
export default defineComponent({
  name: "Expand",
  components: { SvgIcon },
  props: {
    userName: String
  },
  setup(props: IExpand) {
    const router = useRouter();
    const store = useAppStore();
    const { isFullscreen, toggle } = useFullscreen();
    const lang = ref('')
    const {cookies} = useCookies();
    const i18n = useI18n()
    const langList = computed(() => store.state.basic.langList);

    onMounted(()=>{
      setLang()
    })
    const onClickUserMenus = (path: string) => {
      if (path === "/login") {
        ElMessageBox.confirm("确定进行[退出]操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            baseService.post("/logout").finally(() => {
              router.push(path);
            });
          })
          .catch(() => {
            //
          });
      } else {
        router.push(path);
      }
    };
    const changeLang = (selectedOption:any) =>{
      let item = langList.value.find(item1 => item1.langTypeId === selectedOption);
      //修改全球化
      i18n.locale.value = item.field1;
      //修改本地仓库变量
      localStorage.setItem("langCode", i18n.locale.value);
      localStorage.setItem("languageId", selectedOption);
      localStorage.setItem("firstLogin", '0');
      // 刷新了整个页面而不是只有路由区域
      router.go(0)
      //重新获取基础码表数据
      // getBasicList()
    };
    //语言赋值
    const setLang = () => {
      var languageId = localStorage.getItem("languageId");
      var langCode = global.filterObj(langList.value, 'langTypeId', languageId).field1
      if (!langCode){
        //获取当前浏览器语言，生成本地仓库变量
        //保存到本地仓库
        localStorage.setItem("langCode", "EN");
        //国际化
        i18n.locale.value = "EN";
      } else {
        lang.value = global.filterObj(langList.value,'field1',langCode).langTypeId
        i18n.locale.value = langCode
      }
      lang.value = global.filterObj(langList.value,'field1',i18n.locale.value).langTypeId
      localStorage.setItem('languageId', lang.value);
      localStorage.setItem("langCode", i18n.locale.value);
      cookies.set('languageTypeCode', i18n.locale.value);
    }
    return {
      props,
      lang,
      langList,
      store,
      isFullscreen,
      userLogo,
      onClickUserMenus,
      changeLang,
      toggle
    };
  }
});
</script>
<template>
  <div class="rr-header-right-items">
    <div>
      <el-select v-model="lang" :placeholder="$t('main-navbar.changeLang')" @change="changeLang" popper-class="site-navbar__langSelect">
        <el-option v-for="(item,index) in langList" :key="index" :label="item.langTypeName"
                   :value="item.langTypeId">
        </el-option>
      </el-select>
    </div>
    <div>
      <a href="https://www.renren.io/community" target="_blank">
        <svg-icon name="icon-earth"></svg-icon>
      </a>
    </div>
    <div>
      <a href="https://gitee.com/renrenio/renren-security" target="_blank">
        <svg-icon name="icon-gitee"></svg-icon>
      </a>
    </div>
    <div @click="toggle" class="hidden-xs-only">
      <span>
        <svg-icon :name="isFullscreen ? 'tuichuquanping' : 'fullscreen2'"></svg-icon>
      </span>
    </div>
    <div style="display: flex; justify-content: center; align-items: center">
      <img :src="userLogo" :alt="props.userName" style="width: 30px; height: 30px; border-radius: 50%; margin-top: 3px; margin-right: 5px" />
      <el-dropdown @command="onClickUserMenus">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="lock" command="/user/password"> 修改密码 </el-dropdown-item>
            <el-dropdown-item icon="switch-button" divided command="/login"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
        <span class="el-dropdown-link" style="display: flex">
          {{ props.userName }}
          <el-icon class="el-icon--right" style="font-size: 14px"><arrow-down /></el-icon>
        </span>
      </el-dropdown>
    </div>
  </div>
</template>
