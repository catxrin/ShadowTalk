import { useNavigate } from 'react-router-dom';

import Icon from '../Icon';
import { useContext } from 'react';
import { ChatContext } from '../../contexts/ChatProvider';

export default function UserItem({ user, styles }) {
  const navigate = useNavigate();
  const { setSearchValue } = useContext(ChatContext);

  return (
    <div className={`bg-[#1C1D22] hover:bg-[#393C41] text-white py-2 px-3 flex flex-row justify-between ${styles}`}>
      <div className='flex flex-row items-center gap-2 font-semibold'>
        <img
          className='rounded-full border border-gray-500 w-10 object-cover'
          src={`/server/${user?.image}`}
          alt='pfp'
        />
        <p className='text-sm'>{user?.username}</p>
      </div>
      <Icon
        icon='chat'
        styles='!text-lg !flex items-center'
        onMouseDown={() => {
          navigate(`/chat/${user._id}`);
          setSearchValue({ user: user });
        }}
      />
    </div>
  );
}
