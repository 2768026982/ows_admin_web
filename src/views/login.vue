<template>
  <div class="rr-login">
    <!-- 语言选择 -->
    <div style="position: absolute;top:0;right:0;margin-top: 2%;margin-right: 60px">
      <div index="0" class="site-navbar__lang">
        <el-select v-model="lang" :placeholder="$t('main-navbar.changeLang')" popper-class="site-navbar__langSelect" @change="changeLang">
          <el-option v-for="(item, index) in langList" :key="index" :label="item.langTypeName"
                     :value="item.langTypeId">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="rr-login-wrap">
      <div class="rr-login-left hidden-sm-and-down">
        <p class="rr-login-left-title">{{ $t("common.login.brand-info-1") }}</p>
        <p class="rr-login-left-title">{{ $t("common.login.brand-info-2") }}</p>
      </div>
      <div class="rr-login-right">
        <div class="rr-login-right-main">
          <h4 class="rr-login-right-main-title">{{ $t("common.login.title") }}</h4>
          <el-form ref="formRef" :rules="dataRule" label-width="80px" :status-icon="true" :model="dataForm" @keyup.enter.native="dataFormSubmit()">
            <el-form-item label-width="0" prop="userName">
              <el-input v-model="dataForm.userName" :placeholder="$t('common.login.username')" prefix-icon="user"  :disabled="disableFlg"></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="password">
              <el-input :placeholder="$t('common.login.password')" v-model="dataForm.password" prefix-icon="lock" show-password></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="captcha">
              <el-space class="rr-login-right-main-code">
                <el-input v-model="dataForm.captcha" :placeholder="$t('common.login.captcha')" prefix-icon="first-aid-kit" :disabled="disableFlg"></el-input>
                <img style="vertical-align: middle; height: 40px; cursor: pointer" :src="captchaPath" @click="getCaptcha()" alt="" />
              </el-space>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button :loading="loading" type="primary" size="small"  @click="dataFormSubmit()" class="rr-login-right-main-btn"> {{ $t("common.login.login-btn") }} </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 更换部门弹窗 -->
    <el-dialog :title="$t('common.login.dialog-1-title')" v-model="showChangeDept" width="30%" :show-close="false"
               :close-on-click-modal="false" :close-on-press-escape="false">
      <el-select v-model="userDept" style="width: 100%;" :placeholder="$t('common.login.dialog-1-userDept')">
        <el-option v-for="(item, index) in userDeptList" :key="index" :label="item.deptName" :value="item.deptId">
        </el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button @click="show()">{{$t("common.login.dialog-1-cancel")}}</el-button>
        <el-button type="primary" :disabled="userDept === ''" @click="submitUserDept">{{$t("common.login.dialog-1-submit")}}</el-button>
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
import {ElMessage} from "element-plus";
import global from '../utils/global_variable';
const i18n = useI18n()
const router = useRouter();
const store = useAppStore();
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
const dataForm = ref({
  userName: '',
  password: '',
  uuid: '',
  captcha: '',
});
const formRef = ref({
  userName: [{
    required: true,
    // message: $t("common.login.dataRule-username"),
    trigger: 'blur'
  }],
  password: [{
    required: true,
    // message: $t("common.login.dataRule-password"),
    trigger: 'blur'
  }],
  captcha: [{
    required: true,
    // message: $t("common.login.dataRule-captcha"),
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
  captchaPath.value = `http://localhost:9080/aiotek-server/captcha.jpg?uuid=${dataForm.value.uuid}`;
}

const getLoginLanguageList = () => {
  baseService
    .post("sys/languageType/selectSysLanguageTypeList", {})
    .then((res) => {
      if(res && res.resultCode === 200){
        if (res.body != null){
          langList.value = res.body.records
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

<style lang="less" scoped>
@import url("@/assets/theme/base.less");
.rr-login {
  width: 100vw;
  height: 100vh;
  background: #019ec4;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 992px) {
    .rr-login-wrap {
      width: 96% !important;
    }
    .rr-login-right {
      width: 100% !important;
    }
  }

  &-wrap {
    margin: 0 auto;
    width: 1000px;
    box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
    animation-duration: 1s;
    animation-fill-mode: both;
    border-radius: 5px;
    overflow: hidden;
  }

  &-left {
    justify-content: center;
    flex-direction: column;
    background-color: @--color-primary;
    color: #fff;
    float: left;
    width: 50%;

    &-title {
      text-align: center;
      color: #fff;
      font-weight: 300;
      letter-spacing: 2px;
      font-size: 32px;
    }
  }

  &-right {
    border-left: none;
    color: #fff;
    background-color: #fff;
    width: 50%;
    float: left;

    &-main {
      margin: 0 auto;
      width: 65%;
      &-title {
        color: #333;
        margin-bottom: 40px;
        font-weight: 500;
        font-size: 24px;
        text-align: center;
        letter-spacing: 4px;
      }

      &-lang .iconfont {
        font-size: 20px;
        color: #606266;
        font-weight: 800;
        width: 20px;
        height: 20px;
      }

      .el-input__inner {
        border-width: 0;
        border-radius: 0;
        border-bottom: 1px solid #dcdfe6;
      }

      &-code {
        width: 100%;
        .el-space__item:first-child {
          flex: 1;
        }
      }
      &-btn {
        width: 100%;
        height: 45px;
        font-size: 18px !important;
        letter-spacing: 2px;
        font-weight: 300 !important;
        cursor: pointer;
        margin-top: 30px;
        font-family: neo, sans-serif;
        transition: 0.25s;
      }
    }
  }

  .login-footer {
    text-align: center;
    position: absolute;
    bottom: 0;
    padding: 20px;
    color: rgba(255, 255, 255, 0.6);
    p {
      margin: 10px 0;
    }
    a {
      padding: 0 5px;
      color: rgba(255, 255, 255, 0.6);
      &:focus,
      &:hover {
        color: #fff;
      }
    }
  }

  &-left,
  &-right {
    position: relative;
    min-height: 500px;
    align-items: center;
    display: flex;
  }

  @keyframes animate-down {
    0%,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, 25px, 0);
    }
    75% {
      transform: translate3d(0, -10px, 0);
    }
    90% {
      transform: translate3d(0, 5px, 0);
    }
    to {
      transform: none;
    }
  }

  .animate-down {
    animation-name: animate-down;
  }
}
</style>
