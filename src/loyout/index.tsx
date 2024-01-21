import Header from './header';
import Sidebar from './sidebar';
import Content from './content';
import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';

const BasicLayout: React.FC = () => {
  const { token } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
};

export default BasicLayout;
