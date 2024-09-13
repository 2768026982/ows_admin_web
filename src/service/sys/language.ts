import { ISysHttpResponse, LanguageItemParams } from "@/types/sys";
import http from "@/utils/http";

// 获取列表数据----sys/language/item/pages post请求
export const getLanguageList = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/language/item/pages",
    method: "post",
    data
  });
};

// 删除语言
export const deleteLanguageData = (data: LanguageItemParams): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/language/item/delete",
    method: "post",
    data
  });
}

// 获取登录语言
export const getSysLangageType = (): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/languageType/selectSysLanguageTypeList",
    method: "post",
  })
}