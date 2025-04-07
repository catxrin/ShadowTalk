import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { accentColors } from '../../helpers/utils';

export default function Participants({ participants }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const chatMate = participants?.map(el => el?.participants.filter(p => p.user._id !== user._id)[0]);
  return (
    <div className='flex flex-col gap-1'>
      {chatMate?.map(mate => (
        <div
          key={mate.user._id}
          onClick={() => navigate(`/chat/${mate.user._id}`)}
          className='flex flex-row hover:bg-white/5 bg-black/20 cursor-pointer p-2 rounded items-center gap-2 font-semibold'
        >
          <img alt='pfp' className='rounded-full w-10 object-cover' src={`/server/${mate.user.image}`} />
          <p className={`text-sm ${accentColors[mate?.theme]} truncate max-w-40`}>{mate.nickname}</p>
        </div>
      ))}
    </div>
  );
}
