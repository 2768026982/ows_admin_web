<template>
    <div class="mod-log">
        <el-form :inline="true" :model="dataForm">
            <el-form-item>
                <el-input v-model="dataForm.remark" :placeholder="$t('modules.sys.log.form-item-1-input')"
                    clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search()">{{ $t('modules.sys.log.search-btn') }}</el-button>
            </el-form-item>
        </el-form>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[20, 50, 100]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <br />
        <br />

        <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%">
            <el-table-column prop="userName" header-align="center" align="center" width="100"
                :label="$t('modules.sys.log.table-column-1')">
            </el-table-column>
            <el-table-column prop="optName" header-align="center" align="center"
                :label="$t('modules.sys.log.table-column-2')">
            </el-table-column>
            <el-table-column prop="remark" header-align="center" align="center" width="250"
                :show-overflow-tooltip="true" :label="$t('modules.sys.log.table-column-3')">
            </el-table-column>
            <el-table-column prop="ip" header-align="center" align="center" width="150" :show-overflow-tooltip="true"
                :label="$t('modules.sys.log.table-column-6')">
            </el-table-column>
            <el-table-column prop="params" header-align="center" align="center" width="150"
                :show-overflow-tooltip="true" :label="$t('modules.sys.log.table-column-4')">
            </el-table-column>
            <el-table-column prop="insertTime" header-align="center" align="center"
                :label="$t('modules.sys.log.table-column-7')">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[20, 50, 100]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>


<script lang="ts" setup>
import { reactive, ref , onMounted} from 'vue';
import { ElTable } from 'element-plus';
import baseService from '@/service/baseService';

const dataForm = reactive({
    remark: ''
})

const dataList = ref([]);
const pageIndex = ref(1)
const pageSize = ref(20)
const totalPage = ref(0)
const dataListLoading = ref(false)
const selectionDataList = ref([])


// 搜索
const search = () => {
    pageIndex.value = 1;
    getDataList();
}

// 获取数据列表
const getDataList = () => {
    dataListLoading.value = true
    baseService.get('/sys-log/queryPage', {
        page: pageIndex.value,
        limit: pageSize.value,
        remark: dataForm.remark
    }).then((res) => {
        if (res && res.resultCode === 200) {
            dataList.value = res.body.records
            totalPage.value = res.body.totalCount
        } else {
            dataList.value = []
            totalPage.value = 0
        }
        dataListLoading.value = false
    })
}

// 每页数
const sizeChangeHandle = (val: number) => {
    pageSize.value = val,
        pageIndex.value = 1,
        getDataList()
}

// 当前页
const currentChangeHandle = (val: number) => {
    pageIndex.value = val
    getDataList()
}

onMounted(() => {
    getDataList();
})

</script>

<style lang="scss" scoped></style>