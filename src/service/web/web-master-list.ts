import { IMasterHttpResponse } from "@/types/sys"

// 获取列表-------web/master/queryPage   get请求
export const getWebMasterInfo = (): Promise<IMasterHttpResponse> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: 2,
            pageSize: 10,
            currPage: 1,
            list: [
                {
                    webId: "ad2386c810b75568b698c4ecc48362af",
                    memo: "aiotek官網網頁",
                    isValid: "1",
                    webMappingId: null,
                    templateId: null,
                    templateName: null,
                    languageId: null,
                    languageName: null,
                    homePage: "1"
                },
                {
                    webId: "fb8ddcd8c62395710de0457dbd36285f",
                    memo: "test測試頁面",
                    isValid: "1",
                    webMappingId: null,
                    templateId: null,
                    templateName: null,
                    languageId: null,
                    languageName: null,
                    homePage: "0"
                }
            ]
        },
        link: "",
        success: true
    })
}