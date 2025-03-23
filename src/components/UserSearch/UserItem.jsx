import Icon from '../Icon';
import { useNavigate } from 'react-router-dom';

export default function UserItem({ user, styles }) {
  const navigate = useNavigate();
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
        onMouseDown={() => {
          navigate(`/chat/${user._id}`);
        }}
        styles='!text-lg !flex items-center'
        icon='chat'
      />
    </div>
  );
}
