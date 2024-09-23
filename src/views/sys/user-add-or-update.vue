<template>
  <el-dialog
    :title="!dataForm.id ? $t('modules.sys.user-add-or-update.save') : $t('modules.sys.user-add-or-update.update')"
    :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataFormRef" @keyup.enter.native="dataFormSubmit()"
      label-width="120px">
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-1')" prop="userName">
        <el-input v-model.trim="dataForm.userName"
          :placeholder="$t('modules.sys.user-add-or-update.form-item-1-input')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-2')" prop="loginId">
        <el-input v-model.trim="dataForm.loginId" :placeholder="$t('modules.sys.user-add-or-update.form-item-2-input')"
          :disabled="dataForm.id !== 0"></el-input>
      </el-form-item>
      <el-form-item v-if="!dataForm.id" :label="$t('modules.sys.user-add-or-update.form-item-3')" prop="password"
        :class="{ 'is-required': !dataForm.id }">
        <el-input v-model.trim="dataForm.password" type="password"
          :placeholder="$t('modules.sys.user-add-or-update.form-item-3-input')"></el-input>
      </el-form-item>
      <el-form-item v-if="!dataForm.id" :label="$t('modules.sys.user-add-or-update.form-item-4')" prop="comfirmPassword"
        :class="{ 'is-required': !dataForm.id }">
        <el-input v-model.trim="dataForm.comfirmPassword" type="password"
          :placeholder="$t('modules.sys.user-add-or-update.form-item-4-input')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-5')" prop="email">
        <el-input v-model.trim="dataForm.email"
          :placeholder="$t('modules.sys.user-add-or-update.form-item-5-input')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-6')" prop="telephone">
        <el-input :placeholder="$t('modules.sys.user-add-or-update.form-item-6-input')"
          v-model.trim="dataForm.telephone" class="input-with-select">
          <el-select v-model="dataForm.telephoneZone" slot="prepend" style="width: 100px !important"
            :placeholder="$t('modules.sys.user-add-or-update.form-item-6-select')">
            <el-option v-for="(item, index) in crmProp" :key="index" :label="item.prefixe"
              :value="item.prefixe"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-7')" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-8')" prop="deptId">
        <el-cascader v-model="dataForm.deptId" :placeholder="$t('modules.sys.user-add-or-update.form-item-8-cascader')"
          :show-all-levels="false" style="width: 100%" :options="deptList" filterable
          :props="{ checkStrictly: true, label: 'name', value: 'deptId', emitPath: false, multiple: true, }" clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-9')" prop="enterpriseId">
        <el-select v-model="dataForm.enterpriseId"
          :placeholder="$t('modules.sys.user-add-or-update.form-item-9-select')" clearable>
          <el-option v-for="(item, index) in enterpriseList" :key="index" :label="item.name"
            :value="item.enterpriseCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('modules.sys.user-add-or-update.form-item-10')" size="mini" prop="isValid">
        <el-radio-group v-model="dataForm.isValid">
          <el-radio label="0">{{ $t('modules.sys.user-add-or-update.form-item-10-radio-0') }}</el-radio>
          <el-radio label="1">{{ $t('modules.sys.user-add-or-update.form-item-10-radio-1') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t('modules.sys.user-add-or-update.cancel-btn') }}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-re-click>{{ $t('modules.sys.user-add-or-update.submit-btn')
        }}</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import baseService from "@/service/baseService";
import { isEmail, isMobile, treeDataTranslate } from "@/utils/utils";
import { ElMessage } from "element-plus";
import { nextTick, onMounted, reactive, ref } from "vue";
import md5 from 'js-md5';
import { useI18n } from "vue-i18n";
// import { userEnterItem, userItem, userRoleItem } from "@/types/sys";
const { t } = useI18n()

const validatePassword = (rule: any, value: any, callback: any) => {
  let message = t('modules.sys.user-add-or-update.password-error') ?
    t('modules.sys.user-add-or-update.password-error') : "密码不能为空";

  if (!dataForm.id && !/\S/.test(value)) {
    callback(new Error(message));
  } else {
    callback();
  }
};

const validateComfirmPassword = (rule: any, value: any, callback: any) => {
  if (!dataForm.id && !/\S/.test(value)) {
    let message = t('modules.sys.user-add-or-update.confirm-password-error') ?
      t('modules.sys.user-add-or-update.confirm-password-error') : "確認密碼不能為空";
    callback(new Error(message))
  } else if (dataForm.password !== value) {
    let message = t('modules.sys.user-add-or-update.different-error') ?
      t('modules.sys.user-add-or-update.different-error') : "確認密碼與密碼輸入不一致";
    callback(new Error(message))
  } else {
    callback();
  }
}

var validateEmail = (rule : any , value: any , callback : any) => {
  if(!isEmail(value)) {
    let message = t('modules.sys.user-add-or-update.email-error') ?
            t('modules.sys.user-add-or-update.email-error') : "信箱格式錯誤";
          callback(new Error(message))
  } else {
    callback()
  }
}

var validateMobile = (rule: any , value : any , callback : any) => {
  if(dataForm.telephoneZone === '+86' && !isMobile(value)) {
    let message = t('modules.sys.user-add-or-update.phone-error') ?
            t('modules.sys.user-add-or-update.phone-error') : "手機號格式錯誤";
          callback(new Error(message))
  } else {
    callback()
  }
}

const emit = defineEmits(["refreshDataList"]);
const visible = ref(false)
const roleList = ref([])
const crmProp = ref([])
const enterpriseList = ref([])
const dataForm = reactive({
  // userId: 0,
  id: 0,
  loginId: '',
  userName: '',
  password: '',
  comfirmPassword: '',
  salt: '',
  email: '',
  telephoneZone: '',
  telephone: '',
  roleIdList: [],
  deptId: [],
  name: '',
  isValid: "1",
  enterpriseId: '',
})
const dataFormDept = reactive({
  deptId: '',
  parentId: 0,
  parentName: '',
  name: '',
  orderNum: 0,
  delFlag: ''
})
const deptList = ref<any>([])
const deptListTreeProps = reactive({
  label: 'name',
  children: 'children'
})
const dataRule = {
  userName: [{
    required: true,
    message: t('modules.sys.user-add-or-update.dataRule-userName'),
    trigger: 'blur'
  }],
  loginId: [{
    required: true,
    message: t('modules.sys.user-add-or-update.dataRule-loginId'),
    trigger: 'blur'
  }],
  password: [{
    validator: validatePassword,
    trigger: 'blur'
  }],
  comfirmPassword: [{
    validator: validateComfirmPassword,
    trigger: 'blur'
  }],
  email: [{
    required: true,
    message: t('modules.sys.user-add-or-update.dataRule-email'),
    trigger: 'blur'
  },
  {
    validator: validateEmail,
    trigger: 'blur'
  }
  ],
  deptId: [{
    required: true,
    message: t('modules.sys.user-add-or-update.deptId'),
    trigger: 'blur'
  }],
  enterpriseId: [{
    required: true,
    message: t('modules.sys.user-add-or-update.enterpriseId'),
    trigger: 'blur'
  }],
  telephone: [
    // {required: true, message: this.$t('modules.sys.user-add-or-update.dataRule-telephone'), trigger: 'blur'},
    {
      validator: validateMobile,
      trigger: 'blur'
    }
  ],
  roleIdList: [{
    required: true,
    message: t('modules.sys.user-add-or-update.dataRule-roleIdList'),
    trigger: 'blur'
  },]
}


const dataFormRef = ref()
const init = (id: number, deptId: string) => {
  dataForm.id = id || 0;
  // 时区，默认给显示第一个
  getPrefix();
  dataForm.telephoneZone = '+886';
  getEnterPriseList();
  baseService.get('/sys/role/select')
    .then((data) => {
      roleList.value = data && data.resultCode === 200 ? data.body.records : []
    }).then(() => {
      visible.value = true;
      nextTick(() => {
        dataFormRef.value.resetFields()
      })
    }).then(() => {
      baseService.get('/sys/sysdept/select')
        .then((data) => {
          deptList.value = treeDataTranslate(data.body.records, 'deptId')
        }).then(() => {
          if (dataForm.id) {
            baseService.get(`/sys/user/info/${dataForm.id}`)
              .then((data) => {
                if (data && data.resultCode === 200) {
                  dataForm.userName = data.body.userName;
                  dataForm.loginId = data.body.loginId;
                  dataForm.salt = data.body.salt;
                  dataForm.email = data.body.email;
                  dataForm.telephoneZone = data.body.telephoneZone;
                  dataForm.telephone = data.body.telephone;
                  dataForm.roleIdList = data.body.roleIdList;
                  dataForm.isValid = data.body.isValid;
                  dataForm.deptId = data.body.deptId;
                  dataForm.enterpriseId = data.body.enterpriseId;
                }
              })
          } else {
            dataForm.deptId = []
          }
        })
    })
}

const getPrefix = () => {
  baseService.get(`/common-country/getPrefix`)
    .then((data) => {
      if (data && data.resultCode === 200) {
        crmProp.value = data.body
      }
    })
}

//    表单提交
const dataFormSubmit = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (valid) {
      baseService.post(`/sys/user/${!dataForm.id ? 'save' : 'update'}`, {
        'userId': dataForm.id || undefined,     
        'loginId': dataForm.loginId,
        'userName': dataForm.userName,
        'password': dataForm.password === '' ? '' : md5(dataForm.password),
        'salt': dataForm.salt,
        'email': dataForm.email,
        'telephoneZone': dataForm.telephoneZone,
        'telePhone': dataForm.telephone,
        'isValid': dataForm.isValid,
        'roleIdList': dataForm.roleIdList,
        'deptIdList': dataForm.deptId,
        'enterpriseId': dataForm.enterpriseId
      }).then((data) => {
        if (data && data.resultCode === 200) {
          let message = t('modules.sys.user-add-or-update.submit-success') ?
            t('modules.sys.user-add-or-update.submit-success') : "操作成功";

          ElMessage({
            message: message,
            type: 'success',
            duration: 1500,
            onClose: () => {
              visible.value = false
              emit("refreshDataList")
            }
          })
        }
      })
    }
  })
}

//    获取公司下拉选
const getEnterPriseList = () => {
  baseService.get('/sys/enterprise/select')
    .then((data) => {
      if (data && data.resultCode === 200) {
        enterpriseList.value = data.body.records;
      }
    })
}

onMounted(() => {

})


</script>

<style></style>