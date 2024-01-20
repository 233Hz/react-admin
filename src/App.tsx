import { Suspense, useEffect } from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { useGlobalStore } from './store/global';
import Router from './router';

const App = () => {
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
      <Suspense fallback={<div>loading...</div>}>
        <AntdApp>
          <Router />
        </AntdApp>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
