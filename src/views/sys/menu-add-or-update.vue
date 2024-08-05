<template>
  <el-dialog v-model="visible"
             :title="!dataForm.menuId ? $t('modules.sys.menu-add-or-update.save') : $t('modules.sys.menu-add-or-update.update')"
             :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataFormRef" @keyup.enter="dataFormSubmit()"
             label-width="120px">

      <el-form-item :label="$t('modules.sys.menu-add-or-update.form-item-1')" prop="menuType">
        <el-radio-group v-model="dataForm.menuType">
          <el-radio v-for="(menuType, index) in dataForm.typeList" :key="index" :label="menuType.key">{{
              menuType.name
            }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="menuName"
                    :label="filterObj(dataForm.typeList,'key',dataForm.menuType).name + $t('modules.sys.menu-add-or-update.form-item-2')">
        <el-input v-model="dataForm.menuName"
                  :placeholder="filterObj(dataForm.typeList,'key',dataForm.menuType).name + $t('modules.sys.menu-add-or-update.form-item-2')">
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('modules.sys.menu-add-or-update.form-item-3')" prop="menuNameKey">
        <el-input v-model="dataForm.menuNameKey"
                  :placeholder="filterObj(dataForm.typeList,'key',dataForm.menuType).name + $t('modules.sys.menu-add-or-update.form-item-3-input')">
          <el-button slot="append" @click="setBusinessCode()"
                     :disabled="!this.dataForm.menuNameKey">{{ $t('modules.sys.menu-add-or-update.form-item-3-btn') }}
          </el-button>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('modules.sys.menu-add-or-update.form-item-4')" prop="parentName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-scrollbar ref="caseViewScroll" style="height: 500px">
            <el-tree
              :data="menuList"
              :props="menuListTreeProps"
              node-key="menuId"
              ref="menuListTree"
              @current-change="menuListTreeCurrentChangeHandle"
              :default-expand-all="true"
              :highlight-current="true"
              :expand-on-click-node="false">
            </el-tree>
          </el-scrollbar>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true"
                  :placeholder="$t('modules.sys.menu-add-or-update.form-item-4-input')"
                  class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.menuType ==='30'" :label="$t('modules.sys.menu-add-or-update.form-item-5')"
                    prop="url">
        <el-input v-model="dataForm.url"
                  :placeholder="$t('modules.sys.menu-add-or-update.form-item-5-input')"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.menuType === '20'" :label="$t('modules.sys.menu-add-or-update.form-item-6')"
                    prop="perms">
        <el-input v-model="dataForm.perms"
                  :placeholder="$t('modules.sys.menu-add-or-update.form-item-6-input')"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.menuType !== '20'" :label="$t('modules.sys.menu-add-or-update.form-item-7')"
                    prop="sort">
        <el-input-number v-model="dataForm.sort" controls-position="right" :min="0"
                         :label="$t('modules.sys.menu-add-or-update.form-item-7-input')"></el-input-number>
      </el-form-item>
      <el-form-item v-if="dataForm.menuType !== '20'" :label="$t('modules.sys.menu-add-or-update.form-item-8')"
                    prop="icon">
        <el-row>
          <el-col :span="22">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover">
              <div class="mod-menu__icon-inner">
                <div class="mod-menu__icon-list">
                  <el-button
                    v-for="(item, index) in iconList"
                    :key="index"
                    @click="iconActiveHandle(item)"
                    :class="{ 'is-active': item === dataForm.icon }">
                    <icon-svg :name="item"></icon-svg>
                  </el-button>
                </div>
              </div>
            </el-popover>
            <el-input v-model="dataForm.icon" v-popover:iconListPopover :readonly="true"
                      :placeholder="$t('modules.sys.menu-add-or-update.form-item-8-input')"
                      class="icon-list__input"></el-input>
          </el-col>
        </el-row>
      </el-form-item>

    </el-form>
    <template v-slot:footer>
      <el-button @click="visible = false">{{ $t('modules.sys.menu-add-or-update.form-item-9-cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">
        {{ $t('modules.sys.menu-add-or-update.form-item-9-submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {getIconList} from "@/utils/utils";
import {nextTick, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import baseService from "@/service/baseService";
import {treeDataTranslate} from "@/utils/utils";
import {IObject} from "@/types/interface";
import {ary} from "lodash";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import {filterObj} from "@/utils/global_variable";
import {useRouter} from "vue-router";
import {useAppStore} from "@/store";
const validateUrl = (rule: any, value: any, callback: any) => {
  let message = t('modules.sys.menu-add-or-update.menu-url-empty')?
    t('modules.sys.menu-add-or-update.menu-url-empty'):"選單URL不能為空";"選單URL不能為空"
  if (dataForm.value.menuType === '30' && !/\S/.test(value)) {
    callback(new Error(message))
  } else {
    callback()
  }
}

const visible = ref(false)
const preventResubmitFlag = ref(false)
const dataForm = ref({
  menuId: 0,
  menuType: '30',
  typeList: [{
    name:t('modules.sys.menu-add-or-update.typeList-key-10'),
    key: '10'
  }, {
    name: t('modules.sys.menu-add-or-update.typeList-key-20'),
    key: '20'
  }, {
    name: t('modules.sys.menu-add-or-update.typeList-key-30'),
    key: '30'
  }],
  menuName: '',
  parentId: 0,
  parentName: '',
  url: '',
  perms: '',
  sort: 0,
  icon: '',
  iconList: [],
  contentList: [],
  itemType: '',
  functionCode: '',
  menuNameKey: '',
  pcItemId: '',
})
const iconList = ref([])
const dataFormRef = ref()
const menuListTree = ref()
const menuList = ref<IObject[]>([])
const emit = defineEmits(["refreshDataList"]);
const menuListTreeProps = ref({
  label: 'menuName',
  children: 'children'
})
const addOrUpdateVisible = ref(false)

const dataRule = ref({
  menuName: [
    {required: true, message: t('modules.sys.menu-add-or-update.dataRule-menuName'), trigger: 'blur'}
  ],
  parentName: [
    {required: true, message: t('modules.sys.menu-add-or-update.dataRule-parentName'), trigger: 'change'}
  ],
  url: [
    {validator: validateUrl, trigger: 'blur'}
  ]
})

const init = (id: number) => {
  dataForm.value.menuId = id || 0
  baseService.get('/sys/menu/select')
    .then((res) => {
      menuList.value = treeDataTranslate(res.body, 'menuId', 'parentId')
    }).then(() => {
    visible.value = true
    nextTick(() => {
      // dataFormRef.resetFields()
      dataForm.value.pcItemId = ''
    }).then(() => {
      if (!dataForm.value.menuId) {
        // 新增
        menuListTreeSetCurrentNode()
      } else {
        // 修改
        baseService.get(`/sys/menu/info/${dataForm.value.menuId}`)
          .then((res) => {
            dataForm.value.menuId = res.body.menuId
            dataForm.value.menuType = res.body.menuType
            dataForm.value.menuName = res.body.menuName
            dataForm.value.parentId = res.body.parentId
            dataForm.value.url = res.body.url
            dataForm.value.perms = res.body.perms
            dataForm.value.sort = res.body.sort
            dataForm.value.icon = res.body.icon
            dataForm.value.menuNameKey = res.body.menuNameKey
            dataForm.value.contentList = res.body.contentList
            dataForm.value.itemType = res.body.itemType
            dataForm.value.functionCode = res.body.functionCode
            dataForm.value.pcItemId = res.body.pcItemId
            menuListTreeSetCurrentNode()
          })
      }
    })
  })
}
// 選單樹選中
const menuListTreeCurrentChangeHandle = (data: any) => {
  dataForm.value.parentId = data.menuId
  dataForm.value.parentName = data.menuName
}
// 選單樹設置當前選中節點
const menuListTreeSetCurrentNode = () => {
  // menuListTree.setCurrentKey(dataForm.value.parentId)
  // dataForm.value.parentName = (menuListTree.getCurrentNode() || {})['menuName']
}
// 圖示選中
const iconActiveHandle = (iconName: any) => {
  dataForm.value.icon = iconName
}
// 表單提交
const dataFormSubmit = () => {
  //判斷當前按鈕是否點擊過
  if (preventResubmitFlag.value) {
    //點擊過直接返回
    return
  }
  dataFormRef.value.validator((valid: boolean) => {
    if (valid) {
      //設置按鈕已點擊
      preventResubmitFlag.value = true
      baseService.post(`/sys/menu/${!dataForm.value.menuId ? 'save' : 'update'}`, {
        'menuId': dataForm.value.menuId || undefined,
        'menuType': dataForm.value.menuType,
        'menuName': dataForm.value.menuName,
        'parentId': dataForm.value.parentId,
        'url': dataForm.value.url,
        'perms': dataForm.value.perms,
        'sort': dataForm.value.sort,
        'icon': dataForm.value.icon,
        'contentList': dataForm.value.contentList,
        'menuNameKey': dataForm.value.menuNameKey,
        //新增時沒有pcItemId
        'pcItemId': !dataForm.value.menuId ? '' : dataForm.value.pcItemId,
      }).then((res) => {
        preventResubmitFlag.value = false
        if (res && res.resultCode === 200) {
          let message = t('modules.sys.menu-add-or-update.save-or-update-success') ?
            t('modules.sys.menu-add-or-update.save-or-update-success') : "操作成功";

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
    }
  })
  // 設置namekey
  const setBusinessCode = () => {
    addOrUpdateVisible.value = true
    nextTick(() => {
      // this.$refs.sysCodeAddOrUpdate.init(dataForm.value.pcItemId,this.dataForm.functionCode,
      //   this.dataForm.itemType,this.dataForm.menuNameKey,"/sys/language/content/infoByParam")
    })
  }
  const setContentList = (obj: any) => {
    // let that = this
    let list = obj.codeList
    dataForm.value.contentList = []
    if (list && list.length > 0) {
      list.forEach(function (item: any, idx: any) {
        let content = {
          contentId: item.contentId,
          langTypeId: item.langTypeId,
          languageContent: item.languageContent
        }
        dataForm.value.contentList.push(content)
      })
    }
  }
}

defineExpose({
  init
});

onMounted(() => {
  // console.log('$t')
  // console.log($t)
  // console.log('$t')
  // iconList.value = getIconList()
})
</script>

<style lang="less">
.el-popover.el-popper {
  overflow-x: hidden;
}

.mod-sys__menu {
  .menu-list,
  .icon-list {
    .el-input__inner,
    .el-input__suffix {
      cursor: pointer;
    }
  }

  &-icon-popover {
    width: 458px !important;
    overflow-y: hidden !important;
  }

  &-icon-inner {
    width: 100%;
    max-height: 260px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &-icon-list {
    width: 458px !important;
    padding: 0;
    margin: -8px 0 0 -8px;

    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;

      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
}
</style>
