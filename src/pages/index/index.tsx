import homeApi from './api';

const Index: React.FC = () => {
  return (
    <div>
      首页
      <button onClick={() => homeApi.logout()}>退出登入</button>
    </div>
  );
};

export default Index;
