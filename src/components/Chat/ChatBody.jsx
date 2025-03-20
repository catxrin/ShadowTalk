import Message from './Message';
import { useRef, useEffect } from 'react';

export default function ChatBody({ messages, messageReceived }) {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages, messageReceived]);

  const formatDateAndTime = timestamp => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return ` ${date.toLocaleDateString('en-GB')}, ${hour}:${minutes <= 9 ? `0${minutes}` : minutes}`;
  };
  console.log(messages);
  return (
    <div className='bg-white/5 h-full mb-5 px-5 py-5 flex flex-col gap-6 max-h-[51rem] overflow-y-auto'>
      {messages?.map((m, i) => (
        <Message
          key={i}
          image={m?.author?.image}
          createdAt={formatDateAndTime(m?.createdAt)}
          body={m?.body}
          username={m?.author?.username}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}
