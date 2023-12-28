import Header from './header';
import Sidebar from './sidebar';
import Content from './content';

export default function BasicLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
}
