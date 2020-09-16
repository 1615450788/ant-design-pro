declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface ForgetPassword {
    ok: boolean;
  }

  export interface UserInfo {
    statusCode: string;
    jwt: string;
    user: {
      /**
       * 账户是否被锁定
       */
      blocked: boolean;
      /**
       * 是否确认邮箱
       */
      confirmed: false;
      /**
       * 创建时间，TZ格式（2020-09-12T02:55:05.111Z）
       */
      created_at: '2020-09-12T02:55:05.111Z';
      /**
       * 邮箱
       */
      email: 'wangtao5515@cvte.com';
      /**
       * 用户唯一标识
       */
      id: 1;
      /**
       * 账号来源
       */
      provider: 'local';
      /**
       * 账号更新时间
       */
      updated_at: '2020-09-16T02:07:11.662Z';
      /**
       * 用户名
       */
      username: 'test';
    };
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
