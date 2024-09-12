<template>
  <div class="mod-menu">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <!-- v-if="isAuth('sys:sysdept:save')" -->
        <el-button type="primary" @click="addOrUpdateHandle()">{{ $t("modules.sys.sysdept.form-item-btn") }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" row-key="deptId" border default-expand-all style="width: 100%">
      <el-table-column prop="name" header-align="center" min-width="40%" :label="$t('modules.sys.sysdept.table-column-1')"> </el-table-column>
      <el-table-column prop="parentName" header-align="center" align="center" min-width="10%" :label="$t('modules.sys.sysdept.table-column-2')"> </el-table-column>
      <el-table-column prop="orderNum" header-align="center" align="center" min-width="10%" :label="$t('modules.sys.sysdept.table-column-3')"> </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="180" :label="$t('modules.sys.sysdept.table-column-4')">
        <template #default="scope">
          <!-- v-if="isAuth('sys:sysdept:update')" -->
          <el-button link size="small" @click="addOrUpdateHandle(scope.row.deptId)">{{ $t("modules.sys.sysdept.table-column-4-update") }}</el-button>
          <!-- v-if="isAuth('sys:sysdept:delete')" -->
          <el-button link size="small" @click="deleteHandle(scope.row.deptId, scope.row.name)">{{ $t("modules.sys.sysdept.table-column-4-delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
  </div>
</template>

<script lang="ts" setup>
import baseService from "@/service/baseService";
import { treeDataTranslate } from "@/utils/utils";
import { ref, reactive, nextTick, onMounted } from "vue";
import { IObject } from "@/types/interface";
// import AddOrUpdate from "./sysdept-add-or-update.vue";

import { useI18n } from "vue-i18n";
import { ElMessage, ElMessageBox } from "element-plus";
const { t } = useI18n();

const dataForm = ref({});
const dataList = ref<IObject[]>([]);
const dataListLoading = ref(false);
const addOrUpdateVisible = ref(false);
const addOrUpdate = ref();

// 获取数据列表
const getDataList = () => {
  dataListLoading.value = true;
  baseService.get("/sys/sysdept/list").then((res) => {
    dataList.value = treeDataTranslate(res.body.records, "deptId");
    console.log(dataList.value);
    dataListLoading.value = false;
  });
};

// 新增 / 修改
const addOrUpdateHandle = (id?: string) => {
  addOrUpdateVisible.value = true;
  nextTick(() => {
    addOrUpdate.value.init(id);
  });
};

// 删除
const deleteHandle = (id: string, name: string) => {
  let message = t("modules.sys.menu.delete-confirm", { menuName: `${menuName}` }) ? t("modules.sys.menu.delete-confirm", { menuName: `${menuName}` }) : `確定對[選單名稱為${menuName}]進行[刪除]操作?`;
  let title = t("modules.sys.menu.delete-title") ? t("modules.sys.menu.delete-title") : "提示";
  let confirm = t("modules.sys.menu.confirmButtonText") ? t("modules.sys.menu.confirmButtonText") : "確定";
  let cancel = t("modules.sys.menu.cancelButtonText") ? t("modules.sys.menu.cancelButtonText") : "取消";
  let success = t("modules.sys.menu.delete-success");

  ElMessageBox.confirm(message, titile, {
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    type: "warning"
  })
    .then(() => {
      baseService.post(`/sys/sysdept/delete/${id}`).then((res) => {
        if (res && res.resultCode === 200) {
          ElMessage.success({
            message: success,
            type: "success",
            duration: 1500,
            onClose: () => {
              getDataList();
            }
          });
        }
      });
    });
};

onMounted(() => {
  getDataList();
});
</script>

<style lang="scss" scoped></style>
