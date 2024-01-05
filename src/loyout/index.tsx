import Header from './header';
import Sidebar from './sidebar';
import Content from './content';

const BasicLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
};

export default BasicLayout;
