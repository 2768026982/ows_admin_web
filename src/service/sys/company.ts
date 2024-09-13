import { CompanyDataList, CompanyDel } from "@/types/sys"

// 取得数据 ----------------- '/sys/enterprise/list' get 请求
export const getCompanyDataList = (): Promise<CompanyDataList> => {
    return Promise.resolve({
        resultCode: 200,
        resultMessage: "處理成功！",
        messageCode: "SUCCESS",
        messageParams: null,
        body: {
            records: [{
                enterpriseCode: "headquarters",
                parentCode: "0",
                parentName: null,
                name: "總公司",
                level: "1",
                orderNum: ""
            }]
        },
        link: "",
        success: true
    })
}

// 删除 =============================
export const postCompanyDel = (): Promise<CompanyDel> => {
    return Promise.resolve({
        resultCode : 200,
    })
}