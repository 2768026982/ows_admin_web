export interface RoleListParams {
  page?: number;
  limit?: number;
  roleName?: string;
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
