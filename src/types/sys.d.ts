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