import { getElementDropListRes, getModelTypeInfoRes, getTmpModeInfoRef } from "@/types/sys"

// 网页模块管理新增/修改弹出 -------------------/common/syscode/getSysCodeByModCode post请求
export const getModelTypeInfo = (): Promise<getModelTypeInfoRes> => {
    return Promise.resolve(
        {
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body:
                [{
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "01",
                    nameKey: "modCode_01",
                    name: "轮播图",
                    updateTime: ""
                },
                {
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "02",
                    nameKey: "modCode_02",
                    name: "锚点",
                    updateTime: ""
                }, {
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "04",
                    nameKey: "modCode_04",
                    name: "黑色背景",
                    updateTime: ""
                }, {
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "05",
                    nameKey: "modCode_05",
                    name: "白色背景",
                    updateTime: ""
                }, {
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "09",
                    nameKey: "modCode_09",
                    name: "About Us",
                    updateTime: ""
                }, {
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "10",
                    nameKey: "modCode_10",
                    name: "Why Aiotek",
                    updateTime: ""
                }, {
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "11",
                    nameKey: "modCode_11",
                    name: "tab",
                    updateTime: ""
                }, {
                    colorType: null,
                    color: null,
                    type: "modCode",
                    code: "12",
                    nameKey: "modCode_12",
                    name: "Industries-tab2",
                    updateTime: ""
                }],
            link: "",
            success: true
        }
    )
}

// 获取ElementDropList ============================ /tmp/element/drop get请求
export const getElementDropList = (): Promise<getElementDropListRes> => {
    return Promise.resolve(
        {
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body:
                [{
                    elementId: "ae3828e5567c49469f88a18162ab3ab4",
                    elementName: "帶連接的文字(錨點)",
                    elementType: "12"
                },
                {
                    elementId: "515cdcfec27542e297c6f9c334473d0c",
                    elementName: "demonstration说明组件",
                    elementType: "41"
                },
                {
                    elementId: "d18a42bbccfe466c83b63ea1c4e301bd",
                    elementName: "functions功能组件",
                    elementType: "40"
                },
                {
                    elementId: "e6adf1535ad24efc9b2af4f6354f749b",
                    elementName: "視頻",
                    elementType: "30"
                },
                {
                    elementId: "e7bc4d91b29648cfa389e40e5bb24eb3",
                    elementName: "圖片",
                    elementType: "20"
                },
                {
                    elementId: "701a5433b505423db77932340107937c",
                    elementName: "title標題",
                    elementType: "11"
                },
                {
                    elementId: "8f5d87c3c4ac46fe84ffc612f5915116",
                    elementName: "desc描述",
                    elementType: "10"
                }],
            link: "",
            success: true
        }
    )
}

// 获取TmpModeInfo =======================/tmpMod/info/ get请求
export const getTmpModeInfo = (modId: string): Promise<getTmpModeInfoRef> => {
    return Promise.resolve(
        {
            resultCode: 200,
            resultMessage: "處理成功！",
            messageCode: "SUCCESS",
            messageParams: null,
            body:
            {
                modId: "529a7fef5f78e861d5cd21cbbe20a4dd",
                modName: "test",
                modNameKey: null,
                modCode: "02",
                layoutRow: "1",
                layoutCol: "1",
                isValid: "0",
                rowList:
                    [
                        {
                            "colList": [
                                {
                                    elementId: "ae3828e5567c49469f88a18162ab3ab4",
                                    modeElMappingId: "a9d041e50ab5f71dcfdfe17b6a26b259",
                                    width: null,
                                    backgroundColor: null
                                }]
                        }]
            },
            link: "",
            success: true
        }
    )
}