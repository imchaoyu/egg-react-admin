import { request } from 'umi';

export async function currentUser(options) {
  return request('/api/currentUser', {
    ...(options || {}),
  });
}
