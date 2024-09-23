import { getListInfoRes, getTemplateDataListRes, templateDataListParams } from "@/types/sys"

export const getTemplateDataList = (params: templateDataListParams): Promise<getTemplateDataListRes> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: 2,
            pageSize: 10,
            currPage: 1,
            list:
                [{
                    webTmpMappingId: "12059fadd9107e311650e32ee6949571",
                    webId: "8a75c569602e78e3bd158cae9ff81972",
                    templateId: "0604681e018cf746e8a9b25f65cb5385",
                    languageId: "1e4b372f533b441aa76e896d136b4f81",
                    webName: "test",
                    templateName: "test",
                    languageName: "English",
                    status: "1"
                },
                {
                    webTmpMappingId: "459c89983d04c6351da7ed895104ea22",
                    webId: "8a75c569602e78e3bd158cae9ff81972",
                    templateId: "0604681e018cf746e8a9b25f65cb5385",
                    languageId: "3601b3cac4bc488b8119e0039e3a19e9",
                    webName: "test",
                    templateName: "test",
                    languageName: "繁體中文",
                    status: "1"
                }]
        },
        link: "",
        success: true
    })
}

export const getListInfo = ():Promise<getListInfoRes> => {
    return Promise.resolve()
}