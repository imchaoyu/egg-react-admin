import RightContent from './components/RightContent';
// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: 'admin' };
}

export const layout = ({initialState}) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    siderWidth: 180,
    headerHeight: 42,
    layout: 'mix',
    fixedHeader: true,
    fixSiderbar: true,
    rightContentRender: () => <RightContent />,
    menuHeaderRender: undefined,
    waterMarkProps: {
      content: initialState?.name
    }
  };
};
