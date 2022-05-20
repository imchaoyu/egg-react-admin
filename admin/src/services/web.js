import { request } from 'umi';

export async function getMenus(data, options) {
  return request('/api/menus', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function updateMenus(data, options) {
  return request('/api/menus', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
