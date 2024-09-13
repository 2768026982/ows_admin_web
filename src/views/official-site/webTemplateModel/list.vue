<template>
    <div class="basic member">
        <div>
            <el-form :model="dataForm" @keyup.enter.native="search()" label-width="180px">
                <el-row type="flex" :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('modules.official-site.webTemplateModel.modelName')">
                            <el-input v-model="dataForm.modName" placeholder="" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('modules.official-site.webTemplateModel.status')">
                            <el-select v-model="dataForm.isValid" clearable>
                                <el-option v-for="item in stateList" :key="item.ID" :label="item.text" :value="item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="end">
                    <el-form-item style="text-align: right;">
                        <el-button @click="search()">{{ $t('common.button.search') }}</el-button>
                        <el-button type="primary" @click="add()">{{ $t('common.button.add') }}</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>


        <!--查询列表-->
        <div class="mt-8">
            <el-table :data="dataList" border stripe fit v-loading="dataListLoading" class="table_style"
                style="width: 100%;">
                <el-table-column header-align="center" align="center" fixed="left" type="index" width="60"
                    :label="$t('modules.official-site.webTemplateModel.no')">
                    <template v-slot="scope">
                        {{ pageSize * (pageIndex - 1) + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="modName" header-align="center" align="center"
                    :label="$t('modules.official-site.webTemplateModel.modelName')">
                </el-table-column>
                <el-table-column prop="status" header-align="center" align="center"
                    :label="$t('modules.official-site.webTemplateModel.status')">
                    <template v-slot="scope">
                        <el-switch v-model="scope.row.isValid" active-color="#13ce66" inactive-color="#c7c7c7"
                            active-value="1" inactive-value="0" @change="changeVal(scope.row.modId, scope.row.isValid)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center"
                    :label="$t('modules.official-site.webTemplateModel.operate')">
                    <template v-slot="scope">
                        <el-button plain type="danger" size="small"
                            @click="deleteTemplate(scope.row.modId, scope.row.modName)">
                            {{ $t('common.button.delete') }}
                        </el-button>
                        <el-button plain type="primary" size="small" @click="updateTemplate(scope.row.modId)">
                            {{ $t('common.button.edit') }}
                        </el-button>
                        <el-button plain type="primary" size="small" @click="copyAdd(scope.row.modId)">
                            {{ $t('common.button.copy') }}
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { getWebTemplateModelDel, getWebTemplateModelList, postWebTemplateModelStatus } from '@/service/web/web-template-model';
import { WebTemplateModelItem } from '@/types/sys';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n()

const dataForm = reactive({
    tmpName: '',
    isValid: '',
    modName: ''
})

const dataList = ref([])
const pageIndex = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)
const dataListLoading = ref(false)

const stateList: WebTemplateModelItem[] =
    [
        {
            ID: "1",
            text: t("modules.official-site.common.enable"),
        },
        {
            ID: "0",
            text: t("modules.official-site.common.disable"),
        }
    ]


// 搜索
const search = () => {
    pageIndex.value = 1;
    getDataList();
}

// 获取数据列表
const getDataList = async () => {                          //async添加的合适么
    dataListLoading.value = true;

    try {
        const params = {
            ...dataForm,
            page: pageIndex.value,
            limit: pageSize.value
        }
        const data = await getWebTemplateModelList(params);
        if (data && data.resultCode === 200) {
            dataList.value = data.body.list
            totalPage.value = data.body.totalCount
        }

    } catch (error) {
        console.log(error);
    } finally {
        dataListLoading.value = false;
    }
}

//每页数
const sizeChangeHandle = (val: number) => {
    pageSize.value = val
    pageIndex.value = 1
    getDataList()
}

// 当前页
const currentChangeHandle = (val: number) => {
    pageIndex.value = val
    getDataList()
}

const add = () => {
    router.push({
        name: 'webTemplateModel-addOrUpdate',
        query: {

        }
    })
}

const updateTemplate = (id: string) => {
    router.push({
        name: 'webTemplateModel-addOrUpdate',
        query: {
            id: id
        }
    })
}

const copyAdd = (id: string) => {
    router.push({
        name: 'webTemplateModel-copyAdd',
        query: {
            id: id
        }
    })
}

// 删除
const deleteTemplate = (id: string, name: string) => {
    let msg = t("modules.official-site.common.deleteMsg", { title: name });
    let title = t("main-content.tips-title");
    let confirm = t("main-content.tips-confirmButtonText");
    let cancel = t("main-content.tips-cancelButtonText");
    ElMessageBox.confirm(
        msg ? msg : `Confirm to delete ${name}?`,
        title ? title : "Hint",
        {
            confirmButtonText: confirm ? confirm : "Confirm",
            cancelButtonText: cancel ? cancel : "Cancel",
            type: 'warning'
        }
    ).then(async () => {
        const data = await getWebTemplateModelDel()
        if (data && data.resultCode === 200) {
            ElMessage({
                message: t("modules.official-site.common.deleteSuccess"),
                type: 'success',
                duration: 1500,
                onClose: () => {
                    getDataList()
                }
            })
        }

    })
}

//改变状态
const changeVal = async (id: string, status: string) => {
    let newForm = reactive({
        modId: id,
        status: status,
    })
    const data = await postWebTemplateModelStatus(newForm)
    if (data && data.resultCode === 200) {
        let success = t('modules.official-site.webTemplateModel.reqSuccess');
        ElMessage({
            message: success ? success : '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
                getDataList();
            }
        })
    }
}

onMounted(() => {
    getDataList();
})
</script>

<style scoped></style>