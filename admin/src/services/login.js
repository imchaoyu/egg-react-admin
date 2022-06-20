import { request } from 'umi';

export async function getPublicKey(data, options) {
  return request('/key', {
    data,
    ...(options || {}),
  });
}

export async function login(data, options) {
  return request('/login', {
    data,
    ...(options || {}),
  });
}

export async function demo(data, options) {
  return request('/decodeDemo', {
    data,
    ...(options || {}),
  });
}
