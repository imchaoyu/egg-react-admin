import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => {
  return <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />;
};

export default HeaderDropdown;
