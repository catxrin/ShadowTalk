import useFetch from './useFetch';
import { enqueueSnackbar } from 'notistack';

export const userRegister = data => {
  return useFetch({ url: 'auth/register', body: data, method: 'POST' }).then(() => {
    enqueueSnackbar('Registration successful.', { variant: 'success', autoHideDuration: 2000 });
  });
};

export const userLogin = data => {
  return useFetch({ url: 'auth/login', body: data, method: 'POST' }).then(() => {
    enqueueSnackbar('Login successful.', { variant: 'success', autoHideDuration: 2000 });
  });
};
