<template>
  <el-dialog
    :title="!dataForm.id ? $t('modules.sys.role-add-or-update.save') : $t('modules.sys.role-add-or-update.update')"
    :close-on-click-modal="false" modal-append-to-body v-model="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataFormRef" @keyup.enter="dataFormSubmit()">
      <el-row>
        <el-col :span="10">
          <el-form-item :label="$t('modules.sys.role-add-or-update.form-item-1')" prop="roleName" label-width="40%">
            <el-input v-model.trim="dataForm.roleName"
              :placeholder="$t('modules.sys.role-add-or-update.form-item-1-input')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('modules.sys.role-add-or-update.form-item-2')" prop="deptId" label-width="45%"
            style="margin-left: 10px">
            <el-cascader v-model="dataForm.deptId"
              :placeholder="$t('modules.sys.role-add-or-update.form-item-2-cascader')" :show-all-levels="false"
              style="width: 100%" :options="deptList" filterable
              :props="{ checkStrictly: true, label: 'name', value: 'deptId', emitPath: false, multiple: false }"
              clearable>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="participateAudit" style="margin-left: 15px">
            <el-checkbox v-model="dataForm.participateAudit" true-label="1" false-label="0"
              :label="$t('modules.sys.role-add-or-update.form-item-3-checkbox')"></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showVisibleBranches">
        <el-col :span="10">
          <el-form-item :label="$t('modules.sys.role-add-or-update.form-item-5')" prop="visibleBranches"
            label-width="40%">
            <el-select v-model="dataForm.visibleBranches">
              <el-option v-for="item in global_variable.visibleBranches" :key="item.value" :label="item.name"
                :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('modules.sys.role-add-or-update.form-item-6')" style="margin-left: 10%">
        <div class="custom-tree-container">
          <el-tree :data="menuList" :props="menuListTreeProps" node-key="menuId" ref="menuListTreeRef"
            :default-expand-all="false" :check-strictly="true" show-checkbox> </el-tree>
        </div>
      </el-form-item>
    </el-form>
    <span class="dialog-footer flex-right">
      <el-button @click="visible = false">{{ $t("modules.sys.role-add-or-update.cancel-btn") }}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-re-click>{{ $t("modules.sys.role-add-or-update.submit-btn")
        }}</el-button>
    </span>
  </el-dialog>
</template>
<script setup lang="ts">
import { getEnterPriseInfo } from "@/service/sys/enterprise";
import { getMenuList } from "@/service/sys/menu";
import { getRoleInfo, roleDataSave, roleDataUpdate } from "@/service/sys/role";
import { getDeptSelect } from "@/service/sys/sysdept";
import { IObject } from "@/types/interface";
import { RoleInfoParams } from "@/types/sys";
import { treeDataTranslate } from "@/utils/utils";
import { ElMessage } from "element-plus";
import { nextTick, ref } from "vue";
import global_variable from "@/utils/global_variable";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["refreshDataList"]);
const { t } = useI18n();
// 数据区
let dataFormRef = ref();
let menuListTreeRef = ref();
let visible = ref(false);
let menuList = ref<IObject[]>([]);
let menuListTreeProps = ref({
  label: "menuName",
  children: "children"
});
let dataForm = ref({
  id: 0,
  roleName: "",
  deptId: "",
  participateAudit: "0",
  remark: "",
  visibleBranches: "0",
  contentList: [],
  itemType: "",
  functionCode: "",
  // roleNameKey: '',
  pcItemId: ""
});
let deptList = ref<IObject[]>([]);
let dataRule = ref({
  roleName: [{ required: true, message: t("modules.sys.role-add-or-update.dataRule-roleName"), trigger: "blur" }],
  deptId: [{ required: true, message: t("modules.sys.role-add-or-update.dataRule-deptId"), trigger: "blur" }]
});
let showVisibleBranches = ref(false);
// 获取部门列表
const getDeptList = async () => {
  try {
    const data = await getDeptSelect();
    // 获取生成部门树型图
    deptList.value = treeDataTranslate(data.body.records, "deptId");
  } catch (error) {
    console.log(error);
  }
};
// 初始化数据
const init = async (id: number) => {
  dataForm.value.id = id || 0;
  try {
    // 异步获取部门数据
    getDeptList();
    // 同步获取菜单数据
    const data = await getMenuList();
    menuList.value = treeDataTranslate(data.body, "menuId", "parentId");
    visible.value = true;
    if (dataForm.value.id) {
      const resData = await getRoleInfo(dataForm.value.id);
      if (resData && resData.resultCode === 200) {
        dataForm.value.roleName = data.body.roleName;
        dataForm.value.deptId = data.body.deptId;
        dataForm.value.participateAudit = data.body.participateAudit;
        dataForm.value.visibleBranches = data.body.visibleBranches;
        dataForm.value.contentList = data.body.contentList;
        dataForm.value.itemType = data.body.itemType;
        dataForm.value.functionCode = data.body.functionCode;
        dataForm.value.pcItemId = data.body.pcItemId;
        data.body.menuIdList.forEach((value: string) => {
          if (menuListTreeRef && menuListTreeRef.value) menuListTreeRef.value.setChecked(value, true, false);
        });
      }
    }
    // 同步获取企业信息数据
    const loginData = await getEnterPriseInfo();
    if (loginData && loginData.resultCode === 200) {
      showVisibleBranches.value = loginData.body.level === "1";
    }
    nextTick(() => {
      if (dataFormRef && dataFormRef.value) dataFormRef.value.resetFields();
      if (menuListTreeRef && menuListTreeRef.value) menuListTreeRef.value.setCheckedKeys([]);
      dataForm.value.pcItemId = "";
    });
  } catch (error) {
    console.log(error);
  }
};
// 表单提交
const dataFormSubmit = () => {
  dataFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      let params: RoleInfoParams = {
        roleId: dataForm.value.id || undefined,
        roleName: dataForm.value.roleName,
        remark: dataForm.value.remark,
        participateAudit: dataForm.value.participateAudit,
        deptId: dataForm.value.deptId,
        menuIdList: [].concat(menuListTreeRef.value.getCheckedKeys(), menuListTreeRef.value.getHalfCheckedKeys()),
        visibleBranches: showVisibleBranches.value ? dataForm.value.visibleBranches : "1",
        contentList: dataForm.value.contentList,
        //新增時沒有pcItemId
        pcItemId: !dataForm.value.id ? "" : dataForm.value.pcItemId
      };
      let data = null;
      if (dataForm.value.id) {
        data = await roleDataUpdate(params);
      } else {
        data = await roleDataSave(params);
      }

      if (data && data.resultCode === 200) {
        ElMessage.success({
          duration: 1500,
          message: t("modules.sys.role-add-or-update.submit-success"),
          onClose: () => {
            visible.value = false;
            emit("refreshDataList");
          }
        });
      }
    }
  });
};
defineExpose({
  init
});
</script>
<style scoped>
.custom-tree-container {
  /* 自定义样式： */
  display: flex;
  justify-content: flex-start;
  /*对齐方式 */
  height: 400px;
  overflow: auto;
}

.flex-right {
  display: flex;
  justify-content: end;
}
</style>
