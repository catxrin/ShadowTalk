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
  return (
    <div className='bg-white/5 h-full px-5 py-5 flex flex-col gap-6 overflow-y-auto'>
      {messages?.map((m, i) => (
        <Message
          key={i}
          image={m?.author?.image}
          createdAt={formatDateAndTime(m?.createdAt)}
          body={m?.body}
          username={m?.author?.username}
        />
      ))}
      {messages?.length < 1 && (
        <p className='xl:text-base text-sm flex justify-center items-center min-h-full w-full text-gray-300 font-semibold'>
          It’s quiet here... Say hello or ask a question to get started! &#10024;
        </p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
