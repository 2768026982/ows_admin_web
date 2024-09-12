<!-- 网页管理 -->
<template>
    <!--网页模板绑定-->
    <div>
        <div>
            <el-form ref="dataFormRef" :model="dataForm" label-width="100px">
                <el-row type="flex">
                    <el-col :span="6">
                        <el-form-item :label="$t('modules.official-site.web-master-list.memo')">
                            <el-input v-model="dataForm.memo" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item :label="$t('modules.official-site.web-master-list.isValid')">
                            <el-select v-model="dataForm.isValid" clearable>
                                <el-option :label="$t('modules.official-site.web-master-list.valid')"
                                    value="1"></el-option>
                                <el-option :label="$t('modules.official-site.web-master-list.notValid')"
                                    value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="7">
                        <el-button @click="search()">{{ $t('modules.sys.currency.search-btn') }}</el-button>
                        <!-- @click="search()" -->
                        <el-button type="primary">{{ $t('modules.sys.currency.add-btn') }}</el-button>
                        <!-- @click="goPage()" -->
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--查询列表-->
        <div class="mt-8">
            <el-table :data="tableList" border stripe fit max-height="450" v-loading="dataListLoading"
                style="width: 100%">
                <el-table-column align="center" fixed="left" header-align="center"
                    :label="$t('modules.official-site.web-master-list.table-1')" type="index" width="60">
                </el-table-column>
                <el-table-column align="center" header-align="center"
                    :label="$t('modules.official-site.web-master-list.memo')" prop="memo">
                </el-table-column>
                <el-table-column align="center" header-align="center"
                    :label="$t('modules.official-site.web-master-list.isValid')">
                    <template v-slot="scope">
                        <span v-if="scope.row.isValid == 0">{{ $t('modules.official-site.web-master-list.notValid')
                            }}</span>
                        <span v-else>{{ $t('modules.official-site.web-master-list.valid') }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"
                    :label="$t('modules.official-site.web-master-list.homePage')">
                    <template v-slot="scope">
                        <span v-if="scope.row.homePage == 1">{{ $t('modules.official-site.web-master-list.isHomePage')
                            }}</span>
                        <span v-else>{{ $t('modules.official-site.web-master-list.notHomePage') }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('modules.merchant.base.function')" align="center" fixed="right"
                    min-width="150px">
                    <template v-slot="scope">
                        <!-- <el-button plain type="primary" size="mini" @click="setHomePage(scope.row.webId)"
                            v-if="scope.row.homePage !== '1'">
                            {{ $t('modules.official-site.webTemplateData.setHomePage') }}
                        </el-button> -->
                        <el-button plain type="primary" size="mini" @click="setData(scope.row.webId)">
                            {{ $t('modules.official-site.webTemplateData.setData') }}
                        </el-button>
                        <el-button plain type="primary" size="mini" @click="goPage(scope.row.webId)">
                            {{ $t('modules.sys.currency.table-column-7-update') }}
                        </el-button>
                        <el-button plain type="danger" size="mini" @click="delData(scope.row, scope.$index)">
                            {{ $t('modules.official-site.web-master-list.deleted') }}
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageIndex" :page-size="pageSize" :page-sizes="[20, 50, 100]"
                :size="size" layout="total, sizes, prev, pager, next, jumper" :total="totalPage"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <!-- <webMasterAddOrUpdate ref="webMasterAddOrUpdate" v-if="webMasterAddOrUpdateFlg"
                            @refreshList="search()">
      </webMasterAddOrUpdate> -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, type ComponentSize } from 'element-plus'
import global from "@/utils/global_variable";
import { getWebMasterInfo } from '@/service/web/web-master-list';
import router from '@/router';

const dataFormRef = ref()

const dataForm = reactive({
    memo: '',
    isValid: ''
})

// table所用数据
const tableList = ref([])
const dataListLoading = ref(false)
// const visible = ref(false)
// 分页所用数据
const pageIndex = ref(1)
const pageSize = ref(100)
const totalPage = ref(0)
const currPage = ref()
const size = ref<ComponentSize>('default')

const handleSizeChange = (val: number) => {
    pageSize.value = val;
    pageIndex.value = 1;
    getTableList();

    console.log(`${val} items per page`)
}


const handleCurrentChange = (val: number) => {
    pageIndex.value = val;
    getTableList();

    console.log(`current page: ${val}`)
}

// 获取数据
const getTableList = async () => {

    dataListLoading.value = true;
    let form = global.formatObj(dataForm)



    let params = Object.assign({
        page: pageIndex.value,
        limit: pageSize.value
    }, form);

    try {
        const resData = await getWebMasterInfo();
        if (resData && resData.resultCode === 200) {
            tableList.value = resData.body.list;
            totalPage.value = resData.body.totalCount;
            currPage.value = resData.body.currPage
        }
        else {
            tableList.value = [];
            totalPage.value = 0;
            currPage.value = 0;
        }
        dataListLoading.value = false;
    } catch (error) {
        console.log(error);

    }
}

// 查询
const search = () => {
    pageIndex.value = 1
    getTableList();
}

// 跳转
const goPage = (webId: string) => {
    router.push({
        name: 'official-web-master-add-or-update',
        query: {
            webId: webId
        }
    })
}

// 
const setHomePage = (webId: string) => {
    // let success = $t('modules.official-site.webTemplateData.success') ?
    //               $t('modules.official-site.webTemplateData.success') : '設置首頁成功'
    // .then((data)=>{
    //     if(data && data.resultCode === 200) {
    //         ElMessage.success({
    //             message: success ,
    //             type: 'success' ,
    //             duration: 1500 ,
    //             onClose: () => {
    //                 search()
    //             }
    //         })
    //     }
    // })
}

// 配置数据
const setData = (webId: string) => {
    router.push({
        name:'webTemplateData-list',
        query: {
            webId : webId
        }
    })
}

// 删除
const delData = (row: string, index: number) => {
    // let message = this.$t('modules.merchant.gcp-discount-template.delete-confirm', {
    //     templateName: `${row.memo}`
    //   })
    //     ? this.$t('modules.merchant.gcp-discount-template.delete-confirm', {
    //       templateName: `${row.memo}`
    //     })
    //     : '確定對【' + row.memo + '】進行解綁操作?'
    //   let title = this.$t('modules.sys.currency.delete-title')
    //     ? this.$t('modules.sys.currency.delete-title') : '提示'
    //   let confirm = this.$t('modules.sys.currency.submit-btn')
    //     ? this.$t('modules.sys.currency.submit-btn') : '確定'
    //   let cancel = this.$t('modules.sys.currency.cancel-btn')
    //     ? this.$t('modules.sys.currency.cancel-btn') : '取消'
    //   let success = this.$t('modules.sys.currency.delete-success')
    //     ? this.$t('modules.sys.currency.delete-success') : '操作成功'

    // ElMessageBox.confirm(message , title , {
    //     confirmButtonText: confirm,
    //     cancelButtonText: cancel,
    //     type: 'warning'
    // }).then((data) => {
    //     if(data && data.resultCode === 200) {
    //         ElMessage({
    //             message: success ,
    //             type: 'success',
    //             duration : 1500
    //         })
    //         search()
    //     }
    // }).catch(()=>{})
}

onMounted(() => {
    getTableList();
})
</script>

<style scoped></style>
