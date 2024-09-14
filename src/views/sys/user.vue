<template>
    <div class="mod-user">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="search()" label-width="80">
            <el-form-item>
                <el-input v-model="dataForm.userName" :placeholder="$t('modules.sys.user.form-item-1-input')"
                    clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('modules.sys.user.form-item-2')">
                <el-select v-model="dataForm.isValid">
                    <el-option v-for="item in global_variable.userIsValid" :key="item.value" :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>



            <el-form-item :label="$t('modules.sys.user.form-item-3')">
                <el-cascader ref="basicDept" v-model="dataForm.deptId"
                    :placeholder="$t('modules.sys.user.form-item-3-cascader')" :show-all-levels="false"
                    :options="departmentTree" :props="props1" clearable>

                </el-cascader>
            </el-form-item>


            <el-form-item :label="$t('modules.sys.user.form-item-4')">
                <el-select v-model="dataForm.roleId" :placeholder="$t('modules.sys.user.form-item-4-select')" clearable>
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="text-align: right;" class="button-group">
                <el-row type="flex" justify="end">
                    <el-col>
                        <template v-slot="scope">
                            <el-button @click="search()">{{ $t('modules.sys.user.search-btn') }}</el-button>
                            <el-button v-if="store.isAuth('sys:user:save')" type="primary"
                                @click="addOrUpdateHandle(scope.row.userId, scope.row.deptId)">
                                {{ $t('modules.sys.user.submit-btn') }}
                            </el-button>
                            <el-button v-if="store.isAuth('sys:user:delete')" type="primary" @click="deleteById()">
                                <span>刪除</span>
                            </el-button>
                        </template>
                    </el-col>
                </el-row>
            </el-form-item>


        </el-form>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[20, 50, 100]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper" class="page">
        </el-pagination>
        <br>
        <br>
        <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle"
            style="width: 100%;">
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="userName" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-1')" min-width="150">
            </el-table-column>
            <el-table-column prop="loginId" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-2')" min-width="180">
            </el-table-column>
            <el-table-column prop="email" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-3')" min-width="200">
            </el-table-column>
            <el-table-column prop="deptName" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-4')" min-width="200">
            </el-table-column>
            <el-table-column prop="roleName" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-5')" min-width="200">
            </el-table-column>
            <el-table-column prop="telephone" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-6')" min-width="200">
            </el-table-column>
            <el-table-column prop="googleKey" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-7')" min-width="200">
            </el-table-column>
            <el-table-column header-align="center" align="center" :label="$t('modules.sys.user.table-column-8')"
                width="100" fixed="right">
                <template v-slot="scope">
                    <el-switch v-model="scope.row.isValid" active-color="#13ce66" inactive-color="#c7c7c7"
                        active-value="1" inactive-value="0"
                        :active-text="$t('modules.sys.user.table-column-8-switch-active')"
                        :inactive-text="$t('modules.sys.user.table-column-8-switch-inactive')"
                        @change="updateStatus(scope.row.userId, scope.row.isValid)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="insertTime" header-align="center" align="center"
                :label="$t('modules.sys.user.table-column-9')" min-width="200">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="250"
                :label="$t('modules.sys.user.table-column-10')">
                <template v-slot="scope">
                    <a v-if="store.isAuth('sys:user:update')" type="text" size="small" class="mr-2"
                        @click="addOrUpdateHandle(scope.row.userId, scope.row.deptId)">
                        {{ $t('modules.sys.user.table-column-10-update') }}
                    </a>
                    <a v-if="store.isAuth('sys:user:update')" type="text" size="small" class="mr-2"
                        @click="resetPassword(scope.row.userId, scope.row.loginId)">
                        {{ $t('modules.sys.user.table-column-11-reset') }}
                    </a>

                    <a v-if="store.isAuth('sys:user:delete')" type="text" size="small" class="mr-2"
                        @click="deleteByRow(scope.row.userId, scope.row.deptId)">
                        {{ $t('modules.sys.user.table-column-12-delete') }}
                    </a>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[20, 50, 100]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :crmPropList="crmProp"
            @refreshDataList="getDataList"></add-or-update>
    </div>
</template>


<script lang="ts" setup>
import global_variable from "@/utils/global_variable";
import { getRoleList, getUserDataList, postUserDel, postUserReset, postUserUpdateVal } from '@/service/sys/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useAppStore } from "@/store";
import { useI18n } from "vue-i18n";
import { UserRoleList } from '@/types/sys';
const { t } = useI18n()
let store = useAppStore();

// 级联所用props
const props1 = {
    checkStrictly: true,
    label: 'name',
    value: 'deptId',
    emitPath: false
}

const dataForm = reactive({
    userName: '',
    loginId: '',
    isValid: 1,
    roleId: '',
    deptId: ''
})

const dataList = ref([])
const prefixe = ref([])

const pageIndex = ref(1)
const pageSize = ref(20)
const totalPage = ref(0)

const dataListLoading = ref(false)
const dataListSelections = ref<any[]>([])

const addOrUpdateVisible = ref(false)
const crmProp = reactive({})

const departmentTree = ref([])
const roleList = ref<UserRoleList[]>([])

// basicProp: this.$store.state.basic.prop,
// 从store中获取状态
const basicProp = computed(() => store.state.basic.prop)




// 角色
const getRole = async () => {
    const data = await getRoleList()
    roleList.value = (data && data.resultCode === 200) ? data.body.records : []
}

// 搜索
const search = () => {
    pageIndex.value = 1;
    getDataList();
}

// 获取数据列表
const getDataList = async () => {

    dataListLoading.value = true

    try {
        const params = {
            page: pageIndex.value,
            limit: pageSize.value,
            userName: dataForm.userName,
            loginId: dataForm.loginId,
            roleId: dataForm.roleId,
            deptId: dataForm.deptId,
            isValid: dataForm.isValid,
        }

        const data = await getUserDataList(params)
        if (data && data.resultCode === 200) {
            dataList.value = data.body.records
            totalPage.value = data.body.totalCount
        } else {
            dataList.value = []
            totalPage.value = 0;
        }

    } catch (error) {
        console.log(error);

    } finally {
        dataListLoading.value = false;
    }
}

// 每页数
const sizeChangeHandle = (val: number) => {
    pageSize.value = val
    pageIndex.value = 1
    getDataList();
}

// 当前页
const currentChangeHandle = (val: number) => {
    pageIndex.value = val;
    getDataList();
}

// 多选
const selectionChangeHandle = (val: { map: (arg0: (item: any) => any) => never[]; }) => {
    dataListSelections.value = val.map(item => item.userId);
};

const addOrUpdate = ref();

// 新增/修改
const addOrUpdateHandle = (id: string, deptId: string) => {
    addOrUpdateVisible.value = true
    nextTick(() => {
        if (addOrUpdate.value && addOrUpdate.value.init) {
            addOrUpdate.value.init(id, deptId);
        }
    })
}

// 重置密码
const resetPassword = (id: string, loginId: string) => {
    console.log(id);
    ElMessageBox.confirm(
        `${t('modules.sys.user.reset-title-1', { loginId: `${loginId}` })}`,
        `${t('modules.sys.user.updateGoogle-title')}`, {
        confirmButtonText: `${t('modules.sys.user.confirmButtonText')}`,
        cancelButtonText: `${t('modules.sys.user.cancelButtonText')}`,
        type: 'warning'
    }).then(async () => {

        const data = await postUserReset()
        if (data && data.resultCode === 200) {
            ElMessage({
                type: 'success',
                message: `${t('modules.sys.user.reset-title-2')}`
            })
        }
    })

}

// 删除一行数据
const deleteByRow = (userId: string, isValid: string) => {
    dataListSelections.value = [userId]
    deleteById()
}

// 删除员工
const deleteById = () => {
    if (dataListSelections.value.length != 0) {
        let message = t('modules.sys.user.delete-confirm') ?
            t('modules.sys.user.delete-confirm',) :
            `確定刪除該員工?`;
        let title = t('modules.sys.user.updateGoogle-title') ?
            t('modules.sys.user.updateGoogle-title') : "提示";
        let confirm = t('modules.sys.user.confirmButtonText') ?
            t('modules.sys.user.confirmButtonText') : "確定";
        let cancel = t('modules.sys.user.cancelButtonText') ?
            t('modules.sys.user.cancelButtonText') : "取消";
        let success = t('modules.sys.user.updateGoogle-success') ?
            t('modules.sys.user.updateGoogle-success') : "操作成功";

        ElMessageBox.confirm(message, title, {
            confirmButtonText: confirm,
            cancelButtonText: cancel,
            type: 'warning'
        }).then(async () => {
            const data = await postUserDel()
            if (data && data.resultCode === 200) {
                ElMessage({
                    message: success,
                    type: 'success',
                    duration: 1500,
                })
                getDataList();
            }
        }).catch(() => { })
    }
}

// 修改启用状态        test注释到这个方法，页面显示出来了
const updateStatus = async (userId: string, isValid: number) => {
    let newForm = {
        isValid: isValid,
        userId: userId
    }
    const data = await postUserUpdateVal(newForm)
    if (data && data.resultCode === 200) {
        let message = t('modules.sys.user.updateStatus-success') ?
            t('modules.sys.user.updateStatus-success') : "啓用狀態修改成功";

        ElMessage({
            message: message,
            type: 'success',
            duration: 1500,
        })
        getDataList()
    }
}

onMounted(() => {
    getRole();
    getDataList();
})
</script>


<style scoped>
.button-group {
  margin-bottom: 20px;
  float: right;
}
.page{
    clear: both;
}
</style>