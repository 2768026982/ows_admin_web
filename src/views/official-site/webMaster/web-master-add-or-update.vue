<template>
  <el-dialog :title="t('common.pageHead.back')" :close-on-click-modal="false" modal-append-to-body v-model="visible">
    <div class="basic member">
      <el-page-header class="mb-8" @click="goPage()"
      :title="$t('common.pageHead.back')"
      :content="$t('modules.official-site.web-master-add-or-update.content')"></el-page-header>



      <div>
        <el-form ref="dataFormRef" :model="dataForm" :rules="rules" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="$t('modules.official-site.web-master-add-or-update.memo')" prop="memo" required>
                <el-input v-model="dataForm.memo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('modules.official-site.web-master-add-or-update.isValid')">
                <el-radio-group v-model="dataForm.isValid">
                  <el-radio label="1">{{ $t('modules.official-site.web-master-add-or-update.valid') }}</el-radio>
                  <el-radio label="0">{{ $t('modules.official-site.web-master-add-or-update.notValid') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('modules.official-site.web-master-add-or-update.homePage')">
                <el-radio-group v-model="dataForm.homePage">
                  <el-radio label="0">{{ $t('modules.official-site.web-master-add-or-update.notHomePage') }}</el-radio>
                  <el-radio label="1">{{ $t('modules.official-site.web-master-add-or-update.isHomePage') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          

          <el-row>
          <el-col v-for="(item, index) in languageList" :key="index" :span="20">
            <el-row>
              <el-col :span="8">
                <!--模板語系-->
                <el-form-item :label="$t('modules.official-site.web-master-add-or-update.item-1')">
                  <el-select v-model="languageList[index].langTypeId" disabled>
                    <el-option
                      :label="item.langTypeName"
                      :value="item.langTypeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('modules.official-site.web-master-add-or-update.item-2')" prop="templateName">
                  <el-select v-model="dataForm.list[index].templateId" clearable>
                    <el-option
                      v-for="(option, index) in tmpNameList"
                      :key="index"
                      :label="option.templateName"
                      :value="option.templateId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

          <el-row>
            <el-col :span="4" :offset="10">
              <el-button type="primary" @click="addOrUpdate()">{{ $t('modules.merchant.gcp-discount-template.save') }}
              </el-button>
            </el-col>
          </el-row>


        </el-form>
      </div>
    </div>
  </el-dialog>
</template>



<script setup lang="ts">
import { getMasterDrop, getMasterInfo, getWebMasterInfo, postWebMaster } from '@/service/web/web-master-add-or-update';
import { getInfoResponse, getMasterDropList, optionType, tmpNameListParams } from '@/types/sys';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

import { useI18n } from "vue-i18n";
const { t } = useI18n()

const visible = ref(false)
const dataFormRef = ref()
const pageName = ref("modules.merchant.gcp-discount")
const dataForm = ref<getInfoResponse>({
  webId: '',
  memo: '',
  isValid: '',
  list: [],
  resultCode: 0,
  resultMessage: '',
  messageCode: '',
  body: undefined,

  homePage: '',
  success: false
})
const addTemplateFlag = ref(false)
const tmpNameList = ref<optionType[]>([])
const languageList = ref<any[]>([])

const rules = {
  memo: [
    {
      required: true,
      message: t('modules.official-site.web-master-add-or-update.rules-1'),
      trigger: "blur"
    }
  ]
}

onMounted(async () => {
  await getTmpNameList();
  getLanguageList();
  languageList.value.forEach(item => {
    const object = {
      templateId: "",
      templateName: "",
      languageId: item.langTypeId,
      languageName: ""
    };
    dataForm.value.list.push(object);
  });

  if (dataForm.value.webId === undefined) {
    // 新增初始化数据
    addTemplateFlag.value = true;
  } else {
    // 详情
    addTemplateFlag.value = false;
    await getInfo();
  }
});



const init = async (webId: string) => {
  dataForm.value.webId = webId || ''
  try {
    visible.value = true;
    if (dataForm.value.webId) {
      const data = await getMasterInfo()
      if (data && data.resultCode === 200) {
        dataForm.value.memo = data.memo
        dataForm.value.isValid = data.isValid
        dataForm.value.list = data.list
        dataForm.value.homePage = data.homePage
      }
    }
  } catch (error) {

  }
}

const getInfo = async () => {
  const data = await getWebMasterInfo();
  if (data?.resultCode === 200) {
    dataForm.value = data.body
    if (dataForm.value.list.length < languageList.value.length) {
      let arr = languageList.value.filter(item => {
        return dataForm.value.list.every(e => e.languageId !== item.langTypeId)
      })
      arr.forEach(item => {
        return dataForm.value.list.push({
          languageId: item.langTypeId,
          templateId: '',
          templateName: '',
          languageName: ''
        });
      })
      dataForm.value.list = dataForm.value.list.sort((a, b) => b.languageId.localeCompare(a.languageId))
    }
  }
}

// 模板名称下拉框
const getTmpNameList = async () => {
  const data = await getMasterDrop()
  if (data?.resultCode === 200 && data.body && data.body.length > 0) {
    tmpNameList.value = data.body
  }
}

const getLanguageList = (): any[] => {
  const storedLanguageList = localStorage.getItem("langList");
  if (storedLanguageList) {
    languageList.value = JSON.parse(storedLanguageList);
    languageList.value.sort((a, b) => b.langTypeId.localeCompare(a.langTypeId));
  } else {
    languageList.value = [];
  }
  return languageList.value;
  // languageList.value = storedLanguageList ? JSON.parse(storedLanguageList) : [];
  // languageList.value = languageList.value.sort((a, b) => b.langTypeId.localCompare(a.langTypeId));
  // return languageList.value
}

// 提交
const addOrUpdate = async () => {
  if (dataFormRef.value && dataFormRef.value.validate) {
    const valid = await dataFormRef.value.validate();
    if (valid && validateTemplate()) {
      const params = { ...dataForm };
      console.log("++++++++++++++++++++++++++"+params);
      
      const data = await postWebMaster(params);
      if (data?.resultCode === 200) {
        ElMessage({
          message: addTemplateFlag.value
            ? t('modules.official-site.web-master-add-or-update.add-success')
            : t('modules.official-site.web-master-add-or-update.update-success'),
          type: "success",
          duration: 1500
        });
        // goPage("official-site-webMaster/web-master-list");
        visible.value = false;
      }
    }
  }
};


// 模板非空校验
const validateTemplate = () => {
  const flag = ref(false)
  dataForm.value.list.forEach(item => {
    if (item.templateId !== '') {
      flag.value = true;
    }
  })
  if (flag.value) {
    return true;
  }
  ElMessage({
    message: t('modules.official-site.web-master-add-or-update.rules-2'),
    type: "error"
  })
  return false;
}

// 前往page页面
const goPage = () => {
  visible.value = false
}

defineExpose({
  init
});
</script>

<style scoped></style>
