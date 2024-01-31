import DynamicIcon from '@/components/dynamic-icon';
import ExpandLayout from '@/components/expand-layout';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Table, TableProps, Tag } from 'antd';
import { useRequest } from '@/hoooks/use-request';
import menuApi, { type MenuVO } from './api';
import { MenuType, type DataType, type QueryType } from './interface';
import { useCallback, useEffect, useState } from 'react';
import FormModal from './form-modal';

const Menu: React.FC = () => {
  const [query] = Form.useForm<QueryType>();
  const { loading, data, refresh } = useRequest(menuApi.getMenuTreeApi);
  const [dataSource, setDataSource] = useState<MenuVO[]>([]);
  const getMenuData = useCallback(
    (query?: QueryType) => {
      const { name, code } = query || {};
      if (name || code) {
        setDataSource(
          data?.filter(item => (name ? item.name === name : true) && (code ? item.code === code : true)) || []
        );
      } else {
        setDataSource(data || []);
      }
    },
    [data]
  );

  useEffect(() => {
    getMenuData();
  }, [getMenuData]);

  const onSearch = (values: QueryType) => {
    getMenuData(values);
  };
  const updateRow = (row: DataType) => {
    console.log(row);
  };

  const delRow = (id: number) => {
    console.log(id);
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '菜单编号',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
    {
      title: '菜单类型',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type }) => {
        if (type !== MenuType.MENU && type !== MenuType.BUTTON) return '-';
        return <Tag color={type === MenuType.MENU ? 'green' : 'blue'}>{type === MenuType.MENU ? '菜单' : '按钮'}</Tag>;
      },
      align: 'center',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path',
      align: 'center',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      render: (_, record) => record.icon && <DynamicIcon icon={record.icon} />,
      align: 'center',
    },
    {
      title: '重定向地址',
      dataIndex: 'redirect',
      key: 'redirect',
      align: 'center',
    },
    {
      title: '是否缓存页面',
      dataIndex: 'keepAlive',
      key: 'keepAlive',
      render: (_, { keepAlive }) => {
        if (keepAlive === undefined || keepAlive === null) return '-';
        return <Tag color={keepAlive ? 'blue' : 'red'}>{keepAlive ? '是' : '否'}</Tag>;
      },
      align: 'center',
    },
    {
      title: '是否不显示菜单',
      dataIndex: 'hidden',
      key: 'hidden',
      render: (_, { hidden }) => {
        if (hidden === undefined || hidden === null) return '-';
        return <Tag color={hidden ? 'blue' : 'red'}>{hidden ? '是' : '否'}</Tag>;
      },
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => updateRow(record)}>
            <EditOutlined />
            修改
          </a>
          <a onClick={() => delRow(record.id)}>
            <DeleteOutlined />
            删除
          </a>
        </Space>
      ),
      align: 'center',
    },
  ];
  return (
    <>
      <Card>
        <Form form={query} name="menu-search" onFinish={onSearch}>
          <ExpandLayout
            items={[
              <Form.Item label="菜单名称" name="name">
                <Input placeholder="请输入菜单名称" />
              </Form.Item>,
              <Form.Item label="菜单编号" name="code">
                <Input placeholder="请输入菜单编号" />
              </Form.Item>,
            ]}
            actions={[
              <Button htmlType="submit" type="primary" icon={<SearchOutlined />} key="search">
                查询
              </Button>,
              <Button icon={<CloseOutlined />} onClick={() => query.resetFields()} key="reset">
                重置
              </Button>,
              <Button icon={<ReloadOutlined />} onClick={() => refresh()} key="refresh">
                刷新
              </Button>,
              <Button icon={<PlusOutlined />} type="primary" onClick={() => refresh()} key="add">
                添加
              </Button>,
            ]}
          />
        </Form>
      </Card>
      <Card className="mt-[16px]">
        <Table rowKey="id" columns={columns} dataSource={dataSource} loading={loading} />
      </Card>
      <FormModal type="add" />
    </>
  );
};

export default Menu;
