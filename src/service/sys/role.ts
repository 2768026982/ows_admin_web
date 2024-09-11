import { IHttpResponse } from "@/types/interface";
import { RoleListParams } from "@/types/sys";

// 获取列表----/sys/role/list get请求
export const getList = (params: RoleListParams): Promise<IHttpResponse> => Promise.resolve({
  resultCode: 200,
  resultMessage: "處理成功！",
  messageCode: "SUCCESS",
  messageParams: null,
  body: {
    totalCount: 5,
    pageSize: 10,
    currPage: 1,
    records: [
      {
        enterpriseId: null,
        roleId: "82ee5747d0e3454aac117c43140187c8",
        roleName: "系統管理員",
        site: null,
        isValid: "1",
        insertDeptId: "299be46a02964a5a90eb2e920f4a6a69",
        insertTime: "2021/07/07 11:02:24",
        deptId: null,
        menuIdList: [],
        participateAudit: "1",
        deptName: "總部",
        visibleBranches: "0"
      }
    ]
  },
  link: "",
  success: true
});