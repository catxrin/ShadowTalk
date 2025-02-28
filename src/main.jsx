import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
    <RouterProvider router={router} />
  </SnackbarProvider>
);
