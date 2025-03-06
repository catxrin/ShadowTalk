import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
  { path: '*', element: <>Not found</> },
]);
