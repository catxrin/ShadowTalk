import { useRef, useEffect } from 'react';

import Message from './Message';
import ChatPlaceholder from './ChatPlaceholder';

export default function ChatBody({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className='bg-white/5 h-full py-5 flex flex-col gap-2 overflow-y-auto'>
      {messages?.map(message => (
        <Message key={message._id} message={message} />
      ))}
      {messages?.length < 1 && <ChatPlaceholder />}
      <div ref={messagesEndRef} />
    </div>
  );
}
