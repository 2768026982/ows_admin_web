<template>
    <el-dialog
     @back="goPage('official-site-webTemplate/list')"
    :title="$t('common.pageHead.back')"
    :close-on-click-modal="false" modal-append-to-body v-model="visible">
        <div class="basic member">
            <!-- <el-page-header class="mb-8" @back="goPage('official-site-webTemplate/list')"
                :title="$t('common.pageHead.back')"
                :content="dataForm.templateId ? $t('modules.official-site.webTemplate.templateUpdate') : $t('modules.official-site.webTemplate.templateAdd')"></el-page-header> -->
            <el-form ref="blogForm" :model="dataForm" :rules="formRules" class="pl-5 pr-5" label-position="left"
                label-width="160px">
                <el-row type="flex" :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('modules.official-site.webTemplate.templateName')" prop="templateName">
                            <el-input v-model="dataForm.templateName" placeholder="" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('modules.official-site.webTemplate.status')" prop="status">
                            {{ $t("modules.official-site.common.disable") }}
                            <el-switch v-model="dataForm.isValid" active-color="#13ce66" inactive-color="#c7c7c7"
                                active-value="1" inactive-value="0">
                            </el-switch>
                            {{ $t("modules.official-site.common.enable") }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('modules.official-site.webTemplate.memo')" prop="memo">
                            <el-input type="textarea" v-model="dataForm.memo" placeholder="" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-table :data="dataForm.modList" border style="width: 100%" :key="tableKey">
                    <el-table-column header-align="center" align="center"
                        :label="$t('modules.official-site.webTemplate.selModel')">
                        <template slot-scope="scope">
                            <el-form-item label="" label-width="0px" :prop="'modList.' + scope.$index + '.modId'"
                                :rules="formRules.modId">
                                <el-select v-model="scope.row.modId" clearable>
                                    <el-option v-for="item in modelList" :key="item.modId" :label="item.modName"
                                        :value="item.modId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center"
                        :label="$t('modules.official-site.webTemplate.operate')">
                        <template slot-scope="scope">
                            <i class="el-icon-remove" @click="delItem(scope.$index)" v-if="dataForm.modList.length != 1"
                                style="font-size: 26px; color: #D41831;"></i>
                            <i class="el-icon-circle-plus" @click="addItem(scope.$index)"
                                style="font-size: 26px; color: #3379EE;"></i>
                            <img class="sort-icon" @click="sortUp(scope.$index)"
                                src="../../../../assets/img/up-icon.png" />
                            <img class="sort-icon" @click="sortDown(scope.$index)"
                                src="../../../../assets/img/down-icon.png" />
                        </template>
                    </el-table-column>
                </el-table>
                <el-row type="flex" justify="end" style="margin-top: 20px;">
                    <el-button @click="goPage('official-site-webTemplate/list')">{{ $t("common.button.cancel")
                        }}</el-button>
                    <el-button type="primary" @click="saveData()" v-re-click>{{ $t("common.button.save") }}</el-button>
                </el-row>
            </el-form>
        </div>
    </el-dialog>
</template>


<script setup lang="ts">
import router from '@/router';
import { getDictDataList, getList } from '@/service/web/add-or-update';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n()


const tableKey = ref(1)
let modelList = ref([
    {
        modelId: "1", modelName: "1", modelCode: ''
    },
    {
        modelId: "2", modelName: "2", modelCode: ''
    },
    {
        modelId: "3", modelName: "3", modelCode: ''
    },
    {
        modelId: "4", modelName: "4", modelCode: ''
    }
])
let dataForm = reactive({
    templateId: '',
    templateName: "",
    memo: '',
    isValied: '0',
    modList: [{
        modId: "",
        tmpModMappingId: ''
    }]
})
const formRules = reactive({
    templateName: [
        { required: true, message: t("modules.official-site.webTemplate.inputNotNull"), trigger: 'change' }
    ],
    modId: [
        { required: true, message: t("modules.official-site.webTemplate.inputNotNull"), trigger: 'change' }
    ]
})

// 生命周期钩子
const onActivated(() => {
    getWebTemplateModelList();     //获取模型列表
    const id = router.query.id     //获取路由参数
    if (id) {
        dataForm.templateId = id;
        getDataInfo();
    }
})

const getModelList = async () => {
    const data = await getList();
    if (data && data.resultCode === 200) {
        modelList.value = data.body;
    }
}

const addItem = (index: number) => {
    dataForm.modList.splice(index + 1, 0, {
        modId: '',
        tmpModMappingId: ''
    })
    tableKey.value += 1;
}

const delItem = (index: number) => {
    dataForm.modList.splice(index, 1)
    tableKey.value += 1;
}

const sortUp = (index: number) => {
    if (index == 0) {
        return false;
    }
    let model = dataForm.modList[index]
    dataForm.modList.splice(index, 1)
    if (index > 1) {
        dataForm.modList.splice(index - 1, 0, model)
    } else {
        dataForm.modList.unshift(model)
    }
}

const sortDown = (index: number) => {
    if (index == dataForm.modList.length - 1) {
        return false;
    }
    let model = dataForm.modList[index]
    dataForm.modList.splice(index, 1)
}

const goPage = (page: any) => {
    router.push({
        name: page
    })
}

const getDataInfo = async () => {
    const data = await getDictDataList()
    if (data && data.resultCode === 200) {
        dataForm = data.body
    }
}

const blogForm = ref()
const saveData = async () => {
    blogForm.value.validate((valid: any) => {
        if (valid) {
            const data = 
        }
    })
}
</script>

<style scoped></style>