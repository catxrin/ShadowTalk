import useFetch from '../useFetch';

export const saveChat = partnerId => {
  return useFetch({ url: `conversation/${partnerId}/save`, method: 'PATCH' });
};

export const getChatsByType = (chats, userId, type) => {
  const savedStatus = type === 'direct' ? false : true;
  let result = chats?.filter(chat => chat.saved === savedStatus);
  result = result?.map(el => el?.participants.filter(p => p._id !== userId)[0]);
  return result;
};
