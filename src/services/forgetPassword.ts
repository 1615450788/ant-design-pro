import { request } from 'umi';

export interface ForgetPasswordParamsType {
  email: string;
}

export async function AccountForgetPassword(params: ForgetPasswordParamsType) {
  return request<API.ForgetPassword>('/api/auth/forgot-password', {
    method: 'POST',
    data: params,
  });
}
