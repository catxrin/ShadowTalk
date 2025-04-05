import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';

export default function Participants({ participants }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const chatMate = participants?.map(el => el?.participants.filter(p => p.user._id !== user._id)[0]);

  return (
    <div className='flex flex-col gap-1'>
      {chatMate?.map((mate, i) => {
        return (
          <div
            key={mate.user._id}
            onClick={() => navigate(`/chat/${mate.user._id}`)}
            className='flex flex-row justify-between hover:bg-white/5 bg-black/20 cursor-pointer p-2 rounded items-center gap-2 font-semibold'
          >
            <div className='flex flex-row items-center gap-2'>
              <img
                className='rounded-full border border-black w-10 object-cover'
                src={`/server/${mate.user.image}`}
                alt='pfp'
              />

              <div>
                <p className={`text-sm ${i === 0 ? 'text-white' : 'text-gray-300'} truncate max-w-40`}>
                  {mate.nickname.length > 0 ? mate.nickname : mate.user.username}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
