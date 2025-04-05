import { createContext, useContext, useMemo, useState } from 'react';
import { UserContext } from './UserProvider';

export const ChatContext = createContext(null);

export default function ChatProvider({ children }) {
  const { user } = useContext(UserContext);

  const [chat, setChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState(null);

  const setCurrentChat = chatData => {
    setChat(chatData);
  };

  const setSearchValue = searchValue => {
    setSearch(searchValue);
  };

  const partner = useMemo(() => {
    if (!chat?.participants) return search;
    return chat?.participants.find(participant => participant.user._id !== user?._id);
  }, [chat]);

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
        partner,
        setSearchValue,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
