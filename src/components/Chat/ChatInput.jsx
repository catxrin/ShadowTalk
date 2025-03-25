import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '../Icon';
import { UserContext } from '../../context/UserProvider';

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
    <div className='flex flex-row h-20 items-center mx-5'>
      <input
        onChange={e => setMessage(e.target.value)}
        className='bg-[#404048] text-gray-300 w-full relative text-base px-3 py-2 outline-hidden my-auto rounded'
        placeholder='Send a message'
        value={message}
      />
      <Icon
        icon='send'
        onClick={sendMessage}
        styles='py-2 px-4 hover:bg-white/5 bg-[#25262D] rounded-r text-gray-300'
      />
    </div>
  );
}
