import { request } from 'umi';

export async function getPublicKey(data, options) {
  return request('/key', {
    method: 'GET',
    data,
    ...(options || {}),
  });
}

export async function login(data, options) {
  return request('/login', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function demo(data, options) {
  return request('/decodeDemo', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
