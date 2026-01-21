import { useRoutes } from 'react-router-dom';

import routes from './routes';

export default function AppRouter() {
  const routesList = [];

  Object.entries(routes).forEach(([, value]) => {
    routesList.push(...value);
  });

  return useRoutes(routesList);
}
