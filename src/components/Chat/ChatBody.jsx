import { useRef, useEffect } from 'react';

import Message from './Message';
import ChatPlaceholder from './ChatPlaceholder';

export default function ChatBody({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className='bg-white/5 h-full w-full py-5 overflow-y-auto flex flex-col gap-2'>
      {messages?.map(message => (
        <Message key={message._id} message={message} />
      ))}
      {messages?.length < 1 && <ChatPlaceholder />}
      <div ref={messagesEndRef} />
    </div>
  );
}
