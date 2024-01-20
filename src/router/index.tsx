import { lazy, useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from 'antd';
import { antdUtils } from '@/utils/antd';
import BasicLayout from '@/loyout';
import NotFound from '@/pages/error/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    Component: BasicLayout,
    children: [
      {
        path: '/',
        element: <Navigate to="/index" />,
      },
      {
        path: '/index',
        Component: lazy(() => import('@/pages/index/index.tsx')),
      },
      {
        path: '/my',
        Component: lazy(() => import('@/pages/my/index.tsx')),
      },
    ],
  },
  {
    path: '/login',
    Component: lazy(() => import('@/pages/login/index.tsx')),
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

const Router: React.FC = () => {
  const { message, notification, modal } = App.useApp();
  useEffect(() => {
    antdUtils.setMessage(message);
    antdUtils.setNotification(notification);
    antdUtils.setModal(modal);
  }, [message, notification, modal]);
  return <RouterProvider router={router} />;
};

export default Router;
