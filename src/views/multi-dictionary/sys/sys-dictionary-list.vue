<template>
  <!--詞典表管理-->
  <div class="basic member">
    <!-- 查詢表單 -->
    <div>
      <el-form ref="dataFormRef" :model="dataForm" label-width="80px">
        <el-row type="flex" justify="space-between" style="margin-bottom: 10px;">
          <el-col :span="6">
            <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.form-item-1')"
              prop="functionCode">
              <el-input v-model="dataForm.functionCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.form-item-2')" prop="itemType">
              <el-input v-model="dataForm.itemType" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.form-item-3')" prop="itemKey">
              <el-input v-model="dataForm.itemKey" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="10">
            <el-form-item :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.form-item-4')"
              prop="languageSelect">
              <el-col :span="10">
                <el-select v-model="dataForm.languageSelect" clearable>
                  <el-option v-for="(item, index) in langList" :key="index" :label=item.langTypeName
                    :value=item.field1></el-option>
                </el-select>
              </el-col>
              <el-col :span="13" class="ml-2">
                <el-input v-model="dataForm.languageContent" class="input-with-select" clearable>
                </el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <span class="red mt-2">{{ $t('modules.multi-dictionary.sys.sys-dictionary-list.prompt') }}</span>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="24" class="d-flex flex-end">
            <el-button @click="getTableList(1)">{{ $t('modules.multi-dictionary.sys.sys-dictionary-list.search-btn') }}
            </el-button>
            <el-button type="primary" @click="addData()">
              {{ $t('modules.multi-dictionary.sys.sys-dictionary-list.save-btn') }}
            </el-button>
            <el-button type="danger" @click="reset('dataForm')">
              {{ $t('modules.multi-dictionary.sys.sys-dictionary-list.reset-btn') }}
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--查询列表-->
    <div>
      <el-table :data="tableList" border stripe fit v-loading="dataListLoading" style="width: 100%">
        <el-table-column header-align="center" align="center" fixed="left" type="index" width="60"
          :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-1')">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-2')" width="250"
          fixed="left" align="center">
          <template v-slot="scope">
            <el-button plain type="primary" link @click="addData(scope.row)">
              {{ $t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-2-save') }}
            </el-button>
            <el-button plain type="primary" link @click="deleteRow(scope.row, scope.$index)">
              {{ $t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-2-delete') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
          :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-3')" prop="functionCode"
          width="300">
        </el-table-column>
        <el-table-column align="center" :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-4')"
          width="300" prop="itemType">
        </el-table-column>
        <el-table-column align="center" :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-5')"
          width="300" prop="itemKey">
        </el-table-column>
        <el-table-column header-align="center" align="center"
          :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-6')" width="300" prop="en"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column header-align="center" align="center"
          :label="$t('modules.multi-dictionary.sys.sys-dictionary-list.table-column-8')" width="300"
          show-overflow-tooltip prop="tc">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <sysDictionaryAdd :visible="addVisible" @closeDialog="closeDialog"></sysDictionaryAdd>
    <sysDictionaryUpdate ref="internationalRef" @refreshList="getTableList"></sysDictionaryUpdate>
  </div>
</template>

<script setup lang="ts">
import { deleteLanguageData, getLanguageList, getSysLangageType } from '@/service/sys/language';
import { useAppStore } from '@/store';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onActivated, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import sysDictionaryAdd from './sys-dictionary-add.vue';
import sysDictionaryUpdate from './sys-dictionary-update.vue';

// 状态数据
const appStore = useAppStore();
// 登录语言
const { t } = useI18n();
// refs
const dataFormRef = ref();
const internationalRef = ref();
// 是否可见
let addVisible = ref(false);
// 表单
const dataForm = ref({
  // 功能代碼
  functionCode: '',
  // 項目類型
  itemType: '',
  // 項目編號
  itemKey: '',
  // 查詢語言類型
  languageSelect: '',
  // 查詢語言內容
  languageContent: '',
  // 缺失語言
  languageLack: ''
});
// 表格数据列表
const tableList = ref([]);
// 表格loading标识
let dataListLoading = ref(false);
// 表格分页相关数据
let pageIndex = ref(1);
let pageSize = ref(10);
let totalPage = ref(0);
let basic = ref({});
let langList = ref<any[]>([]);
// 获取表格数据
const getTableList = async (page?: number) => {
  // 加载中
  dataListLoading.value = true;
  // 参数设置
  let params = Object.assign({
    page: page || pageIndex.value,
    limit: pageSize.value
  }, dataForm.value);
  // 请求
  const data = await getLanguageList(params);
  // 判断
  if (data && data.resultCode === 200) {
    tableList.value = data.body.records;
    totalPage.value = data.body.totalCount;
    pageSize.value = data.body.pageSize;
    pageIndex.value = data.body.currPage;
    dataListLoading.value = false;
  }
}
// 关闭页面
const closeDialog = () => {
  addVisible.value = false;
  getTableList();
}
// 修改頁數大小
const sizeChangeHandle = (val: number) => {
  pageSize.value = val;
  pageIndex.value = 1;
  getTableList();
}
// 选择分页
const currentChangeHandle = (val: number) => {
  pageIndex.value = val;
  getTableList();
}
// 新建/修改
const addData = (row?: any) => {
  if (row) {
    // 修改 ---共通國際化頁面
    internationalRef.value.init(row);
  } else {
    // 新增
    addVisible.value = true;
  }
}
// 重置查詢條件
const reset = (form: string) => {
  if (dataFormRef) dataFormRef.value.resetFields();
  dataForm.value.languageContent = "";
}
// 删除数据
const deleteRow = (row: any, index: number) => {
  let indexNum = index + 1;
  let message = t('modules.multi-dictionary.sys.sys-dictionary-list.delete-confirm', { indexNum: indexNum });
  let title = t('modules.multi-dictionary.sys.sys-dictionary-list.delete-title');
  let confirm = t('modules.multi-dictionary.sys.sys-dictionary-list.confirmButtonText');
  let cancel = t('modules.multi-dictionary.sys.sys-dictionary-list.cancelButtonText');
  let success = t('modules.multi-dictionary.sys.sys-dictionary-list.delete-success');

  ElMessageBox.confirm(message, title, {
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    type: "warning"
  }).then(async () => {
    // 获取数据
    const data = await deleteLanguageData({
      functionCode: row.functionCode,
      itemKey: row.itemKey,
      itemType: row.itemType,
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
// 获取列表数据
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
// 生命周期函数
onActivated(() => getLists());
</script>

<style scoped lang="scss">
.el-tooltip__popper {
  max-width: 250px;
}
</style>