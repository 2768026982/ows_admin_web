<template>
  <div>
    <div>
      <el-form :model="dataForm" label-width="80px" ref="dataFormRef" :inline="true">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="參數名稱" prop="paramName">
              <el-input v-model="dataForm.paramName" style="width: 240px" clearable></el-input>
            </el-form-item>
          </el-col>



          <el-col :span="7" class="ml-6">
            <el-button @click="getTableList(1)" type="info">查詢</el-button>
            <el-button @click="addData('' , '' , '' , '')" type="primary" >新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 查詢列表 -->
    <div>
      <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[20, 50, 100]" :total="totalPage"
        @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <br>
      <br>
      <br>
      <el-table :data="tableList" border class="list-table" stripe
        style="width: 100%;border-top: 1px solid #F0F0F0;border-left: 1px solid #F0F0F0;" v-loading="dataListLoading">
        <el-table-column align="center" fixed="left" header-align="center" label="序號" type="index" width="60">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="項目名稱" prop="projectName">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="參數名稱" prop="paramName">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="參數值" width="220">
          <template #default="scope">
            <el-input v-model="scope.row.paramValue"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="説明" width="240">
          <template #default="scope">
            <el-input v-model="scope.row.title"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button @click="updateData(scope.$index)" plain size="mini" type="primary" v-re-click>修改
            </el-button>
            <el-button @click="deleteRow(scope.$index)" plain size="mini" type="danger" v-re-click>刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <br>
      <br>
      <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[20, 50, 100]" :total="totalPage"
        @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <add v-if="addVisible" @addSuccess="addSuccess" ref="paramsSettingAddRef"></add>  
  </div>
</template>

<script lang="ts" setup>

import baseService from '@/service/baseService';
import add from './params-setting-add.vue';
import { ref, reactive, onMounted, computed, onActivated, nextTick } from 'vue';
import { ElTable, ElMessageBox, ElMessage , ComponentSize ,ElInput} from 'element-plus'
import { Model } from 'echarts';
// import { useStore } from 'vuex';




const dataForm = reactive({
  // 项目名称
  projectName: "",
  // 参数名称
  paramName: ""
})


// const basicProp = $store.state.basic.prop

// const store = useStore();
// const basicProp = computed(()=>store.state.basic.prop);

// 使用 ref 或 reactive 定义 tableList，并指定其类型
const tableList = ref<TableListItem[]>([]);
const pageIndex = ref()
const pageSize = ref()
const totalPage = ref()
const dataListLoading = ref(false)
// 项目名称
const projectNameList = ref({})
const currPage = ref()
const keyworld = ref('')
const addVisible = ref(false)
const paramsSettingAddRef = ref();




const getTableList = (page: number) => {
  dataListLoading.value = true
  const params = Object.assign({
    page: page == undefined ? pageIndex.value : page,
    limit: pageSize.value,
  } , dataForm);
  
  baseService.get('sys/commonparamsetting/getList', params)
    .then((res) => {
      if (res && res.resultCode === 200) {
        tableList.value = [],
          tableList.value = res.body.records,
          totalPage.value = res.body.totalCount,
          pageSize.value = res.body.pageSize,
          pageIndex.value = res.body.currPage,
          dataListLoading.value = false;
      }
    })
}

// 每页数
const sizeChangeHandle = (val: number) => {
  pageSize.value = val,
    pageIndex.value = 1,
    getTableList(val);
}

// 当前页
const currentChangeHandle = (val: number) => {
  pageIndex.value = val,
    getTableList(val);
}

// 新增 / 编辑
const updateData = (index: number) => {
  let params = tableList.value[index]
  baseService.post(`sys/commonparamsetting/update`, params)
    .then((res) => {
      if (res && res.resultCode === 200) {
        ElMessage.success({
          message: '保存成功',
          type: 'success',
          duration: 1500,
        })
      }
    })
  getTableList(index);
}

// 删除
interface TableListItem {
  value: any; // 根据实际情况定义 value 的类型
}


const deleteRow = (index: number) => {
  let indexNew = index + 1;
  ElMessageBox.confirm('確定對【序號：' + indexNew + '】進行刪除操作?', '提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 确保 tableList[index] 存在
    if (tableList.value[index]) {
      let params = tableList.value[index].value;
      baseService.post(`sys/commonparamsetting/delete`, params)
        .then((res) => {
          if (res && res.resultCode === 200) {
            ElMessage.success({
              duration: 1500,
              type: 'success',
              message: '删除成功',
            });
            getTableList(index);
          }
        });
    }
  }).catch(() => {
    // 可以在这里处理取消操作或其他错误处理
  });
}

// 获取项目名称
const getProjectName = () => {
  baseService.get(`sys/commonparamsetting/selectProjectName`, {

  }).then((res) => {
    if (res && res.resultCode === 200) {
      projectNameList.value = res.body.projectNameList
    }
  })
}

// 新增参数设定
const addData = (projectName : string , paramName : string , param : string , content : string) => {
  addVisible.value = true ;
  nextTick(()=>{
    if(paramsSettingAddRef.value) {
      paramsSettingAddRef.value.init(projectName , paramName , param , content);
    }
  })
}


const addSuccess = () => {
  getTableList(1);
  getProjectName();
}

onMounted(() => {
  // 获取项目名称
  getProjectName();
  // 获取表格列表
  getTableList(1);
})



</script>

<style lang="scss" scoped></style>

<!-- 定义getTableList的时候，因为有参数page存在，所以每次调用都要传参 
   注释的那句，网上说要导入vuex  import { useStore } from 'vuex'; 
-->