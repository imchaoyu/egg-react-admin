const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '链接',
    dataIndex: 'link',
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      0: {
        status: 'default',
        text: '关闭',
      },
      1: {
        status: 'processing',
        text: '开启',
      },
    },
  },
  {
    title: '排序',
    dataIndex: 'order',
    sorter: (a, b) => a.order - b.order,
  },
];

export default columns;
