import { Suspense, useEffect } from 'react';
import { useGlobalStore } from './store/modules/global';
import { ConfigProvider } from 'antd';
import Router from './router';

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
      <Suspense fallback={<div>loading...</div>}>
        <Router />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
