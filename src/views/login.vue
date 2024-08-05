<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content" style="background: transparent">
        <div class="brand-info">
          <!-- 品牌信息 -->
          <h2 class="brand-info__text">{{ t("common.login.brand-info-1") }}</h2>
          <h2 class="brand-info__text">{{ t("common.login.brand-info-2") }}</h2>
          <p class="brand-info__intro"></p>
        </div>

        <div class="login-main">
          <!-- 语言选择 -->
          <div style="position: absolute;top:0;right:0;margin-top: 5%;margin-right: 60px">
            <div index="0" class="site-navbar__lang">
              <el-select v-model="lang" :placeholder="t('main-navbar.changeLang')" popper-class="site-navbar__langSelect" @change="changeLang">
                <el-option v-for="(item, index) in langList" :key="index" :label="item.langTypeName"
                           :value="item.langTypeId">
                </el-option>
              </el-select>
            </div>
          </div>

          <!-- 登录类型切换 -->
          <div class="login-type-row">
            <div :class="{ 'login-title': true, 'active': loginType === 0 }">{{ t("common.login.title") }}</div>
            <!-- <div :class="{ 'login-title': true, 'active': loginType === 1 }" @click="changeType(1)">{{ $t("common.login.AD-title") }}</div> -->
          </div>

          <el-form :model="dataForm" :rules="dataRule" ref="formRef" @keyup.enter.native="dataFormSubmit()"
                   status-icon>
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" :disabled="disableFlg" :placeholder="t('common.login.username')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" show-password :disabled="disableFlg" :placeholder="t('common.login.password')"></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="dataForm.captcha" :disabled="disableFlg" :placeholder="t('common.login.captcha')"></el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt="">
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" :loading="loading" @click="dataFormSubmit()">
                {{ t("common.login.login-btn") }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 更换部门弹窗 -->
    <el-dialog :title="t('common.login.dialog-1-title')" v-model="showChangeDept" width="30%" :show-close="false"
               :close-on-click-modal="false" :close-on-press-escape="false">
      <el-select v-model="userDept" style="width: 100%;" :placeholder="t('common.login.dialog-1-userDept')">
        <el-option v-for="(item, index) in userDeptList" :key="index" :label="item.deptName" :value="item.deptId">
        </el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button @click="show()">{{t("common.login.dialog-1-cancel")}}</el-button>
        <el-button type="primary" :disabled="userDept === ''" @click="submitUserDept">{{t("common.login.dialog-1-submit")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {getUuid} from "@/utils/utils";
import {ref, reactive, inject} from "vue";
import baseService from "@/service/baseService";
import { useRouter } from "vue-router";
import md5 from "js-md5";
import { useAppStore } from "@/store";
import {useCookies} from "vue3-cookies"
import {useI18n} from "vue-i18n";
import app from "@/constants/app";
import {ElMessage} from "element-plus";
import global from '../utils/global_variable';
const i18n = useI18n()
const router = useRouter();
const store = useAppStore();
const {t} = useI18n()
const {cookies} = useCookies();
const langList = ref([{
  field1: '',
  langTypeId: '',
  langTypeName: '',
  primeLanguage: ''
}
])
const lang = ref('')
const loginType = ref(0)
const formRef = ref()
const dataForm = ref({
  userName: '',
  password: '',
  uuid: '',
  captcha: '',
});
const dataRule = ref({
  userName: [{
    required: true,
    message: t("common.login.dataRule-username"),
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: t("common.login.dataRule-password"),
    trigger: 'blur'
  }],
  captcha: [{
    required: true,
    message: t("common.login.dataRule-captcha"),
    trigger: 'blur'
  }]
});
const verifyForm = ref({
  code: ''
});
const verifyRule = ref({
  code: [
    {required: true, message: ' ', trigger: 'blur'}
  ],
})
const captchaPath = ref('')
const userDept = ref('')
const showChangeDept = ref(false) //是否展示选择部门弹窗
const userDeptList = ref([]) //用户所属列表
const loading = ref(false)
const disableFlg = ref(false)
const verify = ref({
  // 是否展示验证框
  showVerifyFlag: false,
  // 默认校验类型
  verifyType: "1",
  // 发送邮件按钮文字
  // emailContent: this.$t("common.login.email-content"),
  // phoneContent: this.$t("common.login.phone-content"),
  // 按钮倒计时
  emailCountDown: 120,
  phoneCountDown: 120,
  // 点击获取验证码按钮标识
  canEmailFlag: true,
  canPhoneFlag: true,
  // 定时器ID
  emailTimer: '',
  phoneTimer: ''
});


// 初始化逻辑可以在这里执行
const initialize = () => {
  getCaptcha();
  getLoginLanguageList();
};
const destoryed = () => {
  disableFlg.value = false
  loading.value = false
}
const changeType = (type: number) => {
  getCaptcha()
  loginType.value = type
}
const getCaptcha = () => {
  dataForm.value.uuid = getUuid()
  captchaPath.value = `${app.api}/captcha.jpg?uuid=${dataForm.value.uuid}`;
  // captchaPath.value = `http://localhost:9080/aiotek-server/captcha.jpg?uuid=${dataForm.value.uuid}`;
}

const getLoginLanguageList = () => {
  baseService
    .post("sys/languageType/selectSysLanguageTypeList", {})
    .then((res) => {
      if(res && res.resultCode === 200){
        if (res.body != null){
          langList.value = res.body.records
          // localStorage.setItem('langList',res.body.records)
          store.updateLoginLang(res.body.records)
          setLang()
        }
      }

    }).catch((error) => {
    console.error("Error fetching login language list:", error);
  });
};

const changeLang = (selectedOption: any) => {
  console.log(selectedOption)
  console.log(langList.value)
  let item = langList.value.find(item1 => item1.langTypeId === selectedOption);
  //修改全球化
  if (item){
    i18n.locale.value = item.field1;
  }
  //修改本地仓库变量
  localStorage.setItem("langCode", i18n.locale.value)
  localStorage.setItem("languageId", selectedOption)
  localStorage.setItem("firstLogin", '0')
}

const setLang = () =>{
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
const getBrowserLanguage = () => {
  //获取当前浏览器语言
  let language = window.navigator.language;
  if (language == 'zh-CN') {
    //保存到本地仓库
    localStorage.setItem("langCode", "CN");
    //国际化
    i18n.locale.value = "CN";
  } else if (language == 'zh-TW') {
    //保存到本地仓库
    localStorage.setItem("langCode", "TC");
    //国际化
    i18n.locale.value = "TC";
  }
  else if (language == 'ja' || language == 'ja-JP') {
    //保存到本地仓库
    localStorage.setItem("langCode", "JP");
    //国际化
    i18n.locale.value = "JP";
  } else if (language == 'th') {
    //保存到本地仓库
    localStorage.setItem("langCode", "TH");
    //国际化
    i18n.locale.value = "TH";
  } else {
    //保存到本地仓库
    localStorage.setItem("langCode", "EN");
    //国际化
    i18n.locale.value = "EN";
  }
}

const dataFormSubmit = () => {
  dataFormSubmit1()
}
const dataFormSubmit1 = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      disableFlg.value = true
      loading.value = true
      baseService
        .post('/sys/login', {
          'loginId': dataForm.value.userName,
          'password': md5(dataForm.value.password),
          'uuid': dataForm.value.uuid,
          'captcha': dataForm.value.captcha
        }).then((res) => {
        if (res.resultCode === 200) {
          localStorage.setItem("firstLogin", '1');
          verify.value.showVerifyFlag = true
          cookies.set('token', res.body.token)
          getUserDept()
        } else {
          getCaptcha()
          disableFlg.value = false
          loading.value = false
        }
      }).catch(()=>{
        getCaptcha()
        disableFlg.value = false
        loading.value = false
      })
    } else {
      disableFlg.value = false
      loading.value = false
    }

  })
}

const getUserDept = () => {
  baseService.post("sys/sysUserDept/list", {})
    .then((res) => {
      if (res.resultCode === 200) {
        if (res.body.length > 1) {
          userDeptList.value = res.body
          showChangeDept.value = true
          loading.value = true
        } else {
          console.log("router.push(\"/\");")
          router.push("/");
        }
      }
      loading.value = false
    })
}
const submitUserDept = () => {
  loading.value = true;
  baseService.get(`sys/user/saveUserDept/${userDept.value}`)
    .then((res) => {
      showChangeDept.value = false
      if (res && res.resultCode === 200) {
        router.push("/");
      }
      loading.value = false
    })
}
const show = () => {
  showChangeDept.value = false
  disableFlg.value = false
  getCaptcha()
}
const sendVerifyCode = (type: any) => {
  let url = type === 1 ? "email" : "phone";
  baseService.post('verify/code/' + url, {})
    .then((res) => {
      if (res && res.resultCode === 200) {
        ElMessage.success({
          message: t("common.login.sendVerifyCode-message")
        })
      }
    })
}

initialize();
</script>

<style lang="scss">
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //background-color: rgba(38, 50, 56, .6);
  overflow: hidden;

  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    //background-image: url(~@/assets/img/index-bg.png);
    //background-image: url(~@/assets/img/index-banner-2.jpg);
    background-size: cover;
  }

  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }

  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }

  .brand-info {
    margin: 220px 100px 0 90px;
    color: black;
  }

  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }

  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: .6;
  }

  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }

  .login-title {
    display: inline-block;
    vertical-align: middle;
    //cursor: pointer;
    font-size: 16px;
    line-height: 43px;
    color: #999999;
  }

  .login-title ~ .login-title {
    margin-left: 10px;
  }

  .login-title.active {
    font-weight: bold;
    color: #3379EE;
  }

  .login-captcha {
    overflow: hidden;

    > img {
      width: 100%;
      cursor: pointer;
    }
  }

  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}

.login-tag-verify {
  margin-top: 25px
}

.login-type-row {
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 20px;
}
</style>
