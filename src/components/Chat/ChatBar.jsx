import { useState, useContext } from 'react';

import { ChatContext } from '../../context/ChatProvider';
import { saveChat } from '../../helpers/actions/chat';

import Icon from '../Icon';
import Settings from './ChatSettings/Settings';
import { UserContext } from '../../context/UserProvider';

export default function ChatBar({ partner }) {
  const [show, setShow] = useState(false);
  const { onlineUsers } = useContext(UserContext);
  const { chat, saveConversation, unsaveConversation } = useContext(ChatContext);

  const isPartnerOnline = onlineUsers?.find(x => x.userId === partner?._id);

  const saveCurrentConversation = () => {
    saveChat(partner._id).then(() => {
      if (chat.saved) {
        return unsaveConversation(chat);
      }
      return saveConversation(chat);
    });
  };

  return (
    <>
      {show && <Settings setShow={setShow} />}
      <div className='w-full bg-[#25262D] py-3 px-6 text-white shadow-sm justify-between flex flex-row'>
        <div className='flex flex-row items-center gap-2 font-semibold'>
          <div className='relative'>
            <img
              className='rounded-full border border-black w-10 object-cover'
              src={`/server/${partner?.image}`}
              alt='pfp'
            />
            <div
              className={`p-1 absolute right-0 top-6 border-2 border-black max-w-1 rounded-full ${
                isPartnerOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
          </div>
          <p className='text-sm'>{partner?.username}</p>
        </div>
        <div className='flex flex-row  gap-2 items-center text-gray-200'>
          <Icon onClick={saveCurrentConversation} fill={chat?.saved} icon='bookmark' />
          <Icon icon='more_vert' onClick={() => setShow(true)} />
        </div>
      </div>
    </>
  );
}
