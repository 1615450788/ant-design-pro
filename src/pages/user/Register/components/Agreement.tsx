import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Form, Checkbox, Modal, Button } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';

export const Agreement: React.FC<FormItemProps> = (props: FormItemProps) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    console.error('handleOk', checked);
    setChecked(true);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Form.Item
        hasFeedback={true}
        rules={[
          {
            type: 'boolean',
            required: true,
            validator: (rules, value) => {
              return value ? Promise.resolve() : Promise.reject('');
            },
          },
        ]}
        name="agreement"
        valuePropName="checked"
        initialValue={checked}
        style={{ textAlign: 'center' }}
      >
        <Checkbox checked={checked} defaultChecked={checked}>
          我已阅读并同意 <a href=""></a>
          <a href={'#'} onClick={showModal}>
            《开发者协议》
          </a>
        </Checkbox>
      </Form.Item>
      <Modal
        title="开发者协议"
        visible={visible}
        footer={null}
        okText="同意"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
