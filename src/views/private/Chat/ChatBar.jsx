import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ChatContext } from '../../../contexts/ChatProvider';
import { UserContext } from '../../../contexts/UserProvider';

import { accentColors } from '../../../helpers/utils';
import { saveChat } from '../../../helpers/actions/chat';

import Profile from '../Profile/Profile';
import Icon from '../../../components/Icon';

export default function ChatBar({ hasMessages }) {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const { chat, participants, toggleSavedConversation } = useContext(ChatContext);
  const { onlineUsers } = useContext(UserContext);

  const partner = chat?.participants?.find(user => user._id === chatId);

  const saveCurrentConversation = () => {
    saveChat(participants[chatId]?.user?._id).then(() => toggleSavedConversation(chat));
  };

  return (
    <div className='w-full bg-[#25262D] py-3 px-6 text-white shadow-sm justify-between flex flex-row'>
      <div className='flex flex-row items-center gap-2 font-semibold'>
        <Icon styles='!block md:!hidden' onClick={() => navigate('/chat')} icon='chevron_left' />
        {showProfile && (
          <div
            onClick={() => setShowProfile(false)}
            className='bg-black/50 absolute z-50 left-0 top-0 backdrop-blur-sm w-full h-full flex justify-center items-center'
          >
            <div
              onClick={e => e.stopPropagation()}
              className={`relative sm:w-[30rem] sm:h-auto w-screen h-screen rounded text-white flex flex-col gap-2`}
            >
              <Icon
                icon='close'
                onClick={() => setShowProfile(false)}
                styles='bg-black/30 right-3 top-3 z-50 absolute rounded-full p-1.5 leading-none !text-lg'
              />
              <Profile user={partner} />
            </div>
          </div>
        )}
        <div className='relative'>
          <img
            className='rounded-full border border-[#242429] w-10 h-10 object-cover'
            src={`/server/${partner?.image}`}
            alt='pfp'
          />
          <div
            className={`w-3 h-3 border-2 border-[#242429] absolute -right-0.5 bottom-0.5 shadow-sm mt-0.5 rounded-full ${
              onlineUsers[partner?._id] ? 'bg-green-400' : 'bg-gray-400'
            }`}
          ></div>
        </div>
        <div>
          <p
            onClick={() => setShowProfile(true)}
            className={`text-sm truncate cursor-pointer hover:underline max-w-96 ${accentColors[partner?.accent]}`}
          >
            {partner?.nickname || partner?.username}{' '}
          </p>
          <p className='text-[12px] text-gray-400'>@{partner?.username}</p>
        </div>
      </div>
      <div className='flex flex-row  gap-2 items-center text-gray-200'>
        <Icon onClick={saveCurrentConversation} fill={chat?.saved} icon='bookmark' />
        {hasMessages && <Icon icon='settings' onClick={() => navigate('settings/customization')} />}
      </div>
    </div>
  );
}
