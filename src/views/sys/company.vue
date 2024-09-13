<template>
  <div class="mod-menu">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-if="store.isAuth('sys:enterprise:save')" type="primary" @click="addOrUpdateHandle()">{{
          $t('modules.sys.enterprise.save-btn') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" row-key="enterpriseCode" border default-expand-all style="width: 100%; ">
      <el-table-column prop="name" header-align="center" min-width="30%"
        :label="$t('modules.sys.enterprise.table-column-1')">
      </el-table-column>
      <el-table-column prop="enterpriseCode" header-align="center" align="center" min-width="20%"
        :label="$t('modules.sys.enterprise.table-column-2')">
      </el-table-column>
      <el-table-column prop="parentName" header-align="center" align="center" min-width="20%"
        :label="$t('modules.sys.enterprise.table-column-3')">
      </el-table-column>
      <el-table-column prop="level" header-align="center" align="center" min-width="10%"
        :label="$t('modules.sys.enterprise.table-column-4')">
      </el-table-column>
      <el-table-column prop="orderNum" header-align="center" align="center" min-width="10%"
        :label="$t('modules.sys.enterprise.table-column-5')">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="180"
        :label="$t('modules.sys.enterprise.table-column-6')">
        <template v-slot="scope">
          <el-button v-if="store.isAuth('sys:enterprise:update')" link size="small"
            @click="addOrUpdateHandle(scope.row.enterpriseCode)">
            {{ $t('modules.sys.enterprise.table-column-6-update') }}</el-button>
          <el-button v-if="store.isAuth('sys:enterprise:delete')" link size="small"
            @click="deleteHandle(scope.row.enterpriseCode, scope.row.name)">
            {{ $t('modules.sys.enterprise.table-column-6-delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
  </div>
</template>
<script setup lang="ts">
import { getCompanyDataList, postCompanyDel } from '@/service/sys/company';
import { IObject } from '@/types/interface';
import { treeDataTranslate } from '@/utils/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useAppStore } from "@/store";
import { nextTick, onMounted, reactive, ref } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n()
let store = useAppStore();

const dataForm = reactive({})
const dataList: IObject<any> = ref([])
const dataListLoading = ref(false)
const addOrUpdateVisible = ref(false)

// 获取数据列表
const getDataList = async () => {
  dataListLoading.value = true

  try {
    const data = await getCompanyDataList()
    dataList.value = treeDataTranslate(data.body.records, 'enterpriseCode', 'parentCode')
    console.log(dataList.value);

  } catch (error) {
    console.log(error);

  } finally {
    dataListLoading.value = false;
  }
}

const addOrUpdate = ref()
// 新增 / 修改
const addOrUpdateHandle = (id:string) => {
  addOrUpdateVisible.value = true
  nextTick(() => {
        if (addOrUpdate.value && addOrUpdate.value.init) {
            addOrUpdate.value.init(id);
        }
    })
}

// 删除
const deleteHandle = (id: string, name: string) => {
  let message = t("modules.sys.enterprise.delete-confirm", { name: `${name}` }) ?
    t("modules.sys.enterprise.delete-confirm", { name: `${name}` }) :
    `確定對[公司名稱為${name}]進行[刪除]操作?`;
  let title = t("modules.sys.enterprise.delete-title") ?
    t("modules.sys.enterprise.delete-title") : "提示";
  let confirm = t("modules.sys.enterprise.confirmButtonText") ?
    t("modules.sys.enterprise.confirmButtonText") : "確定";
  let cancel = t("modules.sys.enterprise.cancelButtonText") ?
    t("modules.sys.enterprise.cancelButtonText") : "取消";
  let success = t("modules.sys.enterprise.delete-success");

  ElMessageBox.confirm(message, title, {
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    type: 'warning'
  }).then(async () => {
    const data = await postCompanyDel()
    if (data && data.resultCode === 200) {
      ElMessage({
        message: success,
        type: 'success',
        duration: 1500,
        onClose: () => {
          getDataList()
        }
      })
    }
  }).catch(() => { })
}

onMounted(() => {
  getDataList();
})
</script>
<style scoped></style>