import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../contexts/UserProvider';

export default function Participants({ participants }) {
  const { user, onlineUsers } = useContext(UserContext);
  const navigate = useNavigate();

  const chatMate = participants?.map(el => el?.participants?.filter(p => p.user._id !== user._id)[0]);
  return (
    <div className='flex flex-col gap-2'>
      {chatMate?.map(mate => (
        <div
          key={mate?.user?._id}
          onClick={() => navigate(`/chat/${mate.user._id}`)}
          style={{ backgroundImage: `url(/server/${mate?.user?.bgImage})` }}
          className={`hover:bg-white/5 rounded font-semibold bg-cover w-full
          cursor-pointer bg-black/20 bg-center`}
        >
          <div className='absolute bg-black/5'></div>
          <div className='size-full p-2 flex flex-row items-center gap-2'>
            <div className='relative'>
              <img
                alt='pfp'
                className={`rounded-full shadow-sm bg-white w-10 h-10 object-cover`}
                src={`/server/${mate?.user?.image}`}
              />
              <div
                className={`w-3 h-3 border-2 border-[#242429] absolute -right-0.5 bottom-0.5 shadow-sm mt-0.5 rounded-full ${
                  onlineUsers[mate?.user?._id] ? 'bg-green-400' : 'bg-gray-400'
                }`}
              ></div>
            </div>
            <p className={`text-sm truncate shadow-sm text-white max-w-40`}>{mate?.nickname || mate?.user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
