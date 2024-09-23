export interface RoleListParams {
  page?: number;
  limit?: number;
  roleName?: string;
}

export interface ISysHttpResponse {
  resultCode: number;
  resultMessage: string;
  body: any;
  messageCode: string;
  link: string;
  success: boolean;
}

export interface IMasterHttpResponse {
  resultCode: number;
  resultMessage: string;
  body: any;
  messageCode: string;
  success: boolean;
}

export interface RoleInfoParams {
  roleId?: number;
  roleName: string;
  remark: string;
  participateAudit: string;
  deptId: string;
  menuIdList: any[];
  visibleBranches: string;
  contentList: any[];
  pcItemId: string;
}

export interface LanguageItemParams {
  functionCode: string;
  itemKey: string;
  itemType: string;
  pcItemId: string;
}



export interface WebTemplateModelList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  totalCount: number;
  pageSize: number;
  currPage: number;
  modId: string;
  modName: string;
  modCode: string;
  layoutRow: string;
  layoutCol: string;
  isValid: string;
  success: boolean;
}

export interface WebTemplateModelDelList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  success: boolean;
}

export interface WebTemplateModelDelParams {
  id: string;
}

export interface WebTemplateModelUpdateStatus {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: boolean;
  success: boolean;
}

export interface WebTemplateModelUpdateStatusParams {
  modId: string;
  status: string;
}

export interface WebTemplateList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  success: boolean;
  totalCount: number;
  pageSize: number;
  currPage: number;
  list: any;
  templateId: string;
  templateName: string;
  memo: string;
  isValid: string;
}

export interface WebTemplateDelParams {
  id: string;
}

export interface WebTemplateListParams {
  page: number;
  limit: number;
}

export interface WebTemplateNewParams {
  templateId: string;
  status: string;
}

export interface getWebTemplateModelListParams {
  page: number;
  limit: number;
}

export interface WebTemplateModelItem {
  ID: string;
  text: string;
}

export interface UserRoleList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  records: any;
  roleId: string;
  roleName: string;
  isValid: string;
  insertDeptId: string;
  insertTime: string;
  participateAudit: string;
  deptName: string;
  visibleBranches: string;
  success: boolean;
}

export interface UserDataList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  totalCount: number;
  pageSize: number;
  currPage: number;
  records: any;
  userId: string;
  loginId: string;
  userName: string;
  telephone: string;
  email: string;
  isValid: number;
  deptName: string;
  roleName: string;
  googleKey: string;
  insertTime: string;
  success: boolean;
}

export interface UserDataListParams {
  page: number;
  limit: number;
  userName: string;
  loginId: string;
  roleId: string;
  deptId: string;
  isValid: number;
}

export interface UserReset {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  success: boolean
}

export interface UserResetParams {
  userId: string;
}

export interface UserDel {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  success: boolean;
}

export interface UserDelParams {
  userIds: string;
}

export interface UserVal {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  success: boolean;
}

export interface UserValParams {
  isValid: number;
  userId: string;
}

export interface CompanyDataList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  records: any;
  enterpriseCode: string;
  parentCode: string;
  name: string;
  level: string;
  success: boolean;
}

export interface CompanyDel {
  resultCode: number;
}

export interface getInfoResponse {
  resultCode: number;
  resultMessage: string;
  messageCode: string,
  body: any;
  webId: string;
  memo: string;
  isValid: string;
  homePage: string;
  list: infoItem[];

  success: boolean;
}

export interface infoItem {
  templateId: string;
  templateName: string;
  languageId: string;
  languageName: string;
}

export interface getMasterDropList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  templateId: string;
  templateName: string;
  success: boolean;
}

export interface postWebMasterList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  totalCount: number;
  pageSize: number;
  currPage: number;
  list: any;
  webId: string;
  memo: string;
  isValid: string;
  homePage: string;
  success: boolean;
}

export interface postWebMasterParams {
  // addTemplateFlag:string;
}

export interface tmpNameListParams {

}

export interface optionType {
  templateId: string;
  templateName: string;
}

export interface getMasterSetHomepageList {
  resultCode: number;

}

export interface getWebMasterInfoParams {
  page: number;
  limit: number;
}


// webTemplate list add or update 
export interface getModelList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  modId: string;
  modName: string;
  modCode: string;
  success: boolean;
}

export interface getDataList {
  resultCode: number;
  body: any;
}

export interface getMasterInfoList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: any;
  totalCount: number;
  pageSize: number;
  currPage: number;
  list: any;
  webId: string;
  memo: string;
  isValid: string;
  webMappingId: string;
  homePage: string;
  success: boolean;
}

export interface getMasterDelList {
  resultCode: number;
  resultMessage: string;
  messageCode: string;
  body: boolean;
  success: boolean;
}

export interface getMasterDelParams {
  webId: string;
}

export interface masterSetHomepageParams {
  webId: string;
}

// webTmplateData-list
export interface getTemplateDataListRes {
  body: any;
  resultCode: number;

}

export interface templateDataListParams {
  webId: string;
  languageId: string;
  templateId: string;
  status: string;
  page: number;
  limit: number;
}

export interface getListInfoRes {
  body: any;
  resultCode: number;

}

// copy
export interface getPageInfoRes {
  body: []
  resultCode: number;
  webId: string,
  webName: string,
}

export interface getPageParams {
  tmpId: string;
}

export interface getLanguageInfoRes {
  body:[];
  resultCode: number;
  languageId: string;
  languageName: string;
}

export interface getLanguageParams {
  webId: string
}

export interface postSubmitList {
  resultCode: number;

}

export interface postSubmitParams {
  webTmpMappingId: string; webId: string; languageId: string;
}

// templateModelAddOrUpdate 
export interface getModelTypeInfoRes {
    body: never[];

}
 
export interface getElementDropListRes {
    body: never[];

}

export interface getTmpModeInfoRef {
    body: { modId: string; modName: string; modelCode: string; memo: string; isValid: string; layoutRow: number; layoutCol: number; rowList: { elementId: string; width: string; }[]; };
    resultCode: number;
}

export interface addOrUpdateModelTypeList {
  name: string;
  code: string;
}

export interface addOrUpdateModelelementTypeList {
  elementName: string;
  elementId: string;
  value: string;
  
}

// user - add - or -update
export interface userItem {
  prefixe: any
}

export interface userRoleItem {
  roleId: any ;
  roleName : string;
}

export interface userEnterItem {
  name : string ;
  enterpriseCode : string;
}