import { history, Link } from 'umi';
import { notification } from 'antd';
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

// const authHeader = async (url, options) => {
//   console.log(`%c${options.url}:  ${options.method}`, 'color:blue', '-----请求参数', options.data);
//   // 传输数据加密
//   const encode = options.data && (await AESEncrypt(options.data));
//   const openid = (await getSession('openid', false)) || '';
//   // 头信息修改
//   const config = {
//     data: encode || null,
//     timeout: 5000,
//     headers: {
//       Accept: 'text/html',
//       'Content-Type': 'text/html; charset=utf-8',
//       'x-sys-openid': openid,
//     },
//   };
//   return {
//     url,
//     options: { ...options, ...config },
//   };
// };
// 请求错误处理
const errorHandler = (error) => {
  console.log('error: ', error);
  const { response } = error;
  if (response && response.status) {
    const { errCode, msg } = response;
    const errorText = msg || response.statusText || codeMessage[errCode];
    notification.error({
      message: errorText,
      description: '',
      duration: 20,
      key: 2,
    });
  }
  if (!response) {
    notification.error({
      description: '网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  throw error;
  // return response;
};
// 响应前拦截
const authHeaderInterceptor = (url, options) => {
  // const authHeader = { Authorization: 'Bearer xxxxxx' };
  const config = {
    timeout: 5000,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-sys-openid': '111',
    },
  };
  return {
    url,
    options: { ...options, ...config },
  };
};
// 响应后拦截
const responseInterceptors = (response) => {
  // response.headers.append('cy', 'yes yo');
  return response;
};
// request请求拦截
export const request = {
  prefix: '/api/v1',
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
  // requestInterceptors: [authHeader],
  // responseInterceptors: [code2data],
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
