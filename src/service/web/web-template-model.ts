import { getWebTemplateModelListParams, WebTemplateModelDelList, WebTemplateModelDelParams, WebTemplateModelList, WebTemplateModelUpdateStatus, WebTemplateModelUpdateStatusParams } from "@/types/sys"

// 获取list数据 ------------'/tmpMod/queryPage' get请求
export const getWebTemplateModelList = (params : getWebTemplateModelListParams): Promise<WebTemplateModelList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            totalCount: 12,
            pageSize: 10,
            currPage: 1,
            list: [{
                modId: "a9f89dd1b12a7ff96ad6c548518bf9a6",
                modName: "圖片new",
                modNameKey: null,
                previewImg: null,
                modCode: "05",
                layoutRow: "1",
                layoutCol: "1",
                isValid: "1"
            },
            {
                modId: "2ec411426fe1a40f31d6c3cf0d987975",
                modName: "輪播2",
                modNameKey: null,
                previewImg: null,
                modCode: "01",
                layoutRow: "1",
                layoutCol: "1",
                isValid: "1"
            },
            {
                modId: "6ae0df976351ea9f6618eeeb5c39f5f6",
                modName: "影片",
                modNameKey: null,
                previewImg: null, "modCode": "04",
                layoutRow: "1",
                layoutCol: "1",
                isValid: "1"
            },
            {
                modId: "f3e1bd1d75361ec7a806d773e10625b1",
                modName: "AIOTEKs Mission7",
                modNameKey: null,
                previewImg: null,
                modCode: "05",
                layoutRow: "3",
                layoutCol: "1",
                isValid: "1"
            },
            {
                modId: "e01d6de739e1a8d6f33769de9ac1afc0",
                modName: "whyAiotek5",
                modNameKey: null,
                previewImg: null,
                modCode: "10",
                layoutRow: "3",
                layoutCol: "1",
                isValid: "1"
            },
            {
                modId: "4bef09a7a41c7bcc593b6b420f2469c9",
                modName: "Industries10",
                modNameKey: null,
                previewImg: null,
                modCode: "12",
                layoutRow: "1",
                layoutCol: "5",
                isValid: "1"
            },
            {
                modId: "f04cf84514d6443c298d2f08ed44c227",
                modName: "Leadership9",
                modNameKey: null,
                previewImg: null,
                modCode: "04",
                layoutRow: "1",
                layoutCol: "4",
                isValid: "1"
            },
            {
                modId: "eea0e6420da349c52f21af042eee2461",
                modName: "Solutions8",
                modNameKey: null,
                previewImg: null,
                modCode: "11",
                layoutRow: "1",
                layoutCol: "3",
                isValid: "1"
            },
            {
                modId: "f7e09b710154a42ed36ba5f965b6e80f",
                modName: "圖片6",
                modNameKey: null,
                previewImg: null,
                modCode: "04",
                layoutRow: "1",
                layoutCol: "1",
                isValid: "1"
            },
            {
                modId: "f8b5aec2710dbaf4ca888fcdc3d2946b",
                modName: "圖片4",
                modNameKey: null,
                previewImg: null,
                modCode: "04",
                layoutRow: "1",
                layoutCol: "1",
                isValid: "1"
            }]
        }, link: "", success: true
    })
}

// 删除数据 -------------------------`/tmpMod/deleted/${id}` get请求
export const getWebTemplateModelDel = (params: WebTemplateModelDelParams): Promise<WebTemplateModelDelList> => {
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

// 改變狀態-----------------------------`/tmpMod/updateStatus` post请求
export const postWebTemplateModelStatus = (params:WebTemplateModelUpdateStatusParams): Promise<WebTemplateModelUpdateStatus> => {
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