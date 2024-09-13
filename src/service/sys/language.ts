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

// 保存数据----sys/language/item/insert post请求
export const insertSysLanguage = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/language/item/insert",
    method: "post",
    data
  });
};

// 获取内容----sys/language/content/list post请求
export const getSysLanguageContent = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/language/content/list",
    method: "post",
    data
  });
};

// 插入内容----sys/language/content/insert post请求
export const getSysLanguageInsert = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/language/content/insert",
    method: "post",
    data
  });
};

// 修改内容----sys/language/content/update post请求
export const getSysLanguageUpdate = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/language/content/update",
    method: "post",
    data
  });
};

// 删除内容----sys/language/content/delete post请求
export const getSysLanguageDelete = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "sys/language/content/delete",
    method: "post",
    data
  });
};