import styles from './index.less';
import React, { useState } from 'react';
import { pick } from 'lodash';
import { Form, Input, Checkbox, Button, Tabs, AutoComplete, message } from 'antd';
import { Link, history, History, useModel } from 'umi';
import LoginFrom from '../Login/LoginFrom';
import { LockTwoTone, MailTwoTone, MobileTwoTone, UserOutlined } from '@ant-design/icons';
import { Agreement } from './components/Agreement';
import { AccountRegister, RegisterParamsType } from '@/services/register';
const { Tab, Username, Password, Mobile, Captcha, Submit } = LoginFrom;

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

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = async (values: RegisterParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await AccountRegister({
        ...pick(values, ['password', 'username']),
        email: `${values.username}${values.username?.includes('@') ? '' : '@shixiang.com'}`,
      });
      if (msg.jwt) {
        message.success('注册成功！');
        setInitialState({
          ...initialState,
          userInfo: msg,
        });
        replaceGoto();
        return;
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      message.error('注册失败！');
    }
    setSubmitting(false);
  };

  const onSearch = (searchText: string) => {
    const newOptions =
      searchText.includes('@') || !searchText
        ? []
        : ['qq.com', '163.com', 'gzshixiang.com'].map((v) => ({ value: `${searchText}@${v}` }));
    setOptions(newOptions);
  };
  return (
    <Form
      form={form}
      name="register"
      className={styles.register}
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      size={'large'}
      scrollToFirstError
    >
      <Tabs destroyInactiveTabPane animated={false}>
        <Tabs.TabPane key="mail" tab="邮箱注册">
          <Form.Item
            hasFeedback={true}
            name="username"
            rules={[
              {
                type: 'email',
                message: '请输入有效的邮箱',
              },
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
          >
            <AutoComplete options={options} onSearch={onSearch}>
              <Input placeholder="E-mail" prefix={<MailTwoTone className={styles.prefixIcon} />} />
            </AutoComplete>
            {/* <Input placeholder="E-mail" /> */}
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane key="mobile" tab="手机注册">
          <Form.Item
            name="username"
            rules={[
              {
                message: '请输入正确的手机号码',
                pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
              },
              { required: true, message: '请输入手机号码' },
            ]}
          >
            <Input
              placeholder="手机号码"
              prefix={<MobileTwoTone className={styles.prefixIcon} />}
              style={{ width: '100%' }}
            />
          </Form.Item>

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
        </Tabs.TabPane>
      </Tabs>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockTwoTone className={styles.prefixIcon} />} placeholder="密码" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入确认密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次密码不一致');
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockTwoTone className={styles.prefixIcon} />}
          placeholder="再次确认密码"
        />
      </Form.Item>

      <Agreement></Agreement>
      <Form.Item className={styles.center}>
        <Button loading={submitting} size="middle" type="primary" htmlType="submit">
          注册
        </Button>
        <Link to="/user/login">
          <Button size="middle" type="link">
            返回登陆
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-register">
      <RegistrationForm />
    </div>
  </div>
);
