import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

export default function ChatProvider({ children }) {
  const [chat, setChat] = useState(null);
  const [conversations, setConversations] = useState([]);

  const setCurrentChat = chatData => {
    setChat(chatData);
  };

  const saveConversation = conversation => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv._id === conversation._id) return { ...conv, saved: true };

        return conv;
      })
    );
    setChat({ ...chat, saved: !chat.saved });
  };

  const unsaveConversation = conversation => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv._id === conversation._id) return { ...conv, saved: false };

        return conv;
      })
    );
    setChat({ ...chat, saved: !chat.saved });
  };

  const bumpConversation = conversationId => {
    setConversations(prev => {
      const index = prev.findIndex(conv => conv._id === conversationId);

      if (index === -1) return prev;
      const [movedConversation] = prev.splice(index, 1);

      return [movedConversation, ...prev];
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        setCurrentChat,
        setConversations,
        saveConversation,
        unsaveConversation,
        conversations,
        bumpConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
