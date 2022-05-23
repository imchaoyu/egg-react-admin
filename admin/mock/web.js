import dayjs from 'dayjs';

const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: tableListDataSource.length,
      name: ['首页', '关于', '联系'][i % 3],
      link: ['/home', '/about', '/contact'][i % 3],
      order: index,
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 2,
      updatedAt: dayjs().format('YYYY-MM-DD'),
      createdAt: dayjs().format('YYYY-MM-DD'),
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 5);

function getMenus(req, res) {
  const body = req.body;
  const { current, pageSize } = body;
  const result = {
    data: tableListDataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${current}`, 10) || 1,
  };
  // return result;
  res.json(result);
}

export default {
  'POST /api/getMenus': getMenus,
};
