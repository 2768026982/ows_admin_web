<template>
    <div class="basic member">
        <el-page-header class="mb-8" @back="goPage('official-site-webTemplateModel/list')"
            :title="$t('common.pageHead.back')"
            :content="dataForm.modId ? $t('modules.official-site.webTemplateModel.modelUpdate') : $t('modules.official-site.webTemplateModel.modelAdd')"></el-page-header>
        <el-form ref="blogForm" :model="dataForm" :rules="formRules" class="pl-5 pr-5" label-position="left"
            label-width="160px">
            <el-row type="flex" :gutter="20">
                <el-col :span="12">
                    <el-form-item :label="$t('modules.official-site.webTemplateModel.modelName')" prop="modName">
                        <el-input v-model="dataForm.modName" placeholder="" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('modules.official-site.webTemplateModel.modelType')" prop="modCode">
                        <el-select v-model="dataForm.modelCode" clearable @change="layoutChange()">
                            <el-option v-for="item in modelTypeList" :key="item.code" :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('modules.official-site.webTemplateModel.row')" prop="row">
                        <el-input-number v-model="dataForm.layoutRow" @change="layoutChange()"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('modules.official-site.webTemplateModel.col')" prop="col">
                        <el-input-number v-model="dataForm.layoutCol" @change="layoutChange()"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('modules.official-site.webTemplateModel.status')" prop="status">
                        {{ $t('modules.official-site.common.disable') }}
                        <el-switch v-model="dataForm.isValid" active-color="#13ce66" inactive-color="#c7c7c7"
                            active-value="1" inactive-value="0">
                        </el-switch>
                        {{ $t('modules.official-site.common.enable') }}
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="24">
            <el-form-item :label="$t('modules.official-site.webTemplateModel.memo')" prop="memo">
              <el-input type="textarea" v-model="dataForm.memo" placeholder="" clearable></el-input>
            </el-form-item>
          </el-col> -->
            </el-row>
            <!-- <template v-if="dataForm.modCode != '01' && dataForm.modCode != '02'"> -->
            <template v-if="dataForm.layoutRow > 0 && dataForm.layoutCol > 0">
                <div class="row-box" v-for="(row, rowIndex) in dataForm.rowList">
                    <el-table :data="tableList" border style="width: 100%" :key="tableKey">
                        <el-table-column header-align="center" align="center"
                            :label="$t('modules.official-site.webTemplateModel.selElement')"
                            v-for="(col, colIndex) in row.colList">
                            <template v-slot="scope">
                                <el-form-item label="" label-width="0px"
                                    :prop="`rowList.${rowIndex}.colList.${colIndex}.elementId`"
                                    :rules="formRules.elementId">
                                    <el-select v-model="col.elementId" clearable
                                        :disabled="dataForm.modelCode == '01' || dataForm.modelCode == '02'">
                                        <el-option v-for="item in elementTypeList" :key="item.elementId"
                                            :label="item.elementName" :value="item.elementId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="宽度" label-width="70px"
                                    :prop="`rowList.${rowIndex}.colList.${colIndex}.width`" :rules="formRules.width">
                                    <el-input v-model="col.width" clearable
                                        :disabled="dataForm.modelCode == '01' || dataForm.modelCode == '02'"
                                        type="number">
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="背景颜色" label-width="70px"
                                    :prop="`rowList.${rowIndex}.colList.${colIndex}.backgroundColor`">
                                    <el-color-picker class="float-left" v-model="col.backgroundColor" />
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
            <template v-else>
                <div class="placeSetRowAndCol">{{ $t('modules.official-site.webTemplateModel.placeSetRowAndCol') }}
                </div>
            </template>
            <!-- </template> -->
            <el-row type="flex" justify="end" style="margin-top: 20px;">
                <el-button @click="goPage('official-site-webTemplateModel/list')">{{ $t('common.button.cancel')
                    }}</el-button>
                <el-button type="primary" @click="saveData(blogForm)" v-re-click>{{ $t('common.button.save')
                    }}</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import baseService from '@/service/baseService';
import { getElementDropList, getModelTypeInfo, getTmpModeInfo } from '@/service/web/web-template-model-add-or-update';
import { FormInstance } from 'element-plus';
import { onActivated, reactive, ref } from 'vue';
import global_variable from '@/utils/global_variable';
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
import { addOrUpdateModelelementTypeList, addOrUpdateModelTypeList } from '@/types/sys';
const { t } = useI18n()

const tableKey = ref(1)
const tableList = ref([{}])
let modelTypeList: addOrUpdateModelTypeList[] = [

]
let elementTypeList: addOrUpdateModelelementTypeList[] = [
    
]

interface Col {
    elementId: string;
    width: string;
    backgroundColor: string;
}

interface Row {
    colList: Col[];
}

let dataForm = reactive({
    modId: '',
    modName: '',
    modelCode: '',
    memo: '',
    isValid: '0',
    layoutRow: 0,
    layoutCol: 0,
    rowList: [
        {
            elementId: '',
            width: '',
            // 新增字段背景色
            backgroundColor: '#ffffff',
            colList: []
        }
    ] as unknown as Row[],
})
const formRules = {
    modName: [
        { required: true, message: t('modules.official-site.webTemplateModel.inputNotNull'), triggger: 'change' }
    ],
    modCode: [
        { required: true, message: t('modules.official-site.webTemplateModel.inputNotNull'), trigger: 'change' }
    ],
    layoutRow: [
        { required: true, message: t('modules.official-site.webTemplateModel.inputNotNull'), trigger: 'change' }
    ],
    layoutCol: [
        { required: true, message: t('modules.official-site.webTemplateModel.inputNotNull'), trigger: 'change' }
    ],
    elementId: [
        { required: true, message: t('modules.official-site.webTemplateModel.inputNotNull'), trigger: 'change' }
    ],
    width: [
        { required: true, trigger: 'blur' }
    ]
}

const route = useRoute();

onActivated(() => {
    const id = route.query.id;
    console.log(id);
    if (id) {
        dataForm.modId = id as string;
        getDataInfo();
    }
    getModelTypeList();
    getElementTypeList();
})

const getModelTypeList = async () => {
    const data = await getModelTypeInfo()
    modelTypeList = data.body
}

const getElementTypeList = async () => {
    const data = await getElementDropList()
    elementTypeList = data.body
}

const layoutChange = () => {
    if (dataForm.layoutRow < 1 || dataForm.layoutCol < 1) {
        dataForm.rowList = [];
        return false;
    }
    let rowList = [];
    for (let row = 0; row < dataForm.layoutRow; row++) {
        let colList = [];
        for (let col = 0; col < dataForm.layoutCol; col++) {
            let elementId = '';
            let modeElMappingId = '';
            if (dataForm.modelCode === '01') {
                const foundElement = global_variable.filterObj(elementTypeList.value, 'elementType', '20');
                elementId = foundElement ? foundElement.elementId : '';
            } else if (dataForm.modelCode === '02') {
                const foundElement = global_variable.filterObj(elementTypeList.value, 'elementType', '12');
                elementId = foundElement ? foundElement.elementId : '';
            } else if (dataForm.rowList[row] && dataForm.rowList[row].colList[col]) {
                elementId = dataForm.rowList[row].colList[col].elementId;
                modeElMappingId = dataForm.rowList[row].colList[col].modeElMappingId;
            }
            colList.push({ elementId, width: '', modeElMappingId });
        }
        rowList.push({ colList });
    }
    dataForm.rowList = rowList;
};

const goPage = (page: string) => {
    router.push({
        name: page
    })
}

const getDataInfo = async () => {
    baseService.get(`/tmpMod/info/${dataForm.modId}`)
        .then((data) => {
            if (data && data.resultCode === 200) {
                dataForm = data.body;
            }
        })
}

const saveData = async (formEl: FormInstance | undefined) => {
    await formEl?.validate((valid) => {
        if (valid) {
            baseService.post(dataForm.modId ? '/tmpMod/update' : '/tmpMod/add', dataForm)
                .then((data) => {
                    if (data && data.resultCode === 200) {
                        goPage('official-site-webTemplateModel/list')
                    }
                })
        }
    })
}
</script>

<style scoped></style>