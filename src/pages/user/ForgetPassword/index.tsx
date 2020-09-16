import styles from './index.less';
import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Tabs, AutoComplete, message } from 'antd';
import { Link, useModel, history } from 'umi';
import LoginFrom from '../Login/LoginFrom';
import { LockTwoTone, MailTwoTone, MobileTwoTone, UserOutlined } from '@ant-design/icons';
import { AccountForgetPassword } from '@/services/forgetPassword';
const { Tab, Username, Password, Mobile, Captcha, Submit } = LoginFrom;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await AccountForgetPassword(values);
      if (msg.ok) {
        message.info('验证邮件已发送！');
        history.push('/user/resetPassword');
        return;
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      message.error('验证邮件发送失败，请确认邮箱是否填写正确！');
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
            name="email"
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
            name="phone"
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

      <Form.Item className={styles.center}>
        <Button loading={submitting} size="middle" type="primary" htmlType="submit">
          发送验证码
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
