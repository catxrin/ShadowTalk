import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../../helpers/socket';
import useFetch from '../../helpers/useFetch';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';
import { ChatContext } from '../../context/ChatProvider';

export default function Chat() {
  const partnerId = useParams()?.id;
  const [chatPartner, setChatPartner] = useState(null);
  const [messages, setMessages] = useState([]);

  const { setCurrentChat } = useContext(ChatContext);

  useEffect(() => {
    useFetch({ url: 'user/' + partnerId }).then(res => {
      setChatPartner(res);
    });
    useFetch({ url: 'conversation/' + partnerId }).then(res => {
      const msg = res.messages ? res.messages : [];
      setCurrentChat(res);
      setMessages(msg);
    });
  }, [partnerId]);

  useEffect(() => {
    socket.on('messages', data => setMessages(data));

    return () => {
      socket.off('messages');
    };
  }, []);

  return (
    <div className='w-full h-full justify-between flex flex-col'>
      <ChatBar partner={chatPartner} />
      <ChatBody messages={messages} />
      <ChatInput socket={socket} />
    </div>
  );
}
