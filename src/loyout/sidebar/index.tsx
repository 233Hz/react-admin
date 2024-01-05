import { useEffect } from 'react';
import useIsMobile from '@/hoooks/useMobile';
import { defaultSetting } from '../default-setting';
import { useGlobalStore } from '@/store/modules/global';
import { Drawer } from 'antd';
import SidebarMenu from './sidebar-menu';

const Sidebar: React.FC = () => {
  const isMobile = useIsMobile();
  const { collapsed, setCollapsed } = useGlobalStore();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile, setCollapsed]);

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        open={!collapsed}
        width={defaultSetting.sidebarWidth}
        closable={false}
        getContainer={false}
        onClose={() => setCollapsed(true)}>
        侧边栏
      </Drawer>
    );
  } else {
    return (
      <div
        style={{ width: collapsed ? defaultSetting.collapsedWidth : defaultSetting.sidebarWidth }}
        className="h-[calc(100vh-60px)] fixed left-0 bottom-0 primary">
        <SidebarMenu />
      </div>
    );
  }
};

export default Sidebar;
