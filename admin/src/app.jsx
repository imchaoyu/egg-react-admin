import { history, Link } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import RightContent from './components/RightContent';
import { currentUser as queryCurrentUser } from './services/account';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

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

// 统一错误处理
const errorHandler = (err) => {
  console.log(err);
  // const codeMaps = {
  //   502: '网关错误。',
  //   503: '服务不可用，服务器暂时过载或维护。',
  //   504: '网关超时。',
  // };
};
// 响应前拦截
const authHeaderInterceptor = (url, options) => {
  const authHeader = { Authorization: 'Bearer xxxxxx' };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};
// 响应后拦截
const responseInterceptors = (response) => {
  // response.headers.append('cy', 'yes yo');
  return response;
};
// request请求拦截
export const request = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
};

export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    onError: () => console.log('error'),
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
