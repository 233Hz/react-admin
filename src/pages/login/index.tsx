import { useState } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import {
  AlipayCircleOutlined,
  GithubOutlined,
  LeftOutlined,
  LockOutlined,
  QqOutlined,
  RightOutlined,
  SafetyOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import LoginSwitchPanelBg from '@/assets/images/login/login-switch-panel-bg.jpg';
import RegisterSwitchPanelBg from '@/assets/images/login/register-switch-panel-bg.jpg';

const iconsItem = classNames('mx-4', 'text-[#00000040]', 'hover:text-[#fec7d7]');
const formPanel = classNames(
  'absolute',
  'left-0',
  'top-0',
  'w-full',
  'h-full',
  'justify-center',
  'items-center',
  'bg-cover',
  'transition-all',
  'duration-300',
  'ease-in'
);

interface FormProps {
  status: boolean;
}

interface LoginFormProps extends FormProps {}

const LoginForm: React.FC<LoginFormProps> = ({ status }) => {
  return (
    <div className={formPanel} style={{ opacity: status ? 1 : 0, zIndex: status ? 10 : 0 }}>
      <div className="h-full flex flex-col justify-center items-center">
        <h2 className="text-[26px] text-[700] leading-[2.6]">登录</h2>
        <Form name="login-form" size="large" className="w-[300px]">
          <Form.Item name="username">
            <Input prefix={<UserOutlined className="text-[#00000040]" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password">
            <Input prefix={<LockOutlined className="text-[#00000040]" />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item name="captcha">
            <Input
              prefix={<SafetyOutlined className="text-[#00000040]" />}
              suffix={<img src="https://picsum.photos/120/40" className="w-[120px] h-[40px]" />}
              placeholder="验证码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
        </Form>
        <Divider className="text-[#00000040]" plain>
          <span className="text-[#00000040]">第三方登录</span>
        </Divider>
        <div>
          <GithubOutlined className={iconsItem} />
          <WechatOutlined className={iconsItem} />
          <AlipayCircleOutlined className={iconsItem} />
          <QqOutlined className={iconsItem} />
        </div>
      </div>
    </div>
  );
};

interface RegisterFormProps extends FormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({ status }) => {
  return (
    <div className={formPanel} style={{ opacity: status ? 0 : 1, zIndex: status ? 0 : 10 }}>
      <div className="h-full flex flex-col justify-center items-center">
        <h2 className="text-[26px] text-[700] leading-[2.6]">注册</h2>
        <Form name="register-form" size="large" className="w-[300px]">
          <Form.Item name="username">
            <Input prefix={<UserOutlined className="text-[#00000040]" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password">
            <Input prefix={<LockOutlined className="text-[#00000040]" />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const switchPanel = classNames(
  'absolute',
  'left-0',
  'top-0',
  'w-full',
  'h-full',
  'bg-no-repeat',
  'bg-center',
  'bg-cover',
  'transition-all',
  'duration-600',
  'ease-in-out'
);
const switchPanelBtn = classNames(
  'w-[200px]',
  'h-[32px]',
  'leading-[32px]',
  'absolute',
  'left-1/2',
  'ml-[-100px]',
  'text-white',
  'text-center',
  'rounded-md',
  'bg-[rgba(0,0,0,0.5)]',
  'hover:(bg-[rgba(0,0,0,0.6)])',
  'bottom-[20px]',
  'cursor-pointer'
);
const Login: React.FC = () => {
  const [status, setStatus] = useState(true);
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="w-[800px] h-[500px] relative shadow-2xl rounded-lg overflow-hidden">
        <div
          className="w-[300px] h-full absolute left-0 top-0  transition-all duration-300 ease-in"
          style={{ left: status ? '500px' : '0' }}>
          <div
            className={switchPanel}
            style={{
              opacity: status ? 0 : 1,
              zIndex: status ? 0 : 20,
              backgroundImage: `url(${LoginSwitchPanelBg})`,
            }}>
            <div onClick={() => setStatus(true)} className={switchPanelBtn}>
              <LeftOutlined className="mr-2" />
              去登录
            </div>
          </div>
          <div
            className={switchPanel}
            style={{
              opacity: status ? 1 : 0,
              zIndex: status ? 20 : 0,
              backgroundImage: `url(${RegisterSwitchPanelBg})`,
            }}>
            <div onClick={() => setStatus(false)} className={switchPanelBtn}>
              去注册 <RightOutlined className="ml-2" />
            </div>
          </div>
        </div>
        <div
          className="w-[500px] h-full absolute right-0 top-0 bg-white transition-all duration-300 ease-in"
          style={{ right: status ? '300px' : '0' }}>
          <LoginForm status={status} />
          <RegisterForm status={status} />
        </div>
      </div>
    </div>
  );
};

export default Login;
