import { WebTemplateDelParams, WebTemplateList, WebTemplateListParams, WebTemplateNewParams } from "@/types/sys"

// 获取数据 -----------'/tmp/master/queryPage'   get 请求
export const getWebTemplateList = (params: WebTemplateListParams): Promise<WebTemplateList> => {
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
                templateId: "3154f06fa9b77a4a69bdab07ba14995c",
                templateName: "aiotek官網模版1",
                memo: "aiotek官網模版1",
                isValid: "1"
            }]
        },
        link: "",
        success: true

    })
}

// 删除 --------------------------/tmp/master/deleted/${id}  get请求  params:WebTemplateDelParams
export const getWebTemplateDel = (): Promise<WebTemplateList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: true,
        link: "",
        success: true
    })
}

// 更新状态 ------------`/tmp/master/updateStatus` post请求
export const postWebTemplateStatus = (params: WebTemplateNewParams): Promise<WebTemplateList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: true,
        link: "",
        success: true
    })
}

