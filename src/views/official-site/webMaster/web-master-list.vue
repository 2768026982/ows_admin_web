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

                        <el-button type="primary" @click="addOrUpdateHandle(webId)">{{
                            $t('modules.sys.currency.add-btn') }}</el-button>


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
                        <!-- <el-button plain type="primary" size="small" @click="setHomePage(scope.row.webId)"
                            v-if="scope.row.homePage !== '1'">
                            {{ $t('modules.official-site.webTemplateData.setHomePage') }}
                        </el-button> -->
                        <el-button plain type="primary" size="small" @click="setData(scope.row.webId)">
                            {{ $t('modules.official-site.webTemplateData.setData') }}
                        </el-button>
                        <el-button plain type="primary" size="small" @click="addOrUpdateHandle(scope.row.webId)">
                            {{ $t('modules.sys.currency.table-column-7-update') }}
                        </el-button>
                        <el-button plain type="danger" size="small" @click="delData(scope.row, scope.$index)">
                            {{ $t('modules.official-site.web-master-list.deleted') }}
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageIndex" :page-size="pageSize" :page-sizes="[20, 50, 100]"
                :size="size" layout="total, sizes, prev, pager, next, jumper" :total="totalPage"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <webMasterAddOrUpdate ref="webMasterAddOrUpdateRef" v-if="webMasterAddOrUpdateFlg" @refreshList="search()" prop="isAdd">
        </webMasterAddOrUpdate>

        <list ref="listRef" v-if="listVisible" @refreshList="setData">
        </list>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, ComponentSize } from 'element-plus'
import global from "@/utils/global_variable";
import { getMasterDel, getMasterSetHomepage, getWebMasterInfo } from '@/service/web/web-master-list';
import router from '@/router';
import { useRoute } from 'vue-router';
import webMasterAddOrUpdate from './web-master-add-or-update.vue';
// import list from 'src\views\official-site\webTemplateData\list.vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n()

const dataFormRef = ref()
const webMasterAddOrUpdateFlg = ref(false)
const dataForm = reactive({
    memo: '',
    isValid: ''
})

const route = useRoute();
const webId = route.query.webId

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
    let form = global.formatObj(dataForm)
    dataListLoading.value = true;
    let params = Object.assign({
        page: pageIndex.value,
        limit: pageSize.value
    }, form);

    try {
        const resData = await getWebMasterInfo(params);
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

// 新增 / 修改
const webMasterAddOrUpdateRef = ref()
const addOrUpdateHandle = (webId: any) => {
    webMasterAddOrUpdateFlg.value = true;
    nextTick(() => {
        if (webMasterAddOrUpdateRef.value && webMasterAddOrUpdateRef.value.init) {
            // 判断是新增还是修改
            const isAdd = !webId;
            webMasterAddOrUpdateRef.value.init(webId , isAdd);
        } else {
            ElMessage.error('error2');
        }
    })
}
// 
const setHomePage = async (webId: any) => {
    let success = t('modules.official-site.webTemplateData.success') ?
        t('modules.official-site.webTemplateData.success') : '設置首頁成功'
    const data = await getMasterSetHomepage(webId)
    if (data && data.resultCode === 200) {
        ElMessage({
            message: success,
            type: 'success',
            duration: 1500,
            onClose: () => {
                search()
            }
        })
    }
}

// 配置数据
const listRef = ref()
const listVisible = ref(false)
const setData = (webId: string) => {
    listVisible.value = true;
    nextTick(() => {
        if (listRef.value && listRef.value.init) {
            listRef.value.init(webId)
        }
    })
}

// 删除
const delData = (row: { memo: string, webId: any }, index: number) => {
    let message = t('modules.merchant.gcp-discount-template.delete-confirm', {
        templateName: `${row.memo}`
    })
        ? t('modules.merchant.gcp-discount-template.delete-confirm', {
            templateName: `${row.memo}`
        })
        : '確定對【' + row.memo + '】進行解綁操作?'
    let title = t('modules.sys.currency.delete-title')
        ? t('modules.sys.currency.delete-title') : '提示'
    let confirm = t('modules.sys.currency.submit-btn')
        ? t('modules.sys.currency.submit-btn') : '確定'
    let cancel = t('modules.sys.currency.cancel-btn')
        ? t('modules.sys.currency.cancel-btn') : '取消'
    let success = t('modules.sys.currency.delete-success')
        ? t('modules.sys.currency.delete-success') : '操作成功'

    ElMessageBox.confirm(message, title, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        type: 'warning'
    }).then(async () => {
        const data = await getMasterDel(row.webId)
        if (data && data.resultCode === 200) {
            ElMessage({
                message: success,
                type: 'success',
                duration: 1500
            })
            search()
        }
    }).catch(() => { })
}


onMounted(() => {
    search();
    getTableList();
})
</script>

<style scoped></style>

<!-- 
    1.import list 这行如果打开页面就加载不出来
    2.add-or-update 我现在能弹出来，但是新增和修改应该不一样，可我没办法区别他俩
    3.search按钮不好用
-->
