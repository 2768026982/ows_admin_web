import { UserDataList, UserDataListParams, UserDel, UserDelParams, UserReset, UserResetParams, UserRoleList, UserVal, UserValParams } from "@/types/sys"

// 获取数据
export const getRoleList = (): Promise<UserRoleList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: null,
            pageSize: null,
            currPage: null,
            records: [{
                enterpriseId: null,
                roleId: "c7d99d4cc43c45a8b14d113102f28f63",
                roleName: "业务组",
                site: null,
                isValid: "1",
                insertDeptId: "299be46a02964a5a90eb2e920f4a6a69",
                insertTime: "2023/10/21 11:10:24",
                deptId: null,
                menuIdList: [],
                participateAudit: "1",
                deptName: "業務A組",
                visibleBranches: "0"
            },
            {
                enterpriseId: null,
                roleId: "82ee5747d0e3454aac117c43140187c8",
                roleName: "系統管理員",
                site: null,
                isValid: "1",
                insertDeptId: "299be46a02964a5a90eb2e920f4a6a69",
                insertTime: "2021/07/07 11:02:24",
                deptId: null, "menuIdList": [],
                participateAudit: "1",
                deptName: "總部",
                visibleBranches: "0"
            },
            {
                enterpriseId: null,
                roleId: "875e5113ad634dda8a2886831391e8ff",
                roleName: "業務管理",
                site: null,
                isValid: "1",
                insertDeptId: "299be46a02964a5a90eb2e920f4a6a69",
                insertTime: "2022/04/09 18:36:37",
                deptId: null,
                menuIdList: [],
                participateAudit: "1",
                deptName: "業務部",
                visibleBranches: "1"
            },
            {
                enterpriseId: null,
                roleId: "6f58b3a301944aed91fb2d3660b80d13",
                roleName: "行政部",
                site: null,
                isValid: "1",
                insertDeptId: "a164d726e7ea4f7190e6ec69aee02e3b",
                insertTime: "2024/01/15 13:16:28",
                deptId: null,
                menuIdList: [],
                participateAudit: "0",
                deptName: "總部",
                visibleBranches: "0"
            },
            {
                enterpriseId: null,
                roleId: "35ab8917667a43afb1f0a3bf9f6a0556",
                roleName: "技術支持部門主管",
                site: null,
                isValid: "1",
                insertDeptId: "299be46a02964a5a90eb2e920f4a6a69",
                insertTime: "2023/10/25 11:45:23",
                deptId: null,
                menuIdList: [],
                participateAudit: "1",
                deptName: "技術支持部",
                visibleBranches: "1"
            }]
        },
        link: "",
        success: true
    })
}

// 获取数据dataList-----------------------'/sys/user/list' get请求
export const getUserDataList = (params: UserDataListParams): Promise<UserDataList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: 13,
            pageSize: 10,
            currPage: 1,
            records: [{
                userId: "69a3f1197d304f2d811d52871deb07db",
                loginId: "liuxingchen1",
                userName: "liuxingchen1",
                telephone: "15841115501",
                email: "1481794444@qq.com",
                userType: null,
                isValid: "1",
                resourceId: null,
                telephoneZone: null,
                deptId: null,
                deptName: "總部",
                roleName: "系統管理員/",
                googleKey: "L7IZRVVMU6TJBXOX",
                insertTime: "2024/09/12 08:43:52",
                roleIdList: [],
                deptList: [],
                enterpriseId: null
            },
            {
                userId: "62e6d2864fd94dd08708f014c919ef2f",
                loginId: "liuxingchen",
                userName: "liuxingchen",
                telephone: "15840555507",
                email: "1481794333@qq.com",
                userType: null,
                isValid: "1",
                resourceId: null,
                telephoneZone: null,
                deptId: null,
                deptName: "總部",
                roleName: "系統管理員/",
                googleKey: "6AM7HNGRLESDFV7T",
                insertTime: "2024/09/12 08:29:14",
                roleIdList: [],
                deptList: [],
                enterpriseId: null
            }]



        },
        link: "",
        success: true
    })
}

// 重置密码 ------------------------/sys/user/reset    post请求 params:UserResetParams
export const postUserReset = (): Promise<UserReset> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: null,
        link: "",
        success: true
    })
}

// 删除角色 -----------------/sys/user/delete post请求 params:UserDelParams
export const postUserDel = (): Promise<UserDel> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: null,
        link: "",
        success: true
    })
}

// 更新状态 ---------------`/sys/user/updateValid` post请求
export const postUserUpdateVal = (params: UserValParams): Promise<UserVal> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: null,
        link: "",
        success: true
    })
}