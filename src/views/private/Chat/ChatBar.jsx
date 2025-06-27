import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ChatContext } from '../../../contexts/ChatProvider';

import { accentColors } from '../../../helpers/utils';
import { saveChat } from '../../../helpers/actions/chat';

import Icon from '../../../components/Icon';

export default function ChatBar() {
  const navigate = useNavigate();

  const { chatId } = useParams();
  const { chat, participants, toggleSavedConversation } = useContext(ChatContext);

  const partner = chat?.participants?.find(user => user._id === chatId);

  const saveCurrentConversation = () => {
    saveChat(participants[chatId]?.user?._id).then(() => toggleSavedConversation(chat));
  };

  return (
    <div className='w-full bg-[#25262D] py-3 px-6 text-white shadow-sm justify-between flex flex-row'>
      <div className='flex flex-row items-center gap-2 font-semibold'>
        <Icon styles='!block md:!hidden' onClick={() => navigate('/chat')} icon='chevron_left' />
        <img
          className='rounded-full border border-black w-10 h-10 object-cover'
          src={`/server/${partner?.image}`}
          alt='pfp'
        />
        <div>
          <p
            onClick={() => navigate(`/user/${participants[chatId]?.user?._id}`)}
            className={`text-sm truncate cursor-pointer hover:underline max-w-96 ${accentColors[partner?.accent]}`}
          >
            {partner?.nickname || partner?.username}
          </p>
          <p className='text-[12px] text-gray-400'>@{partner?.username}</p>
        </div>
      </div>
      <div className='flex flex-row  gap-2 items-center text-gray-200'>
        <Icon onClick={saveCurrentConversation} fill={chat?.saved} icon='bookmark' />
        <Icon icon='settings' onClick={() => navigate('settings/customization')} />
      </div>
    </div>
  );
}
