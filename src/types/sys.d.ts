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



export interface WebTemplateModelList{
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  body:any;
  totalCount:number;
  pageSize:number;
  currPage:number;
  modId:string;
  modName:string;
  modCode:string;
  layoutRow:string;
  layoutCol:string;
  isValid:string;
  success:boolean;
}

export interface WebTemplateModelDelList{
  resultCode : number;
  resultMessage: string;
  messageCode: string;
  success: boolean;
}

export interface WebTemplateModelDelParams{
  id:string;
}

export interface WebTemplateModelUpdateStatus{
  resultCode : number;
  resultMessage: string;
  messageCode: string;
  body: boolean;
  success: boolean;
}

export interface WebTemplateModelUpdateStatusParams{
  modId:string;
  status:string;
}

export interface WebTemplateList {
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  body:any;
  success:boolean;
  totalCount:number;
  pageSize:number;
  currPage:number;
  list:any;
  templateId:string;
  templateName:string;
  memo:string;
  isValid:string;
}

export interface WebTemplateDelParams{
  id:string;
}

export interface WebTemplateListParams{
  page:number;
  limit:number;
}

export interface WebTemplateNewParams{
  templateId:string;
  status:string;
}

export interface getWebTemplateModelListParams{
  page:number;
  limit:number;
}

export interface WebTemplateModelItem {
  ID:string;
  text:string;
}

export interface UserRoleList {
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  body:any;
  records:any;
  roleId:string;
  roleName:string;
  isValid:string;
  insertDeptId:string;
  insertTime:string;
  participateAudit:string;
  deptName:string;
  visibleBranches:string;
  success:boolean;
}

export interface UserDataList {
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  body:any;
  totalCount:number;
  pageSize:number;
  currPage:number;
  records:any;
  userId:string;
  loginId:string;
  userName:string;
  telephone:string;
  email:string;
  isValid:number;
  deptName:string;
  roleName:string;
  googleKey:string;
  insertTime:string;
  success:boolean;
}

export interface UserDataListParams {
  page: number;
  limit : number ;
  userName : string;
  loginId: string;
  roleId: string;
  deptId: string;
  isValid: number;
}

export interface UserReset{
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  success:boolean
}

export interface UserResetParams{
  userId:string;
}

export interface UserDel {
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  success:boolean;
}

export interface UserDelParams {
  userIds:string;
}

export interface UserVal {
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  success:boolean;
}

export interface UserValParams {
  isValid:number;
  userId:string;
}

export interface CompanyDataList {
  resultCode:number;
  resultMessage:string;
  messageCode:string;
  body:any;
  records:any;
  enterpriseCode:string;
  parentCode:string;
  name:string;
  level:string;
  success:boolean;
}

export interface CompanyDel{
  resultCode:number;
}