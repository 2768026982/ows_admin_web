import { getMasterDelList, getMasterDelParams, getMasterSetHomepageList, getWebMasterInfoParams, IMasterHttpResponse, masterSetHomepageParams } from "@/types/sys"

// 获取列表-------web/master/queryPage   get请求
export const getWebMasterInfo = (params: getWebMasterInfoParams): Promise<IMasterHttpResponse> => {
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

//  ---------------------ows/web/master/setHomepage
export const getMasterSetHomepage = (params:masterSetHomepageParams): Promise<getMasterSetHomepageList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: 1,
            pageSize: 10,
            currPage: 1,
            list: [{
                webId: "ad2386c810b75568b698c4ecc48362af",
                memo: "aiotek官網網頁",
                isValid: "1",
                webMappingId: null,
                templateId: null,
                templateName: null,
                languageId: null,
                languageName: null,
                homePage: "1"
            }]
        },
        link: "",
        success: true
    })
}

// 删除数据 ==================/ows/web/master/deleted get请求
export const getMasterDel = (params: getMasterDelParams): Promise<getMasterDelList> => {
    return Promise.resolve
        ({
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body: true,
            link: "",
            success: true
        })
}