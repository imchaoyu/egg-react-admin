/**
 * name: 头部下拉
 * author: chaoyu
 * create_date: 2022-05-12 13:36:42
 */
import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => {
  return <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />;
};

export default HeaderDropdown;
