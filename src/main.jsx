import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router';
import UserProvider from './contexts/UserProvider';

import './index.css';
import './config/i18n';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </SnackbarProvider>
);
