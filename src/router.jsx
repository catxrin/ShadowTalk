import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import App from './App';

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
    ],
  },
  { path: '*', element: <>Not found</> },
]);
