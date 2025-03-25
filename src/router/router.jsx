import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const Login = lazy(() => import('../views/public/Login'));
const Register = lazy(() => import('../views/public/Register'));
const Landing = lazy(() => import('../views/public/LandingPage/Landing'));
const Public = lazy(() => import('../components/Layouts/Public'));
const Private = lazy(() => import('../components/Layouts/Private'));
const Chat = lazy(() => import('../components/Chat/Chat'));
import NotFound from '../components/NotFound';
import ChatProvider from '../context/ChatProvider';

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
    element: (
      <ChatProvider>
        <Private />
      </ChatProvider>
    ),
    children: [
      {
        path: ':id',
        element: <Chat />,
      },
    ],
  },

  { path: '*', element: <NotFound /> },
]);
