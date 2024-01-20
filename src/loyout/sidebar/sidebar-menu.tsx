import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ContainerOutlined, PieChartOutlined } from '@ant-design/icons';
import { useGlobalStore } from '@/store/global';

const items: MenuProps['items'] = [
  {
    key: '/index',
    icon: <PieChartOutlined />,
    label: '首页',
  },
  {
    key: '/my',
    icon: <ContainerOutlined />,
    label: '我的',
  },
];

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { collapsed } = useGlobalStore();
  const routerMenu: MenuProps['onClick'] = menuItem => navigate(menuItem.key);
  return (
    <Menu
      className="h-full"
      mode="inline"
      inlineCollapsed={collapsed}
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={[pathname]}
      items={items}
      onClick={routerMenu}
    />
  );
};

export default SidebarMenu;
