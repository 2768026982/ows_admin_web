<template>
  <el-dialog :title="title" v-model="props.visible" @closed="dialogClose">
    <el-form ref="dicFormRef" :label-position="'right'" v-loading="dataLoading" :model="dataForm" :rules="rules">
      <el-row type="flex" justify="space-around">
        <el-col :span="10">
          <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-add.form-item-1')" prop="functionCode">
            <el-input v-model="dataForm.functionCode" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :pull="1">
          <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-add.form-item-2')" prop="itemType">
            <el-input v-model="dataForm.itemType" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="10">
          <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-add.form-item-3')" prop="itemKey">
            <el-input v-model="dataForm.itemKey" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :pull="1">
          <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-add.form-item-4')" prop="langTypeId">
            <el-select disabled v-model="dataForm.langTypeId" clearable>
              <el-option v-for="(item, index) in langList" :key="index" :label=item.langTypeName
                :value=item.langTypeId></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="10">
          <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-add.form-item-5')"
            prop="languageContent">
            <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 6 }"
              v-model="dataForm.languageContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :pull="1"></el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="10"></el-col>
        <el-col :span="10" :pull="1" class="flex-bottom">
          <el-button type="primary" @click="save" v-re-click>{{
            $t('modules.multi-dictionary.sys.sys-dictionary-add.save-btn') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { onActivated, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/store';
import { getSysLangageType, insertSysLanguage } from '@/service/sys/language';
import { LangItemRecord } from '@/types/lang';
import { ElMessage } from 'element-plus';
import router from '@/router';

const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
// ref对象
let dicFormRef = ref();
// 状态数据
const appStore = useAppStore();
// 登录语言
const { t } = useI18n();
// 数据区
const validateFunctionCode = (rule: any, value: string, callback: Function) => {
  let reg = /^\w+$/;
  if (!reg.test(value)) {
    let message = t('modules.multi-dictionary.sys.sys-dictionary-add.function-code-test');
    callback(new Error(message ? message : '功能代码只能输入英文、数字、下划线'));
  } else {
    callback();
  }
};
const validateItemType = (rule: any, value: string, callback: Function) => {
  let reg = /^\w+$/;
  if (!reg.test(value)) {
    let message = t('modules.multi-dictionary.sys.sys-dictionary-add.item-type-test');
    callback(new Error(message ? message : '項目類型只能输入英文、数字、下划线'));
  } else {
    callback();
  }
};
const validateItemKey = (rule: any, value: string, callback: Function) => {
  let reg = /^\w+$/;
  if (!reg.test(value)) {
    let message = t('modules.multi-dictionary.sys.sys-dictionary-add.item-key-test');
    callback(new Error(message ? message : '項目編號只能输入英文、数字、下划线'));
  } else {
    callback();
  }
};
let title = ref("");
let dataForm = ref({
  //功能代碼
  functionCode: '',
  //項目類型
  itemType: '',
  //項目編號
  itemKey: '',
  //主要語言
  langTypeId: '',
  //詞彙內容
  languageContent: ''
});
let dataLoading = ref(false);
let basic = ref({});
let langList = ref<LangItemRecord[]>([]);
const rules = ref({
  functionCode: [
    { required: true, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-functionCode-1'), trigger: 'blur' },
    { validator: validateFunctionCode, trigger: 'blur' },
    { min: 0, max: 36, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-functionCode-2'), trigger: 'blur' },
  ],
  itemType: [
    { required: true, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-itemType-1'), trigger: 'blur' },
    { validator: validateItemType, trigger: 'blur' },
    { min: 0, max: 100, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-itemType-2'), trigger: 'blur' },
  ],
  itemKey: [
    { required: true, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-itemKey-1'), trigger: 'blur' },
    { validator: validateItemKey, trigger: 'blur' },
    { min: 0, max: 100, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-itemKey-2'), trigger: 'blur' },
  ],
  languageContent: [
    { required: true, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-languageContent-1'), trigger: 'blur' },
    { min: 0, max: 300, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-languageContent-2'), trigger: 'blur' }
  ],
  langTypeId: [
    { required: true, message: t('modules.multi-dictionary.sys.sys-dictionary-add.rules-langTypeId'), trigger: 'change' }
  ]
});
// 关闭
const dialogClose = () => {
  dicFormRef.value.resetFields();
  emit('closeDialog');
}
// 获取列表数据
const getLists = async () => {
  //获取基礎數據
  basic.value = appStore.state.basic;
  langList.value = appStore.state.langList;
  //获取登录语言
  if (langList.value && langList.value.length == 0) {
    const res = await getSysLangageType();

    if (res && res.resultCode === 200) {
      langList.value = res.body.records;
      appStore.updateLangList(res.body.records);
    }
  }
  let str = t('modules.multi-dictionary.sys.sys-dictionary-add.page-header');
  title.value = str ? str : '新增詞典表';

  if (langList.value.length != 0) {
    let langItem = langList.value.find((item1: any) => item1.field1 === 'TC');
    //主要語言默認選中英語
    dataForm.value.langTypeId = langItem ? langItem.langTypeId : '';
  }
}
// 保存
const save = () => {
  dicFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const data = await insertSysLanguage(dataForm.value);
      if (data && data.resultCode === 200) {
        let message = t('modules.multi-dictionary.sys.sys-dictionary-add.save-success');
        ElMessage.success({
          duration: 1500,
          message,
          onClose: () => dialogClose()
        });
      }
    }
  })
}

onActivated(() => {
  getLists();
});
</script>
<style scoped>
.flex-bottom {
  display: flex;
  justify-content: end;
}
</style>