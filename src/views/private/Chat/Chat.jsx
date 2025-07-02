import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../../../helpers/socket';

import { ChatContext } from '../../../contexts/ChatProvider';
import { UserContext } from '../../../contexts/UserProvider';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

export default function Chat() {
  const { chatId } = useParams();

  const { user } = useContext(UserContext);
  const { bumpConversation, setConversations, chat } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(chat?.messages || []);
  }, [chat]);

  useEffect(() => {
    socket.on('messages', data => {
      bumpConversation(data.conversation);
      if ([chatId, user._id].includes(data.message.author)) setMessages(prev => [...prev, data.message]);
    });

    socket.on('deleted_conversation', conversationId => {
      setConversations(prev => prev.filter(id => id !== conversationId));
    });

    socket.on('deleted_message', data => {
      if ([chatId, user._id].includes(data.author)) setMessages(prev => prev.filter(m => m._id !== data.messageId));
    });

    socket.on('edit_message', updatedMessage => {
      if ([chatId, user._id].includes(updatedMessage.author))
        setMessages(prev => prev.map(m => (m._id === updatedMessage._id ? updatedMessage : m)));
    });
    return () => {
      socket.off('messages');
      socket.off('deleted_message');
      socket.off('edit_message');
    };
  }, []);

  return (
    <div className='w-full h-full justify-between flex flex-col'>
      <ChatBar hasMessages={messages.length > 0} />
      <ChatBody messages={messages} />
      <ChatInput />
    </div>
  );
}
