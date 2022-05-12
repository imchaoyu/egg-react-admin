/**
 * name: 顶部右侧头像及下拉内容
 * author: chaoyu
 * create_date: 2022-05-12 13:34:35
 */

import { useCallback } from 'react';
import { history, useModel } from 'umi';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './style.less';

// 退出登录，保存当前url
const onLogout = async () => {
  // 接口退出
  // await fetchLogout();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  // 下拉点击事件
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        onLogout();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
  if (!initialState) {
    return loading;
  }
  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }
  // 下拉菜单
  const menuItems = [
    { key: 'center', label: '个人中心', icon: <UserOutlined /> },
    { key: 'settings', label: '个人设置', icon: <SettingOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: '退出登录', icon: <LogoutOutlined /> },
  ];
  const menuHeaderDropdown = menu && (
    <Menu items={menuItems} className={styles.menu} selectedKeys={[]} onClick={onMenuClick} />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
