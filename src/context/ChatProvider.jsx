import { createContext, useState } from 'react';
import { getDirectChats, getSavedChats } from '../helpers/actions/chat';

export const ChatContext = createContext(null);

export default function ChatProvider({ children }) {
  const [chat, setChat] = useState(null);
  const [savedConversations, setSavedConversations] = useState(null);
  const [directConversations, setDirectConversations] = useState(null);

  const setCurrentChat = chatData => {
    setChat(chatData);
  };

  const saveConversation = conversation => {
    setSavedConversations([conversation, ...savedConversations]);
    setDirectConversations(directConversations.filter(x => x._id !== conversation._id));
    setChat({ ...chat, saved: !chat.saved });
  };

  const unsaveConversation = conversation => {
    setDirectConversations([conversation, ...directConversations]);
    setSavedConversations(savedConversations.filter(x => x._id !== conversation._id));
    setChat({ ...chat, saved: !chat.saved });
  };

  const setAllConversations = (conversations, userId) => {
    setSavedConversations(getSavedChats(conversations, userId));
    setDirectConversations(getDirectChats(conversations, userId));
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        setCurrentChat,
        savedConversations,
        saveConversation,
        directConversations,
        unsaveConversation,
        setAllConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
