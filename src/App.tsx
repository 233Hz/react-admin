import { useEffect } from 'react';
import BasicLayout from './loyout';
import { useGlobalStore } from './store/modules/global';
import { ConfigProvider } from 'antd';

function App() {
  const { darkMode } = useGlobalStore();
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ConfigProvider>
      <BasicLayout />
    </ConfigProvider>
  );
}

export default App;
