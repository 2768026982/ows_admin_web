<template>
  <div class="mod-sys__menu">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button  type="primary" @click="addOrUpdateHandle('')">{{$t("modules.sys.menu.form-item-save-btn")}}</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="dataListLoading" :data="dataList" row-key="menuId" border style="width: 100%">
      <el-table-column prop="menuName" :label="$t('modules.sys.menu.table-column-1')" header-align="center" min-width="150"></el-table-column>
      <el-table-column prop="parentName" :label="$t('modules.sys.menu.table-column-2')" header-align="center" align="center" width="120"></el-table-column>

      <el-table-column prop="icon" :label="$t('modules.sys.menu.table-column-3')" header-align="center" align="center" width="80">
        <template v-slot="scope">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="`#${scope.row.icon}`"></use>
          </svg>
        </template>
      </el-table-column>
      <el-table-column prop="menuType" :label="$t('modules.sys.menu.table-column-4')" header-align="center" align="center" width="80">
        <template v-slot="scope">
          <el-tag v-if="scope.row.menuType === '10'" size="small">{{$t("modules.sys.menu.table-column-4-tag-1")}}</el-tag>
          <el-tag v-else-if="scope.row.menuType === '30'" size="small" type="success">{{$t("modules.sys.menu.table-column-4-tag-2")}}</el-tag>
          <el-tag v-else-if="scope.row.menuType === '20'" size="small" type="info">{{$t("modules.sys.menu.table-column-4-tag-3")}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sort" :label="$t('modules.sys.menu.table-column-5')" header-align="center" align="center" width="80"></el-table-column>
      <el-table-column prop="url" :label="$t('modules.sys.menu.table-column-6')" header-align="center" align="center" width="150" :show-overflow-tooltip="true"></el-table-column>

      <el-table-column :label="$t('modules.sys.menu.table-column-7')"
                       fixed="right" header-align="center" align="center" width="200">
        <template v-slot="scope">
          <el-button link type="primary" size="small" @click="addOrUpdateHandle(scope.row.menuId)">{{$t("modules.sys.menu.table-column-7-update")}}</el-button>
          <el-button link type="primary" size="small" @click="deleteHandle(scope.row.menuId,scope.row.menuName)">{{$t("modules.sys.menu.table-column-7-delete")}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, ref} from "vue";
import {onActivated} from "vue";
import baseService from "@/service/baseService";
import {treeDataTranslate} from "@/utils/utils";
import {IObject} from "@/types/interface";
import {ElMessage, ElMessageBox} from "element-plus";

const dataForm = ref({})
const dataList = ref<IObject[]>([])
const addOrUpdateVisible = ref(false)
const dataListLoading = ref(false)

// 獲取數據列表
const getDataList=()=>{
  dataListLoading.value = true
  baseService.get('/sys/menu/list')
    .then((res)=>{
      dataList.value = treeDataTranslate(res.body,'menuId','parentId')
      dataListLoading.value = false
    })
}
const deleteHandle = (id:String,menuName:String) =>{
  // let message = t('modules.sys.menu.delete-confirm',{menuName:`${menuName}`})？
  // t('modules.sys.menu.delete-confirm',{menuName: `${menuName}`}):
  // `確定對[選單名稱為${menuName}]進行[刪除]操作?`;
  let message = `確定對[選單名稱為${menuName}]進行[刪除]操作?`;
  let title = $t('modules.sys.menu.delete-title')?
    $t('modules.sys.menu.delete-title'):"提示";
  let confirm = $t('modules.sys.menu.confirmButtonText')?
    $t('modules.sys.menu.confirmButtonText'):"確定";
  let cancel = $t('modules.sys.menu.cancelButtonText')?
    $t('modules.sys.menu.cancelButtonText'):"取消";
  let success = $t('modules.sys.menu.delete-success');

  ElMessageBox.confirm(message,title,{
    confirmButtonText: confirm,
    cancelButtonText:cancel,
    type:'warning'
  }).then(()=>{
    baseService.post(`/sys/menu/delete/${id}`)
      .then((res)=>{
        if (res && res.resultCode === 200){
          ElMessage.success({
            duration:1500,
            message: success,
            onClose:()=>{
              getDataList()
            }
          })
        }
      })
  }).catch(()=>{})

}
const addOrUpdateHandle = (id : String) => {
  addOrUpdateVisible.value = true
  nextTick(()=>{

  })
}
onActivated(()=>{
  getDataList()
})
</script>
