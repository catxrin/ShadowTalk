import useFetch from './useFetch';
import { enqueueSnackbar } from 'notistack';

export const userRegister = data => {
  return useFetch({ url: 'auth/register', body: data, method: 'POST' }).then(() => {
    enqueueSnackbar('Registration successful.', { variant: 'success', autoHideDuration: 2000 });
  });
};

export const userLogin = data => {
  return useFetch({ url: 'auth/login', body: data, method: 'POST' }).then(res => {
    enqueueSnackbar('Login successful.', { variant: 'success', autoHideDuration: 2000 });
    return res;
  });
};

export const logout = () => {
  return useFetch({ url: 'auth/logout' }).then(() => {
    enqueueSnackbar('Logout successful.', { variant: 'success', autoHideDuration: 2000 });
  });
};
