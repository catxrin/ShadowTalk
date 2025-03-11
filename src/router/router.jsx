import { createBrowserRouter } from 'react-router-dom';

import Login from '../views/public/Login';
import Register from '../views/public/Register';
import Landing from '../views/public/LandingPage/Landing';
import Public from '../components/Layouts/Public';
import Private from '../components/Layouts/Private';
import NotFound from '../components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Public />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
  {
    path: '/chat',
    element: <Private />,
    children: [
      {
        path: ':id',
        element: <p>Chat</p>,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
