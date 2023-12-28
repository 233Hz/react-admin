import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'virtual:windi.css';
import './utils/i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);
