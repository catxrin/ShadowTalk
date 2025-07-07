import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserProvider';

import Icon from './Icon';
import Profile from '../views/private/Profile/Profile';
import useScreenSize from '../hooks/useScreenSize';

export default function ProfileHeader() {
  const { user } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);

  const screenSize = useScreenSize();

  const navigate = useNavigate();

  return (
    <div className='bg-[#1C1D22] text-white px-4 py-3 flex flex-row justify-between'>
      <div className='flex flex-row w-auto sm:w-full items-center gap-2 font-semibold'>
        <img alt='pfp' src={`/server/${user?.image}`} className='rounded-full w-10 h-10 object-cover' />
        <p className='text-sm truncate'>{user?.username}</p>
      </div>
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
              styles='bg-black/30 right-3 top-3 z-50 absolute rounded-full px-1.5 py-px !text-lg'
            />
            <Profile user={user} />
          </div>
        </div>
      )}
      <div className='flex flex-row items-center gap-3 text-gray-300'>
        <Icon onClick={() => setShowProfile(true)} styles='!text-2xl' icon='person' />
        <Icon
          onClick={() => navigate(`/user/${user?._id}/settings${screenSize > 768 ? '/customization' : ''}`)}
          styles='!text-2xl'
          icon='settings'
        />
      </div>
    </div>
  );
}
