import { request } from '@umijs/max';

export async function currentUser(options) {
  return request('/api/currentUser', {
    ...(options || {}),
  });
}
