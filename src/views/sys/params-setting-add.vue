<template>
    <el-dialog :close-on-click-modal="false" v-model="visible"
               title="新增參數設定" width="45%">
      <div class="basic member">
        <el-form :model="dataForm" :rules="rules" label-width="140px" ref="dataFormRef"
                 v-loading="dataListLoading">
          <el-form-item label="項目名稱" prop="projectName">
            <el-input v-model="dataForm.projectName"></el-input>
          </el-form-item>
          <el-form-item label="參數名稱" prop="paramName">
            <el-input v-model="dataForm.paramName"></el-input>
          </el-form-item>
          <el-form-item label="參數值" prop="paramValue">
            <el-input v-model="dataForm.paramValue"></el-input>
          </el-form-item>
          <el-form-item label="説明" prop="title">
            <el-input v-model="dataForm.title"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span class="dialog-footer" slot="footer">
          <el-button @click="visible = false">關閉</el-button>
          <el-button @click="saveSubmit()" type="primary" v-re-click>保存</el-button>
        </span>
    </el-dialog>
  </template>

<script lang="ts" setup>
import { ref , reactive, nextTick , onMounted} from "vue";
import { ElMessage, ElForm, ElInput, ElButton, FormRules  } from "element-plus";
import baseService from "@/service/baseService";


const visible = ref(false)
const dataListLoading = ref(false)
const type = ref(0)
const id = ref('')
const currencyId = ref('NT$')

const dataForm = reactive({
    paramName : '' ,
    paramValue : '' , 
    projectName : '' ,
    title : '' , 
    resetFields : '',
})

const rules = reactive<FormRules>({
    paramName : [
        {
            required : true , 
            message : "此欄位必填！" , 
            trigger : 'blur'
        }
    ],
    paramValue : [
        {
            required : true , 
            message : "此欄位必填！" ,
            trigger : 'blur'
        }
    ],
    projectName : [
        {
            required : true , 
            message : "此欄位必填！" ,
            trigger : 'blur'
        }
    ]
})



// 创建一个引用来引用表单组件
const dataFormRef = ref();

const init = (projectName : string , paramName : string , param : string , content : string) => {
    visible.value = true 
    nextTick(()=>{
        if(dataFormRef.value) {
            dataFormRef.value.resetFields();
        }
    })
}


const dataSubmitButtonDisabled = ref(false)
const emit = defineEmits(["addSuccess"]);

// 保存设定
const saveSubmit = () => {
    if(dataSubmitButtonDisabled.value) return;
    

    dataFormRef.value.validator((valid : boolean) => {
        if(valid){
            dataSubmitButtonDisabled.value = true;
            baseService.post('sys/commonparamsetting/save' , dataForm)
            .then((res) => {
                if(res && res.resultCode === 200) {
                    ElMessage.success({
                        message: "新增參數設定成功",
                        type: 'success'
                    });
                    // 设置成功
                    visible.value = false;
                    emit("addSuccess");
                }
            })
        }
    })
}

defineExpose({
    init
});



onMounted(() => {
})
</script>

<style lang="scss" scoped>

</style>