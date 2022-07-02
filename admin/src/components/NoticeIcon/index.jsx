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
