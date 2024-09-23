import { getInfoResponse, getMasterDropList, getMasterInfoList, postWebMasterList, postWebMasterParams } from "@/types/sys"

//        --------------------------/web/master/info
export const getWebMasterInfo = (): Promise<getInfoResponse> => {
    return Promise.resolve(
        {
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body: {
                webId: "fb8ddcd8c62395710de0457dbd36285f",
                memo: "test測試頁面",
                isValid: "1",
                homePage: "0",
                list: [{
                    templateId: "3154f06fa9b77a4a69bdab07ba14995c",
                    templateName: "",
                    languageId: "3601b3cac4bc488b8119e0039e3a19e9",
                    languageName: "繁體中文"
                },
                {
                    templateId: "3154f06fa9b77a4a69bdab07ba14995c",
                    templateName: "",
                    languageId: "1e4b372f533b441aa76e896d136b4f81",
                    languageName: "English"
                }]
            },
            link: "",
            success: true
        }
    )
}

// 获取下拉框数据 -------------------------/tmp/master/dropget请求
export const getMasterDrop = (): Promise<getMasterDropList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: [{
            templateId: "3154f06fa9b77a4a69bdab07ba14995c",
            templateName: "aiotek官網模版1"
        }],
        link: "",
        success: true
    })
}

//    ------------------------/ows/web/master/${this.addTemplateFlag === true ? 'save' : 'update'  params: postWebMasterParams
export const postWebMaster = (params: postWebMasterParams): Promise<postWebMasterList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: 2,
            pageSize: 10,
            currPage: 1,
            list: [{
                webId: "fb8ddcd8c62395710de0457dbd36285f",
                memo: "test測試頁面",
                isValid: "1",
                webMappingId: null,
                templateId: null,
                templateName: null,
                languageId: null,
                languageName: null,
                homePage: "0"
            },
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
            }]
        },
        link: "",
        success: true
    })
}

// init ==========================ows/web/master/queryPage 
export const getMasterInfo = (): Promise<getMasterInfoList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: 3,
            pageSize: 10,
            currPage: 1,
            list: [{
                webId: "2f2efccbfcad080f5282974540767581",
                memo: "test",
                isValid: "1",
                webMappingId: null,
                templateId: null,
                templateName: null,
                languageId: null,
                languageName: null,
                homePage: "0"
            }, {
                webId: "fb8ddcd8c62395710de0457dbd36285f",
                memo: "test測試頁面",
                isValid: "1",
                webMappingId: null,
                templateId: null,
                templateName: null,
                languageId: null,
                languageName: null,
                homePage: "0"
            }, {
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