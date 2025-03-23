import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../../helpers/socket';
import useFetch from '../../helpers/useFetch';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

export default function Chat() {
  const partnerId = useParams()?.id;
  const [chatPartner, setChatPartner] = useState(null);
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    useFetch({ url: 'user/' + partnerId }).then(res => {
      setChatPartner(res);
    });
    useFetch({ url: 'conversation/' + partnerId }).then(res => {
      const msg = res.messages ? res.messages : [];
      setMessages(msg);
      setConversation(res);
    });
  }, [partnerId]);

  useEffect(() => {
    socket.on('messages', data => setMessages(data));
    socket.on('saved', isSaved => setConversation(prev => ({ ...prev, saved: isSaved })));

    return () => {
      socket.off('messages');
      socket.off('saved');
    };
  }, []);

  return (
    <div className='w-full h-full justify-between flex flex-col'>
      <ChatBar partner={chatPartner} chatSaved={conversation?.saved} />
      <ChatBody messages={messages} />
      <ChatInput socket={socket} />
    </div>
  );
}
