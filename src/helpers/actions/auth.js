import useFetch from '../../hooks/useFetch';
import { enqueueSnackbar } from 'notistack';

export const register = (username, email, password) =>
  useFetch({ url: 'auth/register', body: { username, email, password }, method: 'POST' }).then(() => {
    enqueueSnackbar('Registration successful.', { variant: 'success', autoHideDuration: 2000 });
  });

export const login = (email, password) =>
  useFetch({ url: 'auth/login', body: { email, password }, method: 'POST' }).then(res => {
    enqueueSnackbar('Login successful.', { variant: 'success', autoHideDuration: 2000 });
    return res;
  });

export const logout = () =>
  useFetch({ url: 'auth/logout', noError: true }).then(() =>
    enqueueSnackbar('Logout successful.', { variant: 'success', autoHideDuration: 2000 })
  );
