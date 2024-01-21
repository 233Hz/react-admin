import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ExclamationCircleFilled, LoginOutlined, MenuOutlined } from '@ant-design/icons';
import { IconDuoyuyan } from '@/assets/icons/duoyuyan';
import { IconMoon } from '@/assets/icons/moon';
import { IconTaiyang } from '@/assets/icons/taiyang';
import { defaultSetting } from '../default-setting';
import { IconShengdanye } from '@/assets/icons/shengdanye';
import { useGlobalStore } from '@/store/global';
import Avatar from './avatar';
import { useTranslation } from 'react-i18next';
import { antdUtils } from '@/utils/antd';
import loginApi from '@/pages/login/api';
import { useUserStore } from '@/store/user';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { collapsed, setCollapsed, darkMode, setDarkMode } = useGlobalStore();
  const { clearInfo } = useUserStore();
  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: '中文',
      onClick: menuInfo => {
        i18n.changeLanguage(menuInfo.key);
      },
    },
    {
      key: 'en',
      label: 'English',
      onClick: menuInfo => {
        i18n.changeLanguage(menuInfo.key);
      },
    },
  ];
  const logout = () => {
    antdUtils.modal?.confirm({
      title: '是否确认退出登录?',
      icon: <ExclamationCircleFilled />,
      okText: '退出登录',
      cancelText: '取消',
      async onOk() {
        const [error] = await loginApi.logout();
        if (error) antdUtils.message?.error('退出登录失败');
        clearInfo();
      },
    });
  };
  return (
    <div className="h-[60px] flex fixed top-0 left-0 right-0 bg-container primary">
      <div
        style={{ width: defaultSetting.sidebarWidth }}
        className="<md:hidden flex items-center gap-[4px] px-[10px] cursor-pointer">
        <IconShengdanye className="text-[24px] text-[#fec7d7] dark:text-[#f9bc60]" />
        <h1 className="text-[24px] font-bold text-[#fec7d7] dark:text-[#f9bc60]">{t('logo')}</h1>
      </div>
      <div className="flex-1 flex justify-between items-center px-[16px]">
        <div className="flex items-center">
          <div className="btn-icon" onClick={() => setCollapsed(!collapsed)}>
            <MenuOutlined />
          </div>
        </div>
        <div className="flex justify-end items-center gap-[16px]">
          <Dropdown menu={{ items }}>
            <div className="btn-icon">
              <IconDuoyuyan />
            </div>
          </Dropdown>
          <div className="btn-icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <IconTaiyang /> : <IconMoon />}
          </div>
          <div className="btn-icon" onClick={logout}>
            <LoginOutlined />
          </div>
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default Header;
