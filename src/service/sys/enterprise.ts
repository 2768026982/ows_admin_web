import { IHttpResponse } from "@/types/interface";

// 获取列表----/sys/enterprise/login/info get请求
export const getEnterPriseInfo = (): Promise<IHttpResponse> =>
  Promise.resolve({
    resultCode: 200,
    resultMessage: "處理成功！",
    messageCode: "SUCCESS",
    messageParams: null,
    body: {
      enterpriseCode: "headquarters",
      parentCode: "0",
      parentName: null,
      name: "總公司",
      level: "1",
      orderNum: "",
      enterpriseNameKey: "headquarters",
      deptHideId: [],
      deptId: [
        "8f6c41ee5b8b444e8111e4ba9401d6b5",
        "299be46a02964a5a90eb2e920f4a6a69",
        "924ba2f96d634392bebb8d621321f178",
        "455ff5f88e8a49419ac5f5acb9c1e291",
        "a164d726e7ea4f7190e6ec69aee02e3b"
      ],
      functionCode: "sys_enterprise",
      itemType: "enterprise_name_id",
      pcItemId: "906eeac77c8e462ea6fdfde3c1b19d10",
      contentList: [
        {
          contentId: "63c6533eb0f247a3b9a7d8468a4b5570",
          langTypeId: "3601b3cac4bc488b8119e0039e3a19e9",
          langTypeName: null,
          primeLanguage: null,
          languageContent: "總公司"
        },
        {
          contentId: "e06ec36c6e8c4175a3dea2e17f97b38b",
          langTypeId: "508f86f2cb014125964118c06235c31d",
          langTypeName: null,
          primeLanguage: null,
          languageContent: "本社"
        },
        {
          contentId: "e3876eba6a4e4486b491ad164fd23d4d",
          langTypeId: "e3ab031275a7474c9b909ab40d9e39a3",
          langTypeName: null,
          primeLanguage: null,
          languageContent: "สำนักงานใหญ่"
        },
        {
          contentId: "e39826c2b3cb4466923f7833cc793ad6",
          langTypeId: "aa4ad7714c4f4dfaa8326723660221b0",
          langTypeName: null,
          primeLanguage: null,
          languageContent: "樺漢"
        },
        {
          contentId: "e9c5db6ba5414ecf987f8fe90d9c0111",
          langTypeId: "1e4b372f533b441aa76e896d136b4f81",
          langTypeName: null,
          primeLanguage: null,
          languageContent: "headquarters"
        }
      ]
    },
    link: "",
    success: true
  });
