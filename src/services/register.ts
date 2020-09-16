import { request } from 'umi';

export interface RegisterParamsType {
  email?: string;
  username?: string;
  password: string;
}

export async function AccountRegister(params: RegisterParamsType) {
  return request<API.UserInfo>('/api/auth/local/register', {
    method: 'POST',
    data: params,
  });
}
