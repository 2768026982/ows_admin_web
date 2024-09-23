<template>
    <el-dialog :title="$t('modules.official-site.webTemplateData.copy')" :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
        label-width="120px">
        <div class="inline_block">
          <el-form-item :label="$t('modules.official-site.webTemplateData.page')" prop="webId">
            <el-select v-model="dataForm.webId" clearable @change="getLanguageList()">
              <el-option v-for="item in pageList" :key="item.webId" :label="item.webName" :value="item.webId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('modules.official-site.webTemplateData.language')" prop="languageId">
            <el-select v-model="dataForm.languageId" clearable>
              <el-option v-for="item in languageList" :key="item.languageId" :label="item.languageName"
                :value="item.languageId">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.button.cancel')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit()" v-re-click>{{$t('modules.official-site.webTemplateData.copy')}}</el-button>
      </span>
    </el-dialog>
  </template>

<script setup lang="ts">
import { getLanguageInfo, getPageInfo, postDataFormSubmit } from '@/service/web/webTemplateData-copy';
import { ElMessage } from 'element-plus';
import { nextTick, ref } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n()

    const visible = ref(false)
    const webId = ref()
    const tmpId = ref()
    const dataForm = ref({
        webTmpMappingId: '',
        webId: '',
        languageId: '',
    })

    const dataRule = {
        webId: [
            { required: true , message: t("modules.official-site.webTemplateData.pleaseSelect"), trigger: 'blur'}
        ],
        languageId: [
            { required: true , message: t("modules.official-site.webTemplateData.pleaseSelect"), trigger: 'blur'}
        ],
    }

    const pageList = ref([])
    const languageList = ref([])

    const init = (webId: string , tmpId: string , webTmpMappingId: string) => {
        webId = webId;
        tmpId = tmpId;
        dataForm.value.webTmpMappingId = webTmpMappingId;

        visible.value = true;
        nextTick(() => {
            dataForm.value.resetFields()
        })
        getPageList();
    }

    const getPageList = async() => {
        const data = await getPageInfo(tmpId.value)
        if ( data && data.resultCode === 200) {
            pageList.value = data.body
        }
    }

    const getLanguageList = async() => {
        dataForm.value.languageId = '';
        const data = await getLanguageInfo(webId.value)
        if( data && data.resultCode === 200) {
            languageList.value = data.body
        }
    }

    // 表单提交
    const dataFormSubmit = () => {
        let params = {
            ...dataForm.value
        }
        dataForm.value.validate(async (valid) => {
            if(valid) {
                const data = await postDataFormSubmit(params)
                if(data && data.resultCode === 200) {
                    ElMessage({
                        message: t("modules.official-site.tag-add-or-update.submit-success"),
                        type: 'success',
                        duration: 1500 ,
                        onClose: () => {
                            visible.value = false;
                        }
                    })
                }
            }
        })
    }
</script>

<style scoped>
    
</style>