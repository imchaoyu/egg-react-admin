import { history, Link } from 'umi';
// import { PageLoading } from '@ant-design/pro-layout';

import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import RightContent from './components/RightContent';
import { currentUser as queryCurrentUser } from './services/account';
import {requestHandler} from '@/utils'



const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

// export const initialStateConfig = {
//   loading: <PageLoading />,
// };

// 初始全局数据
export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (err) {
      history.push(loginPath);
    }
    return undefined;
  };
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// 请求数据修改
export const request = requestHandler;

export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    onError: () => console.log('layout error tips!'),
    ErrorComponent: () => <div>错了</div>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: false,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" key={1}>
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key={2}>
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
