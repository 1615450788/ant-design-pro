import React from 'react';
import styles from './index.less';
import { Card } from 'antd';

export default (props: any) => (
  <div className={styles.container}>
    <div id="components-card-demo-simple">
      <Card style={{ width: 500 }}>{props.children}</Card>
    </div>
  </div>
);
