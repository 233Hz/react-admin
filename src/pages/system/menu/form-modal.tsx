import { Cascader, Form, Input, Modal, Radio, Select, Switch } from 'antd';
import { DataType, MenuType } from './interface';
import { useRequest } from '@/hoooks/use-request';
import menuApi from './api';
import { useState } from 'react';

interface Props {
  type: 'add' | 'edit';
  show: boolean;
  close: () => void;
}

const FormModal: React.FC<Props> = ({ type, show: open, close }) => {
  const { data: selectTree } = useRequest(menuApi.getSelectTree);

  const [selectOptions, setSelectOptions] = useState<any[]>([]);
  const loadSelectTree = (selectedOptions: any[]) => {
    console.log(selectedOptions);
  };
  const [form] = Form.useForm<DataType>();
  const handleCancel = () => {
    form.resetFields();
    close();
  };
  const onFinish = (values: DataType) => {
    form.resetFields();
    close();
  };
  return (
    <Modal
      title={type === 'add' ? '新增菜单' : type === 'edit' ? '修改菜单' : '-'}
      centered
      open={open}
      okText="确认"
      cancelText="取消"
      onOk={() => form.submit()}
      onCancel={handleCancel}>
      <Form<DataType> form={form} name="menu-form" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
        <Form.Item label="父级菜单" name="pid">
          <Cascader
            expandTrigger="hover"
            loadData={loadSelectTree}
            displayRender={(labels: string[]) => labels[labels.length - 1]}
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                      {
                        value: 'xihu',
                        label: 'West Lake',
                      },
                    ],
                  },
                ],
              },
              {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                  {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                      {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                      },
                    ],
                  },
                ],
              },
            ]}
            placeholder="请选择父级菜单"
          />
        </Form.Item>
        <Form.Item label="权限名称" name="name" rules={[{ required: true, message: '请输入权限名称' }]}>
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item label="权限编号" name="code" rules={[{ required: true, message: '请输入权限编号' }]}>
          <Input placeholder="请输入权限编号" />
        </Form.Item>
        <Form.Item label="权限类型" name="type" rules={[{ required: true, message: '请选择权限类型' }]}>
          <Radio.Group
            options={[
              {
                label: '菜单',
                value: MenuType.MENU,
              },
              {
                label: '按钮',
                value: MenuType.BUTTON,
              },
            ]}
            onChange={() => {}}
            optionType="button"
          />
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.type !== curValues.type}>
          {({ getFieldValue }) => {
            let type = getFieldValue('type');
            if (type === MenuType.MENU) {
              return (
                <>
                  <Form.Item label="菜单路径" name="path" rules={[{ required: true, message: '请填写菜单路径' }]}>
                    <Input placeholder="请输入菜单路径" />
                  </Form.Item>
                  <Form.Item label="图标" name="icon">
                    <Select
                      onChange={() => {}}
                      options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                      ]}
                      placeholder="请选择图标"
                    />
                  </Form.Item>
                  <Form.Item label="重定向地址" name="redirect">
                    <Input placeholder="请输入重定向地址" />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item
                      label="是否缓存页面"
                      name="isKeepAlive"
                      style={{ display: 'inline-block', width: '50%', paddingLeft: '20px' }}>
                      <Switch checkedChildren="是" unCheckedChildren="否" />
                    </Form.Item>
                    <Form.Item
                      label="是否显示菜单"
                      name="isShow"
                      style={{ display: 'inline-block', width: '50%', paddingLeft: '20px' }}>
                      <Switch checkedChildren="开启" unCheckedChildren="否" defaultChecked />
                    </Form.Item>
                  </Form.Item>
                </>
              );
            }
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
