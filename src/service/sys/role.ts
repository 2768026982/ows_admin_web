import { ISysHttpResponse, RoleInfoParams, RoleListParams } from "@/types/sys";

// 获取列表数据----/sys/role/list get请求
export const getRoleList = (params: RoleListParams): Promise<ISysHttpResponse> => {
  return Promise.resolve({
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
}

// 获取权限数据----/sys/role/info/${id} post请求
export const getRoleInfo = (): Promise<ISysHttpResponse> => {
  return Promise.resolve({
    resultCode: 200,
    resultMessage: "處理成功！",
    messageCode: "SUCCESS",
    messageParams: null,
    body: {
      enterpriseId: null,
      roleId: "82ee5747d0e3454aac117c43140187c8",
      roleName: "系統管理員",
      site: null,
      isValid: "1",
      insertDeptId: "299be46a02964a5a90eb2e920f4a6a69",
      insertTime: "2021/07/07 11:02:24",
      deptId: "299be46a02964a5a90eb2e920f4a6a69",
      menuIdList: [
        "03a48d2fa258446f90fb52f1485aa45a",
        "0d3c18fca82b49559c051dc206524021",
        "272c92a33c8747e2af748e0e7addf845",
        "299be46a02964a5a90eb2e920f4a6a69",
        "340767e5e9cb4da480e6094e71c20a13",
        "3c489dc3293a41e097700ba6a9ad45da",
        "3e352f8526a748f690dd400cbda49d23",
        "402ab500b3bd4d55a0f4a2b2c3ee2762",
        "59566456cb414a63b33efa67908d9a01",
        "68ed2a595c3f4b45a3605dc9e7b2db47",
        "68ed2a875c3f4b45a3605dc9e7b2db47",
        "71e73073887940fc88f1a26b93618f92",
        "76b8aed2dade44fbbfa1507897f8c412",
        "7d7c2ecfb4ba440e8531e9326505b581",
        "7eed440446fd43a4bc3e3a387661220c",
        "7f9b139d2d56440eb36795f13c50e05d",
        "7ffc49b6ddd14107af774023c47dc8c0",
        "82560d274133497796510fc3c02a929b",
        "893747cec06943f98f4288f25da8efa3",
        "8cb10e1301c147399eae2e585d00e8cb",
        "8f4f685a44604578bbc8d3a5af496809",
        "917d2baa3b444627a00f34eca78ac0c9",
        "9d0601c6bbf04b5ea6cca17d85186b65",
        "a1275cab795347be93510636c57b7e7c",
        "a15648a518064fbb89360db8f2b50fc4",
        "a6b9b69e16784dafaaafff74feeb4385",
        "adad0411859b4b65a7f99efe3981e237",
        "af05dba1fc354c3fbbffa3fb73064674",
        "b3476bc2221f4c20ab28b54801c472a7",
        "b87b1c64b53242288814ab0e77c56ae4",
        "c2cbed649dd94ff38f920f55f51d4f45",
        "c4883bacad274e7591a3eae2ef7bb4ae",
        "cd0eed2874844327968f566667b76e63",
        "d41ea929918249b9a72a4007648b4db9",
        "d66847b4732c4b6c9b535633fee3a6bf",
        "dc22892d84b14b949ff139b05abad2af",
        "ddadb1edce704c24885020bca2c79f35",
        "e2d0507ddfed45049b68a6c639440dca",
        "e89e35e3145145ef8ca41316cd0661d5",
        "e9c5266916d94638b99286f204bcdea1",
        "eefaf698cfd841668f87daab90efe4cd",
        "f044dc67a787499999a77281d16460d9",
        "fe57ab4b0fa848648f5debe83b8df00a"
      ],
      participateAudit: "1",
      deptName: "總部",
      visibleBranches: "0"
    },
    link: "",
    success: true
  });
}

// 删除列表数据----/sys/menu/delete/${id} post请求
export const deleteRoleData = (): Promise<ISysHttpResponse> =>
  Promise.resolve({
    resultCode: 200,
    resultMessage: "處理成功！",
    messageCode: "SUCCESS",
    messageParams: null,
    body: {},
    link: "",
    success: true
  });

// 新建权限数据----/sys/role/save post请求
export const roleDataSave = (params: RoleInfoParams): Promise<ISysHttpResponse> => {
  return Promise.resolve({
    resultCode: 200,
    resultMessage: "處理成功！",
    messageCode: "SUCCESS",
    messageParams: null,
    body: null,
    link: "",
    success: true
  });
};

// 更新权限数据----/sys/role/update post请求
export const roleDataUpdate = (params: RoleInfoParams): Promise<ISysHttpResponse> => {
  return Promise.resolve({
    resultCode: 200,
    resultMessage: "處理成功！",
    messageCode: "SUCCESS",
    messageParams: null,
    body: null,
    link: "",
    success: true
  });
};
