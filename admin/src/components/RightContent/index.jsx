/**
 * name: 顶部右侧
 * author: chaoyu
 * create_date: 2022-05-12 13:10:08
 */
import { Space } from 'antd';
import Avatar from './AvatarDropdown';
import styles from './style.less';

const RightContent = () => {
  let className = styles.right;
  return (
    <Space className={className}>
      <Avatar menu />
    </Space>
  );
};

export default RightContent;
