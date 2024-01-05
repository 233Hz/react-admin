import React, { lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
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
    path: '*',
    Component: NotFound,
  },
]);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
