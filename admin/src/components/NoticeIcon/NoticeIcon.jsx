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
