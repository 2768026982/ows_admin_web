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
