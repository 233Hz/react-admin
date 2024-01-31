import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { DataType } from './interface';

interface Props {
  type: 'add' | 'edit';
}

const FormModal: React.FC<Props> = ({ type }) => {
  const [open, setOpen] = useState(true);
  const [form] = Form.useForm<DataType>();
  const onFinish = () => {};
  return (
    <Modal
      title={type === 'add' ? '新增菜单' : type === 'edit' ? '修改菜单' : '-'}
      centered
      open={open}
      okText="确认"
      cancelText="取消"
      width={1000}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}>
      <Form<DataType> form={form} name="menu-form" onFinish={onFinish}>
        <Form.Item label="父菜单" name="pid">
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item label="菜单名称" name="name">
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item label="菜单编号" name="code">
          <Input placeholder="请输入菜单编号" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
