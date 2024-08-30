<template>
    <el-dialog
        :title="!dataForm.id ? $t('modules.sys.syscode-add-or-update.save') : $t('modules.sys.syscode-add-or-update.update')"
        :close-on-click-modal="false" v-model="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="formRef" @keyup.enter.native="dataFormSubmit(formRef)"
            label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item :label="$t('modules.sys.syscode-add-or-update.form-item-1')" prop="addType">
                        <el-input v-if="dataForm.addType == 0" v-model="dataForm.type"
                            :placeholder="$t('modules.sys.syscode-add-or-update.form-item-1-input')"></el-input>
                        <el-select v-else v-model="dataForm.type"
                            :placeholder="$t('modules.sys.syscode-add-or-update.form-item-1-select')"
                            style="width: 100%">
                            <el-option v-for="(item, index) in typeList" :key="index" :label="item.type"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('modules.sys.syscode-add-or-update.form-item-2')" prop="code">
                        <el-input v-model="dataForm.code"
                            :placeholder="$t('modules.sys.syscode-add-or-update.form-item-2-input')"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="$t('modules.sys.syscode-add-or-update.form-item-3')" prop="nameKey">
                        <el-input v-model="dataForm.nameKey"
                            :placeholder="$t('modules.sys.syscode-add-or-update.form-item-3-input')"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-table :data="dataForm.codeList" style="width: 100%">
                <el-table-column type="index" :label="$t('modules.sys.syscode-add-or-update.table-column-1')"
                    width="60">
                </el-table-column>
                <el-table-column prop="langTypeName" :label="$t('modules.sys.syscode-add-or-update.table-column-2')"
                    width="180">
                </el-table-column>
                <el-table-column :label="$t('modules.sys.syscode-add-or-update.table-column-3')" width="120">
                    <template #default="scope">
                        <el-tag type="danger" v-if="scope.row.primeLanguage === '1'">{{
                            $t('modules.sys.syscode-add-or-update.table-column-3-tag') }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('modules.sys.syscode-add-or-update.table-column-4')">
                    <template #default="scope">
                        <el-input v-model="scope.row.languageContent"
                            :placeholder="$t('modules.sys.syscode-add-or-update.table-column-4-input')"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">{{ $t('modules.sys.syscode-add-or-update.cancel-btn') }}</el-button>
            <el-button type="primary" @click="dataFormSubmit(formRef)" v-re-click>{{
                $t('modules.sys.syscode-add-or-update.submit-btn')
                }}</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts" setup>

import { nextTick, onMounted, ref, reactive } from "vue";
import { ElMessage, ElForm, FormInstance, FormRules  } from "element-plus";
import baseService from "@/service/baseService";
import { useI18n } from "vue-i18n";
import emits from "@/utils/emits";


// 创建国际化函数的引用
const { t } = useI18n()
// 显不显示模态框
const visible = ref(false)
const typeList = ref([]);


// // 创建响应式表单数据对象
const dataForm = reactive({
    id: '',
    pcItemId: '',
    typeOrg: '',
    codeOrg: '',
    nameKeyOrg: '',
    type: '',
    code: '',
    nameKey: '',
    addType: 0,
    codeList: [],

    //这个是dataForm中的codeList
});

// 创建响应式验证规则对象
const dataRule = reactive<FormRules>({
    type: [
        {
            required: true,
            message: t('modules.sys.syscode-add-or-update.dataRule-type'),
            trigger: 'blur'
        }
    ],
    code: [
        {
            required: true,
            message: t('modules.sys.syscode-add-or-update.dataRule-code'),
            trigger: 'blur'
        }
    ],
    nameKey: [
        {
            required: true,
            message: t('modules.sys.syscode-add-or-update.dataRule-nameKey'),
            trigger: 'blur'
        }
    ],
});

const dataListLoading = ref(false)

const init = (type: string, code: string, nameKey: string, addType: number) => {
    dataForm.type = type || '0';
    dataForm.code = code || '0';
    dataForm.nameKey = nameKey || '0';
    dataForm.addType = addType || 0;

    if (dataForm.addType === 1) {
        getTypeList(type, code, nameKey);
    }
    visible.value = true;
    nextTick(() => {
        if (formRef.value) {
            // formRef.value.resetFields();
            dataForm.typeOrg = type
            dataForm.codeOrg = code
            dataForm.nameKeyOrg = nameKey
            dataForm.type = type
            dataForm.code = code
            dataForm.nameKey = nameKey
            dataForm.id = type + code + nameKey;
            if (!dataForm.id) {
                getCodeCommonList()
                dataForm.type = ''
                dataForm.code = ''
                dataForm.nameKey = ''
            } else {
                getSysCodeInfo(type, code, nameKey)
            }
        }
    });
};

const getCodeCommonList = () => {
    baseService.get('generator/syscode/initSavePage')
        .then((res) => {
            if (res && res.resultCode === 200) {
                dataForm.codeList = res.body
            }
        })
}

const formRef = ref<FormInstance>()
const dataSubmitButtonDisabled = ref(false)
const emit = defineEmits(["refreshDataList"]);
//表单提交
const dataFormSubmit = async (formEl: FormInstance | undefined) => {
    if (dataSubmitButtonDisabled.value) return;
    dataSubmitButtonDisabled.value = true;

    let postData = reactive({
        'type': dataForm.type,
        'code': dataForm.code,
        'nameKey': dataForm.nameKey,
        'codeList': dataForm.codeList,
    });
    if (dataForm.id) {
        postData = reactive({
            ...postData,
            'type' : dataForm.type,
            'code' : dataForm.code,
            'nameKey' : dataForm.nameKey,
            'typeOrg': dataForm.typeOrg,
            'codeOrg': dataForm.codeOrg,
            'nameKeyOrg': dataForm.nameKeyOrg,
            'records': dataForm.codeList,
            'pcItemId': dataForm.pcItemId,
        });
    }
    

    if (!formEl){
        dataSubmitButtonDisabled.value = false;
        return false;
    }else{
        await formEl.validate((valid) => {
            if (valid) {
                baseService.post(`/generator/syscode/${!dataForm.id ? 'save' : 'update'}`, postData)
                    .then((res) => {
                        dataSubmitButtonDisabled.value = false
                        if (res && res.resultCode === 200) {
                            let message = t('modules.sys.syscode-add-or-update.submit-success')
                            ElMessage.success({
                                duration: 1500,
                                message: message,
                                onClose: () => {
                                    visible.value = false
                                    emit("refreshDataList")
                                }
                            })
                        }

                    })
            } else {
                dataSubmitButtonDisabled.value = false
            }
        })
    }
        
}


const getSysCodeInfo = (type: string, code: string, nameKey: string) => {
    baseService.get('generator/syscode/info' , {
        'type' : type,
        'code' : code,
        'nameKey' : nameKey

    })
        .then((res) => {
            if (res && res.resultCode === 200) {
                dataForm.pcItemId = res.body.pcItemId
                dataForm.codeList = res.body.records
            }
        })
}

const getTypeList = (type: string, code: string, nameKey: string) => {
    dataListLoading.value = true
    baseService.get(`generator/syscode/typeList`).then((res) => {
        if (res.resultCode === 200){
            typeList.value = res.body
        } 
    })
}

defineExpose({
    init
});



onMounted(() => {
    // getDataList()
})


</script>


<style lang="scss" scoped></style>

<!-- 1.nextTick 中的id字段 
 :model  和 ref 属性 命名相同 ，用的时候乱掉了
 dataForm中的codeList没导入
 -->