import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../../helpers/socket';
import useFetch from '../../helpers/useFetch';

import { ChatContext } from '../../context/ChatProvider';
import { UserContext } from '../../context/UserProvider';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

export default function Chat() {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [messages, setMessages] = useState([]);

  const { setCurrentChat, bumpConversation } = useContext(ChatContext);

  useEffect(() => {
    useFetch({ url: 'conversation/' + id }).then(res => {
      const msg = res.messages ? res.messages : [];
      setCurrentChat(res);
      setMessages(msg);
    });
  }, [id]);

  useEffect(() => {
    socket.on('messages', data => {
      bumpConversation(data.conversationId);
      if ([id, user._id].includes(data.message.author?._id)) setMessages(prev => [...prev, data.message]);
    });

    socket.on('deleted_message', data => {
      if ([id, user._id].includes(data.author)) setMessages(prev => prev.filter(m => m._id !== data.messageId));
    });

    socket.on('edit_message', updatedMessage => {
      if ([id, user._id].includes(updatedMessage.author._id))
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
      <ChatBar />
      <ChatBody messages={messages} />
      <ChatInput />
    </div>
  );
}
