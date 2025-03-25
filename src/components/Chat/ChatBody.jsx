import { useParams } from 'react-router-dom';
import Message from './Message';
import { useRef, useEffect } from 'react';

export default function ChatBody({ messages, messageReceived }) {
  const messagesEndRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages, messageReceived]);

  return (
    <div className='bg-white/5 h-full py-5 flex flex-col gap-2 overflow-y-auto'>
      {messages?.map(m => (
        <Message key={m._id} partner={id} author={m.author} message={m} />
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
