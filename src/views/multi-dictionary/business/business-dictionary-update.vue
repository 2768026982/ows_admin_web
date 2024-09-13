<template>
  <!--共通國際化修改頁-->
  <div>
    <el-dialog :title="$t('modules.multi-dictionary.business.business-international.dialog-title')" @closed="closeFinish"
      width="70%" v-model="visible">
      <div class="admin-info">
        <el-form ref="updateFormRef" :label-position="'right'" v-loading="dataLoading" :model="dataForm" :rules="rules"
          class="shadow-form" label-width="100px">
          <el-row type="flex" justify="space-between">
            <el-col :span="8">
              <el-form-item :label="$t('modules.multi-dictionary.business.business-international.form-item-1')" prop="itemKey">
                <el-input v-model="dataForm.itemKey" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('modules.multi-dictionary.business.business-international.form-item-2')"
                prop="functionCode">
                <el-input v-model="dataForm.functionCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('modules.multi-dictionary.business.business-international.form-item-3')" prop="itemType">
                <el-input v-model="dataForm.itemType" disabled></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="8">
              <el-form-item :label="$t('modules.multi-dictionary.business.business-international.form-item-4')" prop="languageId"
                ref="languageId">
                <el-select v-model="dataForm.languageId" clearable>
                  <el-option v-for="(item, index) in langList" :key="index" :label=item.langTypeName
                    :value=item.langTypeId></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="$t('modules.multi-dictionary.business.business-international.form-item-5')" prop="content">
                <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 6 }"
                  v-model="dataForm.content"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8" class="d-flex flex-end">
              <el-button type="primary" @click="save" v-re-click>{{
                $t('modules.multi-dictionary.business.business-international.save-btn') }}</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row type="flex" justify="space-between" class="mt-6">
          <el-col :span="24">
            <el-table :data="tableList" border v-loading="dataListLoading" style="width: 100%">
              <el-table-column header-align="center" align="center" fixed="left" type="index" width="60"
                :label="$t('modules.multi-dictionary.business.business-international.table-column-1')">
                <template v-slot="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center"
                :label="$t('modules.multi-dictionary.business.business-international.table-column-2')" min-width="15%">
                <template v-slot="scope">
                  <div v-if="scope.row.primeLanguage == '1'">
                    {{ $t('modules.multi-dictionary.business.business-international.table-column-2-yes') }}</div>
                  <div v-else>{{ $t('modules.multi-dictionary.business.business-international.table-column-2-no') }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center"
                :label="$t('modules.multi-dictionary.business.business-international.table-column-3')" min-width="15%">
                <template v-slot="scope">
                  {{ global_variable.filterObj(langList, 'langTypeId', scope.row.langTypeId).langTypeName }}
                </template>
              </el-table-column>
              <el-table-column align="center"
                :label="$t('modules.multi-dictionary.business.business-international.table-column-4')" min-width="40%">
                <template v-slot="scope">
                  <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="scope.row.languageContent"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('modules.multi-dictionary.business.business-international.table-column-5')" width="200"
                fixed="right" align="center">
                <template v-slot="scope">
                  <el-button plain type="primary" link @click="updateData(scope.row)">
                    {{ $t('modules.multi-dictionary.business.business-international.table-column-5-update') }}
                  </el-button>
                  <!--是主要語言不讓刪除  primeLanguage：1是主要語言 0不是主要語言-->
                  <el-button plain type="danger" :disabled="scope.row.primeLanguage == '1'" link
                    @click="deleteRow(scope.row, scope.$index)">
                    {{ $t('modules.multi-dictionary.business.business-international.table-column-5-delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getSysLangageType } from '@/service/sys/language';
import { useAppStore } from '@/store';
import { ElMessage, ElMessageBox } from 'element-plus';
import { nextTick, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import global_variable from "@/utils/global_variable";
import { getBusinessLanguageContent, getBusinessLanguageDelete, getBusinessLanguageInsert, getBusinessLanguageUpdate } from '@/service/business/language';

// refs
let updateFormRef = ref();
// 状态数据
const appStore = useAppStore();
// 登录语言
const { t } = useI18n();

let emit = defineEmits(['refreshList']);
let dataForm = ref({
  //语言
  languageId: '',
  //内容
  content: '',
  //功能代碼
  functionCode: '',
  //項目類型
  itemType: '',
  //項目鍵值
  itemKey: ''
});
let rules = ref({
  languageId: [
    { required: true, message: t('modules.multi-dictionary.business.business-international.rules-languageId'), trigger: 'change' },
  ]
});
// 表格数据列表
let tableList = ref([]);
// 表格loading标识
let dataListLoading = ref(false);
//对话框可视性
let visible = ref(false);
// v-loading绑定值
let dataLoading = ref(false);
let basic = ref({});
let langList = ref<any[]>([]);
// 获取表格数据
const getTableList = async (page?: number) => {
  dataListLoading.value = true;
  // 请求
  const data = await getBusinessLanguageContent({
    //功能代码
    functionCode: dataForm.value.functionCode,
    //项目类型
    itemType: dataForm.value.itemType,
    //项目编号
    itemKey: dataForm.value.itemKey
  });
  // 判断
  if (data && data.resultCode === 200) {
    tableList.value = data.body;
    dataListLoading.value = false;
  }
}
// 获取数据
const getLists = async () => {
  // 获取基礎數據
  basic.value = appStore.state.basic;
  langList.value = appStore.state.langList;
  // 获取登录语言
  if (langList.value && langList.value.length == 0) {

    const res = await getSysLangageType();

    if (res && res.resultCode === 200) {
      langList.value = res.body.records;
      appStore.updateLangList(res.body.records);
    }
  }
  getTableList();
}
// 保存数据
const save = () => {
  updateFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const data = await getBusinessLanguageInsert({
        //功能代碼
        functionCode: dataForm.value.functionCode,
        //項目類型
        itemType: dataForm.value.itemType,
        //项目编号
        itemKey: dataForm.value.itemKey,
        //词汇语系种类ID
        langTypeId: dataForm.value.languageId,
        //词汇内容
        languageContent: dataForm.value.content
      });

      if (data && data.resultCode === 200) {

        let message = t('modules.multi-dictionary.sys.sys-international.request-success');

        ElMessage.success({
          duration: 1500,
          message,
          onClose: () => {
            // this.$refs['languageId'].resetField();
            dataForm.value.languageId = '';
            dataForm.value.content = '';
            getTableList();
          }
        });
      } else {
        // $refs['languageId'].resetField();
        dataForm.value.languageId = "";
        dataForm.value.content = "";
      }
    };
  });
}
// 修改
const updateData = async (row: any) => {
  // 请求
  const data = await getBusinessLanguageUpdate({
    //词汇语系种类ID
    langTypeId: row.langTypeId,
    //词汇内容
    languageContent: row.languageContent,
    //词汇ID
    pcItemId: row.pcItemId
  });
  if (data && data.resultCode === 200) {
    let message = t('modules.multi-dictionary.sys.sys-international.request-success');

    ElMessage.success({
      duration: 1500,
      message,
      onClose: () => getTableList()
    });
  }
}
// 删除
const deleteRow = (row: any, index: number) => {
  let indexNum = index + 1;

  let message = t('modules.multi-dictionary.sys.sys-international.delete-confirm', { indexNum: indexNum });
  let title = t('modules.multi-dictionary.sys.sys-international.delete-title');
  let confirm = t('modules.multi-dictionary.sys.sys-international.confirmButtonText');
  let cancel = t('modules.multi-dictionary.sys.sys-international.cancelButtonText');
  let success = t('modules.multi-dictionary.sys.sys-international.request-success');

  ElMessageBox.confirm(message, title, {
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    type: "warning"
  }).then(async () => {
    // 获取数据
    const data = await getBusinessLanguageDelete({
      //词汇语系种类ID
      langTypeId: row.langTypeId,
      //词汇ID
      pcItemId: row.pcItemId
    });
    // 判断
    if (data && data.resultCode === 200) {
      ElMessage.success({
        duration: 1500,
        message: success,
        onClose: () => getTableList()
      });
    }
  });
}
// 关闭dialog
const closeFinish = () => {
  nextTick(() => {
    updateFormRef.value.resetFields();
    emit("refreshList");
  });
}
// 初始化
const init = (row: any) => {
  visible.value = true;
  //词汇语系种类ID
  dataForm.value.functionCode = row.functionCode;
  //词汇内容
  dataForm.value.itemType = row.itemType;
  //词汇ID
  dataForm.value.itemKey = row.itemKey;
  // 获取数据
  getLists();
}
defineExpose({
  init
});
</script>
<style scoped></style>