import { GithubOutlined, WechatOutlined } from '@ant-design/icons';
import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, useModel, history, History } from 'umi';
import { LoginParamsType, fakeAccountLogin } from '@/services/login';
import LoginFrom from './LoginFrom';
import styles from './style.less';

const { Tab, Username, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      history.replace('/welcome');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await fakeAccountLogin({ ...values });
      if (msg.jwt && initialState) {
        message.success('登录成功！');
        setInitialState({
          ...initialState,
          userInfo: msg,
        });
        replaceGoto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState({ status: 'ok', type });
    } catch (error) {
      setUserLoginState({ status: 'error', type });
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;

  return (
    <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
      <Tab key="account" tab="密码登录">
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="账户或密码错误" />
        )}

        <Username
          name="identifier"
          placeholder="注册 邮箱 或 手机号"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="登录密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </Tab>
      <Tab key="mobile" tab="短信登录">
        {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="验证码错误" />
        )}
        <Mobile
          name="identifier"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },
          ]}
        />
        <Captcha
          name="captcha"
          placeholder="验证码"
          countDown={120}
          getCaptchaButtonText=""
          getCaptchaSecondText="秒"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        />
      </Tab>
      <div>
        <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
          30天内免登录
        </Checkbox>
        <Link
          className={styles.register}
          style={{
            float: 'right',
          }}
          to="/user/forgetPassword"
        >
          忘记密码
        </Link>
      </div>
      <Submit loading={submitting}>登录</Submit>
      <div className={styles.other}>
        其他登录方式
        <WechatOutlined className={styles.icon} />
        <GithubOutlined className={styles.icon} />
        <Link className={styles.register} to="/user/register">
          注册账户
        </Link>
      </div>
    </LoginFrom>
  );
};

export default Login;
