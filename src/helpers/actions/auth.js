import { socket } from '../socket';
import { enqueueSnackbar } from 'notistack';

import useFetch from '../../hooks/useFetch';

export const register = (username, email, password) =>
  useFetch({ url: 'auth/register', body: { username, email, password }, method: 'POST' }).then(() => {
    socket.connect();

    enqueueSnackbar('Registration successful.', { variant: 'success', autoHideDuration: 2000 });
  });

export const login = (email, password) =>
  useFetch({ url: 'auth/login', body: { email, password }, method: 'POST' }).then(res => {
    socket.connect();

    enqueueSnackbar('Login successful.', { variant: 'success', autoHideDuration: 2000 });
    return res;
  });

export const logout = () =>
  useFetch({ url: 'auth/logout', noError: true }).then(() => {
    socket.disconnect();
    socket.removeAllListeners();

    enqueueSnackbar('Logout successful.', { variant: 'success', autoHideDuration: 2000 });
  });
