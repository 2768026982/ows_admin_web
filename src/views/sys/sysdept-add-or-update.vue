<template>
  <el-dialog
    :title="!dataForm.id ? t('modules.sys.sysdept-add-or-update.save') : t('modules.sys.sysdept-add-or-update.update')"
    :close-on-click-modal="false" v-model="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataFormRef" @keyup.enter.native="dataFormSubmit()"
      label-width="23%">
      <el-form-item :label="t('modules.sys.sysdept-add-or-update.form-item-1')" prop="name">
        <el-input v-model.trim="dataForm.name"
          :placeholder="t('modules.sys.sysdept-add-or-update.form-item-1-input')"></el-input>
      </el-form-item>
      <el-form-item :label="t('modules.sys.sysdept-add-or-update.form-item-2')" prop="deptNameKey">
        <el-input :placeholder="t('modules.sys.sysdept-add-or-update.form-item-2-input')"
          v-model.trim="dataForm.deptNameKey">
          <el-button slot="append" @click="setBusinessCode()" :disabled="!dataForm.deptNameKey">{{
            t('modules.sys.sysdept-add-or-update.form-item-2-btn') }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item :label="t('modules.sys.sysdept-add-or-update.form-item-3')" prop="parentName">
        <el-popover ref="deptListPopover" :disabled="dataForm.disabled" placement="bottom-start" trigger="click">
          <el-tree :data="deptList" :props="deptListTreeProps" node-key="deptId" ref="deptListTreeRef"
            @current-change="deptListTreeCurrentChangeHandle" :default-expand-all="true" :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:deptListPopover :readonly="true"
          :placeholder="t('modules.sys.sysdept-add-or-update.form-item-3-input')" class="dept-list__input"
          :disabled="dataForm.disabled"></el-input>
      </el-form-item>
      <el-form-item :label="t('modules.sys.sysdept-add-or-update.form-item-4')" prop="orderNum">
        <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0"
          :label="t('modules.sys.sysdept-add-or-update.form-item-4-input')"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ t('modules.sys.sysdept-add-or-update.cancel-btn') }}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-re-click>{{
        t('modules.sys.sysdept-add-or-update.submit-btn') }}</el-button>
    </span>

  </el-dialog>
</template>


<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
// import SysCodeAddOrUpdate from './syscode-add-or-update.vue'
import { treeDataTranslate } from '@/utils/utils';
import { useI18n } from "vue-i18n";
import baseService from '@/service/baseService';
// import useStore from 'element-plus/es/components/table/src/store';
import { ElMessage } from 'element-plus';

import { useAppStore } from "@/store";

const { t } = useI18n();
const store = useAppStore();
const user = computed(() => store.state.user);

const visible = ref(false)
const dataFormRef = ref()
const dataForm = reactive({
  deptId: 0,
  id: '',
  parentId: 0,
  parentName: '',
  name: '',
  orderNum: 0,
  disabled: false,
  deptNameKey: '',
  contentList: [],
  pcItemId: '',
  itemType: '',
  functionCode: '',
})

const dataRule = reactive({
  name: [
    { required: true, message: t('modules.sys.sysdept-add-or-update.dataRule-name'), trigger: 'blur' }
  ],
  parentName: [
    { required: true, message: t('modules.sys.sysdept-add-or-update.dataRule-parentName'), trigger: 'change' }
  ]
})

const deptList = ref<any>([])
const deptListTreeProps = reactive({
  label: 'name',
  children: 'children'
})
const addOrUpdateVisible = ref(false)

const init = (id: any) => {
  dataForm.id = id || ''
  baseService.get('/sys/sysdept/select')
    .then((data) => {
      deptList.value = treeDataTranslate(data.body.records, 'deptId')
    })
    .then(() => {
      visible.value = true
      nextTick(() => {
        // dataFormRef.value.resetFields()
        dataForm.pcItemId = ''
      })
    })
    .then(() => {
    console.log(user.value)
      if (!dataForm.id) {

        dataForm.disabled = false
        if(user.value.deptId){
          baseService.get(`/sys/sysdept/info/${user.value.deptId}`)
          .then((data) => {
            dataForm.parentId = data.body.deptId
            deptListTreeSetCurrentNode()
          })
        }

      } else {
        // 修改
        console.log('修改')
        dataForm.disabled = false
        baseService.get(`/sys/sysdept/info/${dataForm.id}`)
          .then((data) => {
            dataForm.id = data.body.deptId
            dataForm.name = data.body.name
            dataForm.parentId = data.body.parentId
            dataForm.orderNum = data.body.orderNum
            dataForm.contentList = data.body.contentList
            dataForm.deptNameKey = data.body.deptNameKey
            dataForm.pcItemId = data.body.pcItemId
            dataForm.functionCode = data.body.functionCode
            dataForm.itemType = data.body.itemType
            deptListTreeSetCurrentNode()
            if (data.body.parentId === "0") {
              dataForm.parentName = t('modules.sys.sysdept-add-or-update.parentId-zero')
              dataForm.disabled = true
            }
          })
      }
    })
}

// 部门树选中
const deptListTreeCurrentChangeHandle = (data: any) => {
  dataForm.parentId = data.deptId
  dataForm.parentName = data.name
}

// 树设置当前选中的节点
const deptListTreeRef = ref()
const deptListTreeSetCurrentNode = () => {
  // deptListTreeRef.value.setCurrentKey(dataForm.parentId)
  // const currentNode = (deptListTreeRef.value.getCurrentNode() || {})
  // dataForm.parentName = currentNode.name
}

// 表单提交
const dataFormSubmit = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (valid) {
      baseService.post(`/sys/sysdept/${!dataForm.id ? 'save' : 'update'}`, {
        roleId: dataForm.id || undefined,
        parentId: dataForm.parentId,
        name: dataForm.name,
        orderNum: dataForm.orderNum,
        contentList: dataForm.contentList,
        deptNameKey: dataForm.deptNameKey,
        // 新增时没有pcItemId
        pcItemId: !dataForm.id ? '' : dataForm.pcItemId,
      })
        .then((data) => {
          if (data && data.resultCode === 200) {
            ElMessage({
              message: t('modules.sys.sysdept-add-or-update.submit-success'),
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

// 设置nameKey
const sysCodeAddOrUpdateRef = ref()
const setBusinessCode = () => {
  addOrUpdateVisible.value = true
  nextTick(() => {
    sysCodeAddOrUpdateRef.value.init(dataForm.pcItemId , dataForm.functionCode
      ,dataForm.itemType , dataForm.deptNameKey,"/sys/language/content/infoByParam"
    )
  })
}

// const setContentList = (obj:object) => {
//   let that =
//   let lis
// }

onMounted(() => {

})
function emit(arg0: string) {
  throw new Error('Function not implemented.');
}
defineExpose({
  init
});
</script>

<style lang="scss" scoped></style>
