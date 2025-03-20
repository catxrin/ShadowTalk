import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '../Icon';
import { UserContext } from '../../UserProvider';

export default function ChatInput({ socket }) {
  const { user } = useContext(UserContext);
  const partnerId = useParams()?.id;
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', {
      message: message,
      partnerId: partnerId,
      author: user._id,
      username: user?.username,
      image: user.image,
      chatId: 'nice',
      timestamp: new Date().toLocaleDateString(),
    });
    setMessage('');
  };

  return (
    <div className='flex flex-row relative w-full'>
      <input
        onChange={e => setMessage(e.target.value)}
        className='bg-[#404048] text-gray-300 pr-20 w-full relative text-base px-3 py-2 outline-hidden mx-5 mb-5 rounded'
        placeholder='Send a message'
        value={message}
      />
      <Icon
        icon='send'
        onClick={sendMessage}
        styles='absolute right-5 top-0 py-2 px-4 hover:bg-white/5 bg-[#25262D] rounded-r text-gray-300'
      />
    </div>
  );
}
