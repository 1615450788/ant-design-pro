import { request } from 'umi';

export interface ResetPasswordParamsType {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export async function AccountResetPassword(params: ResetPasswordParamsType) {
  return request<API.UserInfo>('/api/auth/reset-password', {
    method: 'POST',
    data: params,
  });
}
