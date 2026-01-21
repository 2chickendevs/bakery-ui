import { lazy } from 'react';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));

let routes = {
  expense: [],
  default: [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
