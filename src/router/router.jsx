import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('../views/public/Login'));
const Register = lazy(() => import('../views/public/Register'));
const Landing = lazy(() => import('../views/public/LandingPage/Landing'));
const Public = lazy(() => import('../components/Layouts/Public'));
const Private = lazy(() => import('../components/Layouts/Private'));
const ChatSettings = lazy(() => import('../components/Chat/ChatSettings/Settings'));
const ChatCustomization = lazy(() => import('../components/Chat/ChatSettings/ChatCustomization'));
const Chat = lazy(() => import('../components/Chat/Chat'));

import NotFound from '../components/NotFound';
import ChatProvider from '../contexts/ChatProvider';

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
    children: [
      {
        path: '',
        element: (
          <ChatProvider>
            <Private />
          </ChatProvider>
        ),
        children: [{ path: ':id', element: <Chat /> }],
      },
      {
        path: ':id/settings',
        element: (
          <ChatProvider>
            <ChatSettings />
          </ChatProvider>
        ),
        children: [
          {
            path: 'chat_customization',
            element: <ChatCustomization />,
          },
          {
            path: 'user',
            element: <p>User</p>,
          },
          {
            path: 'danger_zone',
            element: <p>Danger Zone</p>,
          },
        ],
      },
    ],
  },

  { path: '*', element: <NotFound /> },
]);
