/**
 * name: 图标提示信息及下拉
 * author: chaoyu
 * e-mail: chaoyumail@126.com
 * create_date: 2022-05-14 22:05:41
 */

import { BellOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Badge } from 'antd';
import styles from './style.less';

const NoticeIcon = (props) => {
  const { className, count, bell } = props;
  const noticeButtonClass = classNames(className, styles.noticeButton);
  // const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
  const trigger = (
    <span
      className={classNames(noticeButtonClass, {
        opened: visible,
      })}
    >
      <Badge
        count={count}
        style={{
          boxShadow: 'none',
        }}
        className={styles.badge}
      >
        {NoticeBellIcon}
      </Badge>
    </span>
  );
  return <div>{trigger}</div>;
};

export default NoticeIcon;
