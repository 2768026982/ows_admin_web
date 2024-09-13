<template>
    <div class="basic member">
        <div>
            <el-form :model="dataForm" @keyup.enter.native="search()" label-width="180px">
                <el-row type="flex" :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('modules.official-site.webTemplate.templateName')">
                            <el-input v-model="dataForm.tmpName" placeholder="" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('modules.official-site.webTemplate.status')">
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


        <div class="mt-8">
            <el-table :data="dataList" border stripe fit v-loading="dataListLoading" class="table_style"
                style="width: 100%;">
                <el-table-column header-align="center" align="center" fixed="left" type="index" width="60"
                    :label="$t('modules.official-site.webTemplate.no')">
                    <template v-slot="scope">
                        {{ pageSize * (pageIndex - 1) + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="templateName" header-align="center" align="center"
                    :label="$t('modules.official-site.webTemplate.templateName')">
                </el-table-column>
                <el-table-column prop="status" header-align="center" align="center"
                    :label="$t('modules.official-site.webTemplate.status')">
                    <template v-slot="scope">
                        <el-switch v-model="scope.row.isValid" active-color="#13ce66" inactive-color="#c7c7c7"
                            active-value="1" inactive-value="0"
                            @change="changeVal(scope.row.templateId, scope.row.isValid)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center"
                    :label="$t('modules.official-site.webTemplate.operate')">
                    <template v-slot="scope">
                        <el-button plain type="danger" size="small"
                            @click="deleteTemplate(scope.row.templateId, scope.row.templateName)">
                            {{ $t('common.button.delete') }}
                        </el-button>
                        <el-button plain type="primary" size="small" @click="updateTemplate(scope.row.templateId)">
                            {{ $t('common.button.edit') }}
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


<script lang="ts" setup>
import router from '@/router';
import { getWebTemplateDel, getWebTemplateList, postWebTemplateStatus } from '@/service/web/web-template-list';
import { WebTemplateModelItem } from '@/types/sys';
import { ElMessage, ElMessageBox } from 'element-plus';
import { template } from 'lodash';
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n()

const dataForm = reactive({
    tmpName: '',
    isValid: ''
})

const dataList = ref([])
const pageIndex = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)
const dataListLoading = ref(false)

const stateList: WebTemplateModelItem[] = [
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
const getDataList = async () => {
    dataListLoading.value = true;

    try {
        let params = {
            ...dataForm,
            page: pageIndex.value,
            limit: pageSize.value,
        }
        const data = await getWebTemplateList(params)
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

// 每頁數
const sizeChangeHandle = (val: number) => {
    pageSize.value = val
    pageIndex.value = 1
    getDataList()
}
// 當前頁
const currentChangeHandle = (val: number) => {
    pageIndex.value = val
    getDataList()
}

// 添加
const add = () => {
    router.push({
        name: 'webTemplate-addOrUpdate',
        query: {}
    })
}

// 更新
const updateTemplate = (id: string) => {
    router.push({
        name: 'webTemplate-addOrUpdate',
        query: {
            id: id
        }
    })
}

// 删除
const deleteTemplate = async (id: string, name: string) => {
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
        const data = await getWebTemplateDel()
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

// 改变状态
const changeVal = async (id: string, status: string) => {
    let newForm = {
        templateId: id,
        status: status,
    }
    const data = await postWebTemplateStatus(newForm)
    if (data && data.resultCode === 200) {
        let success = t('modules.official-site.webTemplate.reqSuccess');
        ElMessage({
            message: success ? success : '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
                getDataList()
            }
        })
    }
}

onMounted(() => {
    getDataList();
})
</script>

<style></style>