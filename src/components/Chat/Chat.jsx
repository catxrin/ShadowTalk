import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../Layouts/Private';
import useFetch from '../../helpers/useFetch';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

export default function Chat() {
  const partnerId = useParams()?.id;
  const [chatPartner, setChatPartner] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    useFetch({ url: 'user/' + partnerId }).then(res => {
      setChatPartner(res);
    });
    // useFetch({ url: 'conversation/' + partnerId }).then(res => {
    socket.emit('join_chat', 'nice');

    //   setMessages(res.messages);
    // });
  }, [partnerId]);

  useEffect(() => {
    socket.on('messages', data => setMessages(data));
  }, [messages]);

  return (
    <div className='w-full h-full justify-between flex flex-col'>
      <ChatBar partner={chatPartner} />
      <ChatBody messages={messages} />
      <ChatInput socket={socket} />
    </div>
  );
}
