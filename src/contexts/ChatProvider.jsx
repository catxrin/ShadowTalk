import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from './UserProvider';
import { useParams } from 'react-router-dom';

export const ChatContext = createContext(null);

export default function ChatProvider({ children }) {
  const { user } = useContext(UserContext);

  const { id } = useParams();

  const [chat, setChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState(null);
  const [participants, setParticipants] = useState({});

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

  useEffect(() => {
    if (chat?._id) {
      setParticipants({
        [chat?.participants[0]?.user?._id]: chat?.participants[0],
        [chat?.participants[1]?.user?._id]: chat?.participants[1],
      });
    } else {
      setParticipants({
        [id]: { theme: 'Default', nickname: partner?.user?.username, ...partner },
        [user?._id]: { theme: 'Default', nickname: user?.username, user: { ...user } },
      });
    }
  }, [chat, partner]);

  const toggleSavedConversation = conversation => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv._id === conversation._id) return { ...conv, saved: !conv?.saved };

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
        participants,
        conversations,
        setCurrentChat,
        setSearchValue,
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
