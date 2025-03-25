import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import UserItem from './UserItem';

export default function Items({ items }) {
  const { user } = useContext(UserContext);
  return (
    <div className='relative'>
      {items.length > 0 && (
        <div className='flex flex-col rounded absolute w-full bg-gray-500 gap-[1px] overflow-y-auto max-h-96'>
          {items.map(chat => chat._id !== user._id && <UserItem key={chat._id} user={chat} />)}
        </div>
      )}
      {items.length < 1 && <p className='bg-[#1C1D22] text-gray-300 text-sm py-2 px-3'>No results found</p>}
    </div>
  );
}
