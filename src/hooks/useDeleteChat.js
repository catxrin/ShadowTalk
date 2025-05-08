import { useState } from 'react';
import { socket } from '../helpers/socket';

export default function useDeleteChat() {
  const [error, setError] = useState(null);

  const deleteChat = async (chatId) => {
    if (!chatId) {
      setError('Invalid chat ID');
      return;
    }

    try {
      return new Promise((resolve, reject) => {
        socket.emit('delete_conversation', chatId, (response) => {
          if (response.error) {
            setError(response.error);
            reject(new Error(response.error));
          } else {
            setError(null);
            resolve(response);
          }
        });
      });
    } catch (err) {
      setError('Failed to delete chat');
      throw err;
    }
  };

  return {
    deleteChat,
    error,
  };
} 