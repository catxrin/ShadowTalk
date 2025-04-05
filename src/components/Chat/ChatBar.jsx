import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatContext } from '../../contexts/ChatProvider';
import { saveChat } from '../../helpers/actions/chat';

import Icon from '../Icon';

export default function ChatBar() {
  const { chat, partner, saveConversation, unsaveConversation } = useContext(ChatContext);
  const navigate = useNavigate();

  const saveCurrentConversation = () => {
    saveChat(partner?.user._id).then(() => {
      if (chat.saved) {
        return unsaveConversation(chat);
      }
      return saveConversation(chat);
    });
  };

  return (
    <>
      <div className='w-full bg-[#25262D] py-3 px-6 text-white shadow-sm justify-between flex flex-row'>
        <div className='flex flex-row items-center gap-2 font-semibold'>
          <img
            className='rounded-full border border-black w-10 object-cover'
            src={`/server/${partner?.user.image}`}
            alt='pfp'
          />
          <div>
            <p className='text-sm truncate max-w-96'>
              {partner?.nickname?.length > 0 ? partner?.nickname : partner?.user.username}
            </p>
            {partner?.nickname?.length > 0 && <p className='text-[12px] text-gray-400'>@{partner?.user.username}</p>}
          </div>
        </div>
        <div className='flex flex-row  gap-2 items-center text-gray-200'>
          <Icon onClick={saveCurrentConversation} fill={chat?.saved} icon='bookmark' />
          <Icon icon='settings' onClick={() => navigate('settings/chat_customization')} />
        </div>
      </div>
    </>
  );
}
