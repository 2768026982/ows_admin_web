import { IHttpResponse } from "@/types/interface";

// 获取部门数据数据----/sys/sysdept/select get请求
export const getDeptSelect = (): Promise<IHttpResponse> =>
  Promise.resolve({
    resultCode: 200,
    resultMessage: "處理成功！",
    messageCode: "SUCCESS",
    messageParams: null,
    body: {
      records: [
        {
          deptId: "299be46a02964a5a90eb2e920f4a6a69",
          parentId: "0",
          parentName: null,
          name: "總部",
          allPath: "299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        },
        {
          deptId: "455ff5f88e8a49419ac5f5acb9c1e291",
          parentId: "8f6c41ee5b8b444e8111e4ba9401d6b5",
          parentName: "業務部",
          name: "業務A組",
          allPath:
            "455ff5f88e8a49419ac5f5acb9c1e291,8f6c41ee5b8b444e8111e4ba9401d6b5,299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "1",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        },
        {
          deptId: "5f1b88feb7ac42729d5e3e5a43025040",
          parentId: "40f99260e74d489ab70d604e05f10bb2",
          parentName: "開發部",
          name: "開發A組",
          allPath:
            "5f1b88feb7ac42729d5e3e5a43025040,40f99260e74d489ab70d604e05f10bb2,299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "1",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        },
        {
          deptId: "8f6c41ee5b8b444e8111e4ba9401d6b5",
          parentId: "299be46a02964a5a90eb2e920f4a6a69",
          parentName: "總部",
          name: "業務部",
          allPath: "8f6c41ee5b8b444e8111e4ba9401d6b5,299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "1",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        },
        {
          deptId: "924ba2f96d634392bebb8d621321f178",
          parentId: "a164d726e7ea4f7190e6ec69aee02e3b",
          parentName: "財務部",
          name: "財務A組",
          allPath:
            "924ba2f96d634392bebb8d621321f178,a164d726e7ea4f7190e6ec69aee02e3b,299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "1",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        },
        {
          deptId: "40f99260e74d489ab70d604e05f10bb2",
          parentId: "299be46a02964a5a90eb2e920f4a6a69",
          parentName: "總部",
          name: "開發部",
          allPath: "40f99260e74d489ab70d604e05f10bb2,299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "2",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        },
        {
          deptId: "a164d726e7ea4f7190e6ec69aee02e3b",
          parentId: "299be46a02964a5a90eb2e920f4a6a69",
          parentName: "總部",
          name: "財務部",
          allPath: "a164d726e7ea4f7190e6ec69aee02e3b,299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "3",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        },
        {
          deptId: "f0227bd686ce43acacea591574791ce1",
          parentId: "299be46a02964a5a90eb2e920f4a6a69",
          parentName: "總部",
          name: "技術支持部",
          allPath: "f0227bd686ce43acacea591574791ce1,299be46a02964a5a90eb2e920f4a6a69,0",
          orderNum: "4",
          deptNameKey: null,
          pcItemId: null,
          functionCode: null,
          itemType: null,
          contentList: []
        }
      ]
    },
    link: "",
    success: true
  });
