import useFetch from '../../hooks/useFetch';

export const saveChat = partnerId => {
  return useFetch({ url: `conversation/${partnerId}/save`, method: 'PATCH' });
};
