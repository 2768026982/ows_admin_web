<template>
  <el-dialog
  :title="$t('common.pageHead.back')"
  :close-on-click-modal="false" modal-append-to-body v-model="listVisible"
  >
    <div class="basic member">
      <el-page-header class="mb-8" @back="goPage('official-site-webMaster/web-master-list')"
        :title="$t('common.pageHead.back')"
        :content="$t('modules.official-site.webTemplateData.setData')"></el-page-header>
      
      <!--查询列表-->
      <div class="mt-8">
        <el-table :data="dataList" border stripe fit v-loading="dataListLoading" class="table_style"
          style="width: 100%;">
          <el-table-column header-align="center" align="center" fixed="left" type="index" width="60"
            :label="$t('modules.official-site.webTemplateData.no')">
            <template v-slot="scope">
              {{ pageSize * (pageIndex - 1) + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="webName" header-align="center" align="center"
            :label="$t('modules.official-site.webTemplateData.page')" min-width="20%">
          </el-table-column>
          <el-table-column prop="languageName" header-align="center" align="center"
            :label="$t('modules.official-site.webTemplateData.language')" min-width="10%">
          </el-table-column>
          <el-table-column prop="templateName" header-align="center" align="center"
            :label="$t('modules.official-site.webTemplateData.template')" min-width="10%">
          </el-table-column>
          
          <el-table-column header-align="center" align="center" width="250"
            :label="$t('modules.official-site.webTemplateData.operate')">
            <template v-slot="scope">
              <el-button plain type="primary" size="mini" @click="setData(scope.row.webId, scope.row.languageId)">
                {{ $t('modules.official-site.webTemplateData.setData') }}
              </el-button>
              <el-button plain type="primary" size="mini"
                @click="copy(scope.row.webId, scope.row.templateId, scope.row.webTmpMappingId)">
                {{ $t('modules.official-site.webTemplateData.copy') }}
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <copy ref="copyRef" v-if="copyVisible"></copy>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import router from '@/router';
import { getListInfo, getTemplateDataList } from '@/service/web/webTemplateData-list';
import useStore from 'element-plus/es/components/table/src/store';
import { get } from 'lodash';
import { computed, nextTick, onActivated, reactive, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
const { t } = useI18n()

const dataForm = ref({
  webId: '',
  languageId: '',
  templateId: '',
  status: ''
})

const pageList = ref([])
const templateList = ref([])
const dataList = ref([])
const pageIndex = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)
const dataListLoading = ref(false)
const copyVisible = ref(false)
const copyRef = ref()

const store = useStore();
const languageList = computed(() => {
  return store.state.basic.langList
})

const stateList = computed(() => {
  return [
    {
      ID: "1",
      text: t("modules.official-site.common.enable"),
    },
    {
      ID: "0",
      text: t("modules.official-site.common.disable"),
    },
  ]
})

const route = useRoute();
onActivated(() => {
  dataForm.value.webId = route.query.webId as string;
  getDataList();
})

// todo
const listVisible = ref(false)
const init = async (webId: string) => {
  dataForm.value.webId = webId || ''

  try {
    listVisible.value = true;
    if(dataForm.value.webId) {
      const data = await getListInfo();
      if( data && data.resultCode === 200) {
        dataForm.value.templateId = data.body.templateId;
        dataForm.value.languageId = data.body.languageId;
        dataForm.value.status = data.body.status;
        dataForm.value.webId = data.body.webId;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const goPage = (page: any) => {
  router.push({
    name: page
  })
}

// 搜索
const search = () => {
  pageIndex.value = 1;
  getDataList();
}

// 获取数据列表
const getDataList = async () => {
  dataListLoading.value = true;
  let params = {
    page: pageIndex.value,
    limit: pageSize.value,
    ...dataForm.value
  }

  const data = await getTemplateDataList(params);
  if (data && data.resultCode === 200) {
    dataList.value = data.body.list;
    totalPage.value = data.body.totalCount
  }
  dataListLoading.value = false;
}

// 每页数
const sizeChangeHandle = (val: number) => {
  pageSize.value = val;
  pageIndex.value = 1;
  getDataList()
}

// 当前页
const currentChangeHandle = (val: number) => {
  pageIndex.value = val;
  getDataList()
}

// 跳到详情页面
const setData = (webId: string, languageId: string) => {
  router.push({
    name: 'webTemplateData-setData',
    query: {
      webId: webId,
      languageId: languageId,
    }
  })
}

const copy = (webId: string, tmpId: string, webTmpMappingId: string) => {
  copyVisible.value = true;
  nextTick(() => {
    if (copyRef.value && copyRef.value.init) {
      copyRef.value.init(webId, tmpId, webTmpMappingId)
    }
  })
}

defineExpose({
  init
});
</script>

<style scoped></style>