import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../../../helpers/socket';
import { UserContext } from '../../../contexts/UserProvider';
import { ChatContext } from '../../../contexts/ChatProvider';

import Icon from '../../../components/Icon';
import BlockedBanner from './BlockedBanner';

export default function ChatInput() {
  const { user } = useContext(UserContext);
  const { chat } = useContext(ChatContext);
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
    <div className={`flex flex-row h-20 ${chat?.blocked ? 'bg-red-700/40' : 'mx-5'} items-center `}>
      {chat?.blocked ? (
        <BlockedBanner />
      ) : (
        <>
          <input
            onChange={e => setMessage(e.target.value)}
            className='bg-[#404048] text-gray-300 w-full text-base px-3 py-2 outline-hidden rounded-l'
            placeholder='Send a message'
            value={message}
          />
          <Icon
            icon='send'
            onClick={sendMessage}
            styles='py-2 px-4 hover:bg-white/5 bg-[#25262D] rounded-r text-gray-300'
          />
        </>
      )}
    </div>
  );
}
