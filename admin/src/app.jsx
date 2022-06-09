import { history, Link } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import RightContent from './components/RightContent';
import { currentUser as queryCurrentUser } from './services/account';
import { getSession } from '@/utils';

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

/**
 * 响应体格式转换器
 * @param {Object} resData 请求返回的数据
 * @param {Object} ctx 请求信息，包含cache，req，res，responseInterceptors等
 * @returns 修改后的响应数据格式
 */
const errorConfigAdaptor = (resData, ctx) => {
  if (resData?.errorCode) {
    const res = {
      url: ctx.req.url,
      success: resData.errorCode === 200,
      showType: resData?.showType ?? 4,
      ...resData,
    };
    return res;
  }
  return resData;
};
/**
 * 响应前拦截，添加token头信息
 * @param {String} url 请求地址
 * @param {Object} options 请求信息
 * @returns 请求信息
 */
const authHeader = async (url, options) => {
  console.log(
    `%c${options.url}:  ${options.method}`,
    'color:yellow',
    '-----请求参数',
    options.data,
  );
  // 传输数据加密
  // const encode = options.data && (await AESEncrypt(options.data));
  const sessionid = (await getSession('openid', false)) || '';
  // 头信息修改
  const config = {
    // data: encode || null,
    timeout: 5000,
    headers: {
      // Accept: 'text/html',
      // 'Content-Type': 'text/html; charset=utf-8',
      Accept: '*/*',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-sys-sessionid': sessionid,
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
  requestInterceptors: [authHeader],
  responseInterceptors: [responseInterceptors],
  errorConfig: {
    adaptor: errorConfigAdaptor,
  },
};

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
