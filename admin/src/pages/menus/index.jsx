/**
 * name: 栏目管理
 * author: chaoyu
 * e-mail: chaoyumail@126.com
 * create_date: 2022-05-16 11:46:34
 */

import { useState } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import columns from './column';
import { getMenus, updateMenus } from '@/services/web';

const Menus = () => {
  const [formVisible, setFormVisible] = useState(false);
  // 状态
  const onToggleStatus = async (record) => {
    if (record.status === 1) {
      record.status = 0;
    } else if (record.status === 0) {
      record.status = 1;
    }
    const res = await updateMenus(record);
    console.log('res: ', res);
    console.log(record);
  };
  //
  const onSubmitNewMenus = async (value) => {
    console.log(value);
  };
  // 操作栏
  const options = {
    title: '操作',
    key: 'options',
    valueType: 'option',
    width: 120,
    fixed: 'right',
    render: (_, record) => [
      <Button type="link" key="status" size="small" onClick={() => onToggleStatus(record)}>
        {record.status === 1 ? '停用' : '启用'}
      </Button>,
      <Button key="edit" type="link" size="small">
        编辑
      </Button>,
      <Button key="del" type="link" danger size="small">
        删除
      </Button>,
    ],
  };
  return (
    <PageContainer>
      <ProTable
        headerTitle="栏目列表"
        columns={[...columns, options]}
        request={getMenus}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setFormVisible(true)}>
            创建栏目
          </Button>,
        ]}
      />
      {/* 编辑/新增 */}
      <ModalForm
        title="新增栏目"
        width="400px"
        layout="horizontal"
        visible={formVisible}
        onVisibleChange={setFormVisible}
        onFinish={onSubmitNewMenus}
      >
        <ProFormText
          width="md"
          label="名称"
          name="name"
          placeholder="请输入栏目名称"
          rules={[{ required: true, message: '请输入栏目名称' }]}
        />
        <ProFormText
          width="md"
          label="链接"
          name="link"
          tooltip="浏览器中url的地址,请以'/'开头"
          placeholder="请输入栏目链接"
          rules={[{ required: true, message: '请输入栏目链接' }]}
        />
        <ProFormSelect
          valueEnum={{
            close: '关闭',
            open: '开启',
          }}
          value="close"
          width="xs"
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择状态' }]}
        />
        <ProFormText width="md" label="排序" name="order" />
      </ModalForm>
    </PageContainer>
  );
};

export default Menus;
