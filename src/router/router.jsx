import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('../views/public/Login'));
const Register = lazy(() => import('../views/public/Register'));
const Landing = lazy(() => import('../views/public/LandingPage/Landing'));
const Public = lazy(() => import('../components/Layouts/Public'));
const Private = lazy(() => import('../components/Layouts/Private'));
const ChatSettings = lazy(() => import('../views/private/Chat/ChatSettings/Settings'));
const ChatCustomization = lazy(() => import('../views/private/Chat/ChatSettings/ChatCustomization'));
const DangerZone = lazy(() => import('../views/private/Chat/ChatSettings/DangerZone'));
const Chat = lazy(() => import('../views/private/Chat/Chat'));
const ProfileCustomization = lazy(() => import('../views/private/ProfileSettings/ProfileCustomization'));
const ProfileDangerZone = lazy(() => import('../views/private/ProfileSettings/DangerZone'));
const Profile = lazy(() => import('../views/private/Profile/Profile'));
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
            path: 'customization',
            element: <ChatCustomization />,
          },
          {
            path: 'danger_zone',
            element: <DangerZone />,
          },
        ],
      },
    ],
  },
  {
    path: '/user/:id/settings',
    element: <ChatSettings />,
    children: [
      { path: 'customization', element: <ProfileCustomization /> },
      { path: 'danger_zone', element: <ProfileDangerZone /> },
    ],
  },
  { path: '/user/:id', element: <Profile /> },

  { path: '*', element: <NotFound /> },
]);
