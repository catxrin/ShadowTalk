import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatDate } from '../../../helpers/utils';

import Icon from '../../../components/Icon';
import useFetch from '../../../hooks/useFetch';

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});

  useEffect(() => {
    useFetch({ url: `user/${id}` }).then(res => setProfile(res));
  }, [id]);

  return (
    <div className='w-screen h-screen sm:p-20 p-0 relative bg-[#121214] flex justify-center items-center'>
      <div className='flex left-4 top-4 flex-row absolute items-center gap-2'>
        <Icon onClick={() => navigate(`/chat`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>Chat</p>
      </div>
      <div
        style={{ backgroundImage: `url(/server/${profile?.bgImage})` }}
        className={`h-full rounded bg-cover flex justify-center items-center w-full p-5 sm:p-20`}
      >
        <div className='flex flex-col gap-2 justify-center bg-black/60 rounded p-4'>
          <div className='flex flex-col items-center'>
            <img
              className='rounded-full border border-white w-20 object-cover'
              src={`/server/${profile?.image}`}
              alt='pfp'
            />
            <p className={`text-sm truncate max-w-96 text-white font-bold`}>{profile?.username}</p>
          </div>
          <p className='text-sm max-w-96 text-white break-all'>{profile?.description}</p>
          <p className='text-sm max-w-96 text-gray-300 font-medium'>Member since: {formatDate(profile?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
