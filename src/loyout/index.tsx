import Header from './header';
import Sidebar from './sidebar';
import Content from './content';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

const BasicLayout: React.FC = () => {
  const { token } = useAuthStore();
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
