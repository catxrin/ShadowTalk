import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserProvider';

import Icon from './Icon';
import useScreenSize from '../hooks/useScreenSize';

export default function ProfileHeader() {
  const { user } = useContext(UserContext);
  const screenSize = useScreenSize();

  const navigate = useNavigate();

  return (
    <div className='bg-[#1C1D22] text-white px-4 py-3 flex flex-row justify-between'>
      <div className='flex flex-row w-auto sm:w-full items-center gap-2 font-semibold'>
        <img alt='pfp' src={`/server/${user?.image}`} className='rounded-full w-10 object-cover' />
        <p className='text-sm truncate'>{user?.username}</p>
      </div>
      <div className='flex flex-row items-center gap-3 text-gray-300'>
        <Icon onClick={() => navigate(`/user/${user?._id}`)} styles='!text-2xl' icon='person' />
        <Icon
          onClick={() => navigate(`/user/${user?._id}/settings${screenSize > 768 ? '/customization' : ''}`)}
          styles='!text-2xl'
          icon='settings'
        />
      </div>
    </div>
  );
}
