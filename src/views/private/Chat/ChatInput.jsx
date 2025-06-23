import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../../../helpers/socket';
import { UserContext } from '../../../contexts/UserProvider';

import Icon from '../../../components/Icon';

export default function ChatInput() {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim().length > 0) {
      socket.emit('send_message', {
        message: message,
        partnerId: id,
        author: user._id,
        username: user.username,
        image: user.image,
        timestamp: new Date().toLocaleDateString(),
      });
      setMessage('');
    }
  };

  return (
    <div className='bg-[#25262D] w-full py-2 flex items-center'>
      <div className='flex flex-row h-12 px-5 items-center w-full relative'>
        <input
          onChange={e => setMessage(e.target.value)}
          className='bg-[#404048] text-gray-300 w-full h-full text-base px-3 py-2 outline-hidden rounded'
          placeholder='Send a message'
          value={message}
        />
        <div className='flex flex-row items-center gap-3 absolute right-8'>
          <div className='h-10 bg-white/10 p-[0.5px]'></div>
          <Icon icon='send' fill={true} onClick={sendMessage} styles='text-gray-300' />
        </div>
      </div>
    </div>
  );
}
