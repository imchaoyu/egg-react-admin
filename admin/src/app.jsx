import { history, Link } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import RightContent from './components/RightContent';
import { currentUser as queryCurrentUser } from './services/account';
import { getSession, Encrypt, Decrypt } from '@/utils';
import Settings from '../config/defaultSettings';

const { isEncode } = Settings;
const prefix = '/api/v1';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
const IgnoreUrl = ['/key', loginPath];

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
  options.method = 'POST';
  isEncode &&
    console.log(
      `%c${options.url}:  ${options.method}`,
      'color:yellow',
      '-----请求参数',
      options.data,
    );
  // 传输数据加密
  if (isEncode) {
    // 不需要加密的api
    const isIgnoreUrl = IgnoreUrl.includes(options.url);
    options.data = isIgnoreUrl ? options?.data : await Encrypt(options?.data);
  }
  const sessionid = (await getSession('openid', false)) || '';
  // 头信息修改
  const config = {
    timeout: 5000,
    headers: {
      Accept: '*/*',
      'Content-Type': 'text/html;charset=UTF-8',
      'x-sys-sessionid': sessionid,
    },
  };
  return {
    url,
    options: { ...options, ...config },
  };
};
// 响应后拦截
const responseInterceptors = async (response) => {
  const path = response.url.split(prefix)[1];
  const isIgnoreUrl = IgnoreUrl.includes(path);
  if (!isEncode || isIgnoreUrl) return response;

  const encode = await response.clone().text();
  const res = await Decrypt(encode);
  console.log(`%c${path}:  ${response.status}`, 'color:green', '-----返回数据', res);
  return res;
};
// request请求拦截
export const request = {
  prefix,
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
