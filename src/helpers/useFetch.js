import { enqueueSnackbar } from 'notistack';

export default function useFetch({ url, body, method = 'GET' }) {
  return fetch('/server/' + url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(async r => {
      const text = await r.text();
      const data = text ? JSON.parse(text) : {};

      return { response: data, status: r.status };
    })
    .then(({ response, status }) => {
      if (status < 200 || status > 299) {
        enqueueSnackbar(response?.message, { variant: 'error', autoHideDuration: 2000 });
        throw new Error(response?.message);
      }
      return response;
    })
    .catch(err => {
      enqueueSnackbar(err?.message, { variant: 'error', autoHideDuration: 2000 });
      throw err;
    });
}
