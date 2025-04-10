import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from '../../contexts/UserProvider';

export default function Participants({ participants }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const chatMate = participants?.map(el => el?.participants?.filter(p => p.user._id !== user._id)[0]);

  return (
    <div className='flex flex-col gap-1'>
      {chatMate?.map(mate => (
        <div
          key={mate?.user?._id}
          onClick={() => navigate(`/chat/${mate.user._id}`)}
          className='flex flex-row hover:bg-white/5 p-2 rounded gap-2 font-semibold
          cursor-pointer items-center bg-black/20'
        >
          <img alt='pfp' className={`rounded-full bg-white w-10 object-cover`} src={`/server/${mate?.user?.image}`} />
          <p className={`text-sm truncate text-white max-w-40`}>{mate?.nickname}</p>
        </div>
      ))}
    </div>
  );
}
