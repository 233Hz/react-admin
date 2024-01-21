import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input } from 'antd';
import {
  AlipayCircleOutlined,
  GithubOutlined,
  LeftOutlined,
  LockOutlined,
  MailOutlined,
  QqOutlined,
  RightOutlined,
  SafetyOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import LoginSwitchPanelBg from '@/assets/images/login/login-switch-panel-bg.jpg';
import RegisterSwitchPanelBg from '@/assets/images/login/register-switch-panel-bg.jpg';
import { useRequest } from '@/hoooks/use-request';
import loginApi, { type LoginDTO } from './api';
import { useUserStore } from '@/store/user';
import { JSEncrypt } from 'jsencrypt';

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
  const { data: captcha, refresh: refreshCaptcha } = useRequest(loginApi.getCaptcha);
  const { runAsync: login, loading } = useRequest(loginApi.login, { manual: true });

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setTokenInfo } = useUserStore();

  const onFinish = async (values: LoginDTO) => {
    if (!captcha) return;
    values.captchaId = captcha.id;

    // 获取公钥
    const [publicKeyError, publicKey] = await loginApi.getPublicKey();
    if (publicKeyError) return;

    // 使用公钥对密码进行加密
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const password = encrypt.encrypt(values.password);

    if (!password) return;
    values.password = password;
    values.publicKey = publicKey;

    const [loginError, loginData] = await login(values);

    if (loginError) {
      refreshCaptcha();
      form.setFieldsValue({ captcha: null });
      return;
    }
    const { token, refreshToken } = loginData;
    setTokenInfo({ token, refreshToken });
    navigate('/');
  };

  return (
    <div className={formPanel} style={{ opacity: status ? 1 : 0, zIndex: status ? 10 : 0 }}>
      <div className="h-full flex flex-col justify-center items-center">
        <h2 className="text-[26px] text-[700] leading-[2.6]">登录</h2>
        <Form name="login-form" size="large" className="w-[300px]" form={form} onFinish={onFinish}>
          <Form.Item<LoginDTO> name="accountNumber" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined className="text-[#00000040]" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item<LoginDTO> name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<LockOutlined className="text-[#00000040]" />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item<LoginDTO> name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
            <Input
              prefix={<SafetyOutlined className="text-[#00000040]" />}
              suffix={<img src={captcha?.imageBase64} className="w-[120px] h-[40px]" onClick={refreshCaptcha} />}
              placeholder="验证码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
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
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined className="text-[#00000040]" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<LockOutlined className="text-[#00000040]" />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱' },
            ]}>
            <Input prefix={<MailOutlined className="text-[#00000040]" />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              注册
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
  'ease-in-out',
  'shadow-lg'
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
