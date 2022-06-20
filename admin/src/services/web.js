import { request } from 'umi';

export async function getMenus2(data, options) {
  return request('/api/menus', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function updateMenus(data, options) {
  return request('/api/menus', {
    data,
    ...(options || {}),
  });
}

export async function getMenus(data, options) {
  return request('/api/getMenus', {
    data,
    ...(options || {}),
  });
}
