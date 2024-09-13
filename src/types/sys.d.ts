export interface RoleListParams {
  page?: number;
  limit?: number;
  roleName?: string;
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