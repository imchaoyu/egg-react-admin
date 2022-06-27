import { message, notification } from 'antd';
import { getSession, Encrypt, Decrypt } from '@/utils';
import Settings from '../../config/defaultSettings';

const { isEncode } = Settings;
const prefix = '/api/v1';
const IgnoreUrl = ['/key'];
/**
 * 响应前拦截，添加token头信息
 * @param {Object} options 请求信息
 * @returns 请求信息
 */
const authHeader = async (options) => {
  const url = prefix + options.url;
  options.method = 'post';
  // 传输数据加密
  if (isEncode && options.data) {
    console.log(
      `%c${options.url}:  ${options.method}-----请求参数`,
      'background:blue',
      options.data,
    );
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
    ...options,
    ...config,
    url,
  };
};
// 响应后拦截
const responseInterceptors = async (response) => {
  // 需要解密
  const { status, config, data } = response;
  const path = config.url.split(prefix)[1];
  const isIgnoreUrl = IgnoreUrl.includes(path);
  if (!isEncode || isIgnoreUrl) {
    return response;
  }
  // 解密
  const decode = await Decrypt(data);
  console.log(`%c${path}:  ${status}-----返回数据`, `background:${status === 200 && decode.errorCode === 200 ? 'green' : 'red'}`, decode);
  const res = { ...response, data: decode }
  return res;
};

// 错误抛出
const errorThrower = (res) => {
  const { data, errorCode, errorMessage, showType } = res;
  if (errorCode!==200) {
    const error = new Error(errorMessage);
    error.name = 'BizError';
    error.info = { errorCode, errorMessage, showType, data };
    throw error; // 抛出自制的错误
  }
}
// 错误接收及处理
const errorHandler = (error, opts) => {
  if (opts?.skipErrorHandler) throw error;
  // errorThrower 抛出的错误。
  if (error.name === 'BizError') {
    const errorInfo = error.info;
    if (errorInfo) {
      const { errorMessage, errorCode } = errorInfo;
      // 错误处理方案： 错误类型
      switch (errorInfo.showType) {
        case 0:
          break;
        case 1:
          message.warn(errorMessage);
          break;
        case 2:
          message.error(errorMessage);
          break;
        case 3:
          notification.open({
            description: errorMessage,
            message: errorCode,
          });
          break;
        case 9:
          // TODO: redirect
          break;
        default:
          message.error(errorMessage);
      }
    }
  } else if (error.response) {
    // Axios 的错误
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    message.error(error.response.statusText);
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    message.error('服务器未响应您的请求，请重试！');
  } else {
    // 发送请求时出了点问题
    message.error('发送失败，请再式一次！');
  }
}

export const requestHandler = {
  requestInterceptors: [authHeader],
  responseInterceptors: [responseInterceptors],
  errorConfig: {
    errorThrower,
    errorHandler,
  }
};
