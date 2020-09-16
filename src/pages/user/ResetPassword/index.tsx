import styles from './index.less';
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, history, History, useModel } from 'umi';
import { LockTwoTone } from '@ant-design/icons';
import { RouterTypes } from '@ant-design/pro-layout/lib/typings';
import { AccountResetPassword } from '@/services/resetPassword';

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

export default (props: RouterTypes<any>) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      const msg = await AccountResetPassword({
        ...values,
        ...props.match.params,
      });
      if (msg.jwt) {
        message.success('密码重置成功！');
        setInitialState({
          ...initialState,
          userInfo: msg,
        });
        // history.push('/welcome');
        replaceGoto();
        return;
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      message.error('密码重置失败！');
    }
    setSubmitting(false);
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
        name="passwordConfirmation"
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

      <Form.Item className={styles.center}>
        <Button loading={submitting} size="middle" type="primary" htmlType="submit">
          修改密码
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
