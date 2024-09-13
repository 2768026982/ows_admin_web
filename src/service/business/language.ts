import { ISysHttpResponse, LanguageItemParams } from "@/types/sys";
import http from "@/utils/http";

// 获取列表数据----sys/language/item/pages post请求
export const getBusinessLanguageList = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "business/language/item/pages",
    method: "post",
    data
  });
};

// 删除语言
export const deleteBusinessLanguageData = (data: LanguageItemParams): Promise<ISysHttpResponse> => {
  return http({
    url: "business/language/item/delete",
    method: "post",
    data
  });
}

// 插入内容----business/language/item/insert post请求
export const insertBuinessLanguage = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "business/language/item/insert",
    method: "post",
    data
  });
};

// 获取内容----business/language/content/list post请求
export const getBusinessLanguageContent = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "business/language/content/list",
    method: "post",
    data
  });
};

// 插入内容----business/language/content/insert post请求
export const getBusinessLanguageInsert = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "business/language/content/insert",
    method: "post",
    data
  });
};

// 修改内容----business/language/content/update post请求
export const getBusinessLanguageUpdate = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "business/language/content/update",
    method: "post",
    data
  });
};

// 删除内容----business/language/content/delete post请求
export const getBusinessLanguageDelete = (data: Object): Promise<ISysHttpResponse> => {
  return http({
    url: "business/language/content/delete",
    method: "post",
    data
  });
};