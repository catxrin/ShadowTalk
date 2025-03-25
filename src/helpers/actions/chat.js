import useFetch from '../useFetch';

export const saveChat = partnerId => {
  return useFetch({ url: `conversation/${partnerId}/save`, method: 'PATCH' });
};

export const getSavedChats = (chats, userId) => {
  let saved = chats?.filter(chat => chat.saved === true);
  saved = saved?.map(el => el?.participants.filter(p => p._id !== userId)[0]);
  return saved;
};

export const getDirectChats = (chats, userId) => {
  let direct = chats?.filter(chat => chat.saved === false);
  direct = direct?.map(el => el?.participants.filter(p => p._id !== userId)[0]);

  return direct;
};
