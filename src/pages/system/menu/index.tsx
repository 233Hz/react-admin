import ExpandLayout from '@/components/expand-layout';
import { CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Table, TableProps, Tag } from 'antd';

interface DataType {
  id: number;
  name: string;
  code: string;
  type: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '菜单编号',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type }) => {
      if (type !== 1 && type !== 2) return '-';
      return <Tag color={type === 1 ? 'green' : 'blue'}>{type === 1 ? '菜单' : '按钮'}</Tag>;
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>
          <EditOutlined />
          修改
        </a>
        <a>
          <DeleteOutlined />
          删除
        </a>
      </Space>
    ),
  },
];

const Menu: React.FC = () => {
  const [form] = Form.useForm();
  const onSearch = () => {};
  return (
    <>
      <Card>
        <Form form={form} name="menu_search" onFinish={onSearch}>
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
              <Button type="primary" icon={<SearchOutlined />}>
                查询
              </Button>,
              <Button icon={<CloseOutlined />}>重置</Button>,
            ]}
          />
        </Form>
      </Card>
      <Card className="mt-[16px]">
        <Table
          columns={columns}
          dataSource={[
            { id: 1, name: '菜单1', code: 'code1', type: 1 },
            { id: 2, name: '菜单2', code: 'code2', type: 2 },
          ]}
        />
      </Card>
    </>
  );
};

export default Menu;
