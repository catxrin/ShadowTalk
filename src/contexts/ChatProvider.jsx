import { createContext, useEffect, useState } from 'react';

export const ChatContext = createContext(null);

export default function ChatProvider({ children }) {
  const [chat, setChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [participants, setParticipants] = useState({});

  useEffect(() => {
    setParticipants({
      [chat?.participants[0]?._id]: chat?.participants[0],
      [chat?.participants[1]?._id]: chat?.participants[1],
    });
  }, [chat]);

  const toggleSavedConversation = conversation => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv._id === conversation._id) return { ...conv, saved: !conv?.saved };

        return conv;
      })
    );
    setChat({ ...chat, saved: !chat.saved });
  };

  const bumpConversation = conversationData => {
    setConversations(prev => {
      const index = prev.findIndex(conv => conv._id === conversationData._id);

      if (index === -1) return [conversationData, ...prev];
      const [movedConversation] = prev.splice(index, 1);

      return [movedConversation, ...prev];
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        participants,
        conversations,
        setChat,
        setParticipants,
        setConversations,
        bumpConversation,
        toggleSavedConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
