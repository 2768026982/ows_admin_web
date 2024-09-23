import { getLanguageInfoRes, getLanguageParams, getPageInfoRes, getPageParams, postSubmitList, postSubmitParams } from "@/types/sys"


export const getPageInfo = (params: getPageParams): Promise<getPageInfoRes> => {
    return Promise.resolve(
        {
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body:
                [{
                    webId: "8a75c569602e78e3bd158cae9ff81972",
                    webName: "test"
                }],
            link: "",
            success: true
        })
}

export const getLanguageInfo = (params: getLanguageParams): Promise<getLanguageInfoRes> => {
    return Promise.resolve(
        {
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body:
                [{
                    languageId: "1e4b372f533b441aa76e896d136b4f81",
                    languageName: "English"
                },
                {
                    languageId: "3601b3cac4bc488b8119e0039e3a19e9",
                    languageName: "繁體中文"
                }],
            link: "",
            success: true
        })
}

export const postDataFormSubmit = (params: postSubmitParams): Promise<postSubmitList> => {
    return Promise.resolve(
        {
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body: true,
            link: "",
            success: true
        }
    )
}