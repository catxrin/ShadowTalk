import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { router } from './router/router';

import UserProvider from './UserProvider';
import './index.css';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </SnackbarProvider>
);
