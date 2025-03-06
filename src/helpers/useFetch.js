import { enqueueSnackbar } from 'notistack';

export default function useFetch({ url, body, method = 'GET' }) {
  return fetch('/server/' + url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(async res => {
      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(response?.message || `Error ${response?.status}`);
      }
      return response;
    })
    .catch(err => {
      enqueueSnackbar(err?.message, { variant: 'error', autoHideDuration: 2000 });
      throw new Error(err);
    });
}
