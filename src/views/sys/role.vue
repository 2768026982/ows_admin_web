<template>
  <div class="mod-role">
    <el-form :inline="true" :model="dataForm" @keyup.enter="search()">
      <el-form-item>
        <el-input v-model="dataForm.roleName" :placeholder="$t('modules.sys.role.form-item-1')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search()">{{ $t('modules.sys.role.form-item-2-search-btn') }}</el-button>
        <el-button type="primary"
          @click="addOrUpdateHandle()">{{ $t('modules.sys.role.form-item-2-save-btn') }}</el-button>
        <!--<el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量刪除</el-button>-->
      </el-form-item>
    </el-form>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[20, 50, 100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column type="index" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column v-if="showCol" prop="roleId" header-align="center" align="center" width="80" label="ID">
      </el-table-column>
      <el-table-column prop="roleName" header-align="center" align="center"
        :label="$t('modules.sys.role.table-column-1')">
      </el-table-column>
      <el-table-column prop="deptName" header-align="center" align="center"
        :label="$t('modules.sys.role.table-column-2')">
      </el-table-column>
      <el-table-column prop="visibleBranches" header-align="center" align="center"
        :label="$t('modules.sys.role.table-column-3')" v-if="showVisibleBranches">
        <template v-slot="scope">
          <el-tag type="success"
            v-if="scope.row.visibleBranches === '1'">{{ $t('modules.sys.role.table-column-3-visible') }}</el-tag>
          <el-tag type="danger" v-else>{{ $t('modules.sys.role.table-column-3-not-visible') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" header-align="center" align="center"
        :label="$t('modules.sys.role.table-column-4')">
        <template v-slot="scope">
          <el-tag type="success"
            v-if="scope.row.participateAudit === '1'">{{ $t('modules.sys.role.table-column-4-yes') }}</el-tag>
          <el-tag type="danger" v-else>{{ $t('modules.sys.role.table-column-4-no') }}</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="remark"-->
      <!--header-align="center"-->
      <!--align="center"-->
      <!--label="备注">-->
      <!--</el-table-column>-->
      <el-table-column prop="insertTime" header-align="center" align="center" width="180"
        :label="$t('modules.sys.role.table-column-5')">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="200"
        :label="$t('modules.sys.role.table-column-6')">
        <template v-slot="scope">
          <el-button type="text" size="small"
            @click="addOrUpdateHandle(scope.row.roleId)">
            {{ $t('modules.sys.role.table-column-6-update') }}</el-button>
          <el-button type="text" size="small"
            @click="deleteHandle(scope.row.roleId, scope.row.roleName)">
            {{ $t('modules.sys.role.table-column-6-delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[20, 50, 100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
  </div>
</template>

<script setup lang="ts">
import { getEnterPriseInfo } from '@/service/sys/enterprise';
import { getList } from '@/service/sys/role';
import { nextTick, onActivated, ref } from 'vue';
// 数据
let dataForm = ref({
  roleName: ''
});
let dataList = ref([]);
let pageIndex = ref(1);
let pageSize = ref(20);
let totalPage = ref(0);
let dataListLoading = ref(false);
let dataListSelections = ref([]);
let addOrUpdate = ref<any>();
let addOrUpdateVisible = ref(false);
let showCol = ref(false);
let showVisibleBranches = ref(false);
// 获取数据
const getDataList = async () => {
  dataListLoading.value = true;

  try {
    const data = await getList({
      page: pageIndex.value,
      limit: pageSize.value,
      roleName: dataForm.value.roleName
    });
    if (data && data.resultCode === 200) {
      dataList.value = data.body.records;
      totalPage.value = data.body.totalCount;
      const resData = await getEnterPriseInfo();
      if (resData && resData.resultCode === 200) {
        showVisibleBranches.value = data.body.level === "1";
      }
    } else {
      dataList.value = [];
      totalPage.value = 0;
    }
    dataListLoading.value = false;
  } catch (error) {
    console.log(error);
  }
}
// 检索事件
const search = () => {
  pageIndex.value = 1;
  getDataList();
}
// 每页数
const sizeChangeHandle = (val: number) => {
  pageSize.value = val;
  pageIndex.value = 1;
  getDataList();
}
// 当前页
const currentChangeHandle = (val: number) => {
  pageIndex.value = val;
  getDataList();
}
// 多选
const selectionChangeHandle = (val) => {
  dataListSelections = val;
}
// 新增 / 修改
const addOrUpdateHandle = (id?: number) => {
  addOrUpdateVisible.value = true;
  // nextTick(() => addOrUpdate.init(id));
}
// 刪除
const deleteHandle = (id: number, roleName: string) => {
  // var ids = id ? [id] : dataListSelections.value.map(item: any => item.roleId)

  // let message = this.$t('modules.sys.role.delete-confirm', { roleName: `${roleName}`, id: `${id ? '刪除' : '批量刪除'}` }) ?
  //   this.$t('modules.sys.role.delete-confirm', { roleName: `${roleName}`, id: `${id ? '刪除' : '批量刪除'}` }) :
  //   `確定對[角色名稱為${roleName}]進行[${id ? '刪除' : '批量刪除'}]操作?`;
  // let title = this.$t('modules.sys.role.delete-title') ?
  //   this.$t('modules.sys.role.delete-title') : "提示";
  // let confirm = this.$t('modules.sys.role.confirmButtonText') ?
  //   this.$t('modules.sys.role.confirmButtonText') : "確定";
  // let cancel = this.$t('modules.sys.role.cancelButtonText') ?
  //   this.$t('modules.sys.role.cancelButtonText') : "取消";
  // let success = this.$t('modules.sys.role.delete-success') ?
  //   this.$t('modules.sys.role.delete-success') : "操作成功";
}
// 生命周期
onActivated(() => getDataList());
</script>

<style scoped></style>