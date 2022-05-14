/**
 * name: 通知提示
 * author: chaoyu
 * e-mail: chaoyumail@126.com
 * create_date: 2022-05-13 11:00:28
 */

import { useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
// import classNames from 'classnames';
import { Badge } from 'antd';
import styles from './style.less';

const NoticeIconView = () => {
  // return <NoticeIcon />;
  const [count] = useState(1);
  return (
    <Badge
      count={count}
      style={{
        boxShadow: 'none',
      }}
      className={styles.badge}
    >
      <BellOutlined className={styles.icon} />
    </Badge>
  );
};

export default NoticeIconView;
