import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { defaultSetting } from '../default-setting';
import { useGlobalStore } from '@/store/global';
import useIsMobile from '@/hoooks/use-mobile';
import Tab from '../tab';

const Content: React.FC = () => {
  const isMobile = useIsMobile();
  const { collapsed } = useGlobalStore();
  const [tabs] = useState(Array.from({ length: 20 }, (_, i) => ({ key: i, name: `tab${i}` })));
  return (
    <div
      style={{
        width: `calc(100vw - ${
          isMobile ? 0 : collapsed ? defaultSetting.collapsedWidth : defaultSetting.sidebarWidth
        }px)`,
        marginLeft: collapsed ? defaultSetting.collapsedWidth : defaultSetting.sidebarWidth,
      }}
      className="h-[calc(100vh-60px)] fixed right-0 bottom-0 bg-[#f2f2f2] dark:bg-[#242629]">
      <Tab tabs={tabs} />
      <div className="h-[calc(100%-40px)] p-[16px]">
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Content;
