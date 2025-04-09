import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../contexts/UserProvider';

import Icon from '../../../components/Icon';

export default function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const date = new Date(user?.createdAt).toLocaleDateString('en-GB');
  return (
    <div className='w-screen h-screen p-20 relative bg-[#121214] flex justify-center items-center'>
      <div className='flex left-4 top-4 flex-row absolute items-center gap-2'>
        <Icon onClick={() => navigate(`/chat`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>Chat</p>
      </div>
      <div
        style={{ backgroundImage: `url(/server/${user?.bgImage})` }}
        className={`h-full rounded bg-cover flex justify-center items-center w-full p-10 sm:p-20`}
      >
        <div className='flex flex-col gap-2 justify-center bg-black/60 rounded p-4'>
          <div className='flex flex-col items-center'>
            <img
              className='rounded-full border border-white w-20 object-cover'
              src={`/server/${user?.image}`}
              alt='pfp'
            />
            <p className={`text-sm truncate max-w-96 text-white font-bold`}>{user?.username}</p>
          </div>
          <p className='text-sm max-w-96 text-white break-all'>{user?.description}</p>
          <p className='text-sm max-w-96 text-gray-300 font-medium'>Member since: {date}</p>
        </div>
      </div>
    </div>
  );
}
