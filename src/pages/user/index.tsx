import React, { useState } from 'react';
import { Link } from 'umi';
import logo from '@/assets/logo.svg';
import styles from './style.less';

const Login: React.FC<{}> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.lang}>{/* <SelectLang /> */}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>平台名称</span>
            </Link>
          </div>
          <div className={styles.desc}>这里是平台简介信息</div>
        </div>
        <div className={styles.main}>{props.children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
