import useFetch from './useFetch';
import { enqueueSnackbar } from 'notistack';

export const userRegister = data => {
  useFetch({ url: 'auth/register', body: data, method: 'POST' }).then(() => {
    enqueueSnackbar('Registration successful.', { variant: 'success', autoHideDuration: 2000 });
  });
};
