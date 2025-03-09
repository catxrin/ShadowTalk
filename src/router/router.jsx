import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Login from '../views/public/Login';
import Register from '../views/public/Register';
import Landing from '../views/public/LandingPage/Landing';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
  { path: '*', element: <>Not found</> },
]);
