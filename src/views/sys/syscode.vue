<template>
    <div class="mod-sys__code">
        <el-form :inline="true" :model="dataForm">
            <el-form-item>
                <el-input v-model="keyworld" style="width: 240px" :placeholder= "$t('modules.sys.syscode.form-item-1-input')" clearable/>
                <el-button type="info" @click="search()">{{ $t("modules.sys.syscode.search-btn") }}</el-button>
                <el-button type="primary"
                    @click="addOrUpdateHandle('','','',0)">{{ $t("modules.sys.syscode.save-btn-1") }}</el-button>
                <el-button type="primary"
                    @click="addOrUpdateHandle('','','',1)">{{ $t("modules.sys.syscode.save-btn-2") }}</el-button>
            </el-form-item>
        </el-form>

        <br>
        <br>

        <div class="syscode__content">
            <el-table v-loading="dataListLoading" :data="dataList" row-key="codeId" style="width: 100%;">
                <el-table-column type="selection" />
                <el-table-column property="type" :label="$t('modules.sys.syscode.table-column-1')" />
                <el-table-column property="code" :label="$t('modules.sys.syscode.table-column-2')" />
                <el-table-column property="nameKey" :label="$t('modules.sys.syscode.table-column-3')" />
                <el-table-column :label="$t('modules.sys.syscode.table-column-4')">
                    <template #default="scope">
                        <el-button size="small" @click="addOrUpdateHandle(scope.row.type, scope.row.code , scope.row.nameKey , 1)">
                            {{$t("modules.sys.syscode.table-column-4-update")}}
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.type, scope.row.code , scope.row.nameKey)">
                            {{$t("modules.sys.syscode.table-column-4-delete")}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="demo-pagination-block">
    
    <el-pagination
      v-model:curr-page="currPage"
      v-model:page-size="pageSize"
      v-model:total="totalCount"
      :page-sizes="[20, 50, 100]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

        <!-- 彈窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script lang="ts" setup>
import type { ComponentSize } from 'element-plus'
import { ElTable , ElMessageBox , ElMessage} from 'element-plus'
import { ref, nextTick, onMounted , reactive } from 'vue'
import baseService from "@/service/baseService"
import AddOrUpdate from './syscode-add-or-update.vue'
import { status } from 'nprogress'
import {useI18n} from "vue-i18n";
const {t} = useI18n()

const dataForm = ref({})
const addOrUpdateRef = ref();
const addOrUpdateVisible = ref(false)
const keyworld = ref('')
const currPage = ref()
const pageSize = ref(20)
const totalCount = ref()
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const pageIndex = ref()

const handleSizeChange = (val: number) => { 
    pageSize.value = val
    
    getDataList()
}
const handleCurrentChange = (val: number) => {
    currPage.value = val
  
    getDataList()
}
// 搜索所用的词
interface SearchList {
    词种类型: string
    词种编码: string
    词种key: string
    操作: string
}

// 删除
const handleDelete = (type : string , code : string , nameKey : string ) => {
    let message = `確定對${type}${code}${nameKey}進行刪除操作?`;
    let title = t('modules.sys.syscode.delete-title')?
                t('modules.sys.syscode.delete-title'):"提示";
    let confirm = t('modules.sys.syscode.confirmButtonText')?
                  t('modules.sys.syscode.confirmButtonText'):"確定";
    let cancel = t('modules.sys.syscode.cancelButtonText')?
                 t('modules.sys.syscode.cancelButtonText'):"取消";
    let success = t('modules.sys.syscode.delete-success')?
                  t('modules.sys.syscode.delete-success'):"操作成功";

    ElMessageBox.confirm(message,title,{
    confirmButtonText: confirm,
    cancelButtonText:cancel,
    type:'warning'
  }).then(()=>{
    baseService.post('/generator/syscode/delete' ,{
        'typeOrg' : type , 
        'codeOrg' : code  ,
        'nameKeyOrg' : nameKey , 
    })
      .then((res)=>{
        if (res && res.resultCode === 200){
          ElMessage.success({
            duration:1500,
            message: success,
            onClose:()=>{
                if(dataList.value.length === 1 && pageIndex.value > 1) {
                    pageIndex.value--;
                }
              getDataList()
            }
          })
        }
      })
  }).catch(()=>{})

}

// 获取数据列表
const dataList = ref()
const dataListLoading = ref(false)
// 分页数据
const getDataList=()=>{
    dataListLoading.value = true 
    baseService.get('generator/syscode/list' , {
        page : currPage.value,
        limit : pageSize.value,
        total : totalCount.value,
        key : keyworld.value
    }).then((res)=>{
        dataList.value=res.body.records
        dataListLoading.value=false
        totalCount.value = res.body.totalCount
        // pageSize.value = res.body.pageSize
        currPage.value = res.body.currPage
    })
}

// 新增 / 修改
const addOrUpdateHandle = (type : string , code : string , nameKey : string , addType : number) => {
  addOrUpdateVisible.value = true
  nextTick(()=>{
    addOrUpdateRef.value.init(type, code, nameKey, addType);
  })
}


// 查询
const search = () => {
  currPage.value = 1
  getDataList();      

}

onMounted(() => {
    getDataList();
})


</script>


<style lang="scss" scoped>
button {
    margin-left: 20px;
}

.sys__content>.el-table {
    border: 1px, solid #f0f0f0
}

.el-table {
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #6B6B6B;
}

</style>
