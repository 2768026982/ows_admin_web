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