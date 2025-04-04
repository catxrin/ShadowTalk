import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';

export default function Participants({ participants }) {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { onlineUsers } = useContext(UserContext);

  const chatMate = participants?.map(el => el?.participants.filter(p => p._id !== user._id)[0]);

  return (
    <div className='flex flex-col gap-1'>
      {chatMate?.map(({ _id, image, username }, i) => {
        const isPartnerOnline = onlineUsers?.find(x => x.userId === _id);
        return (
          <div
            key={_id}
            onClick={() => navigate(`/chat/${_id}`)}
            className='flex flex-row justify-between hover:bg-white/5 bg-black/20 cursor-pointer p-2 rounded items-center gap-2 font-semibold'
          >
            <div className='flex flex-row items-center gap-2'>
              <div className='relative'>
                <img
                  className='rounded-full border border-black w-10 object-cover'
                  src={`/server/${image}`}
                  alt='pfp'
                />
                <div
                  className={`p-1 absolute right-0 top-6 border-2 border-black max-w-1 rounded-full ${
                    isPartnerOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
              </div>
              <p className={`text-sm ${i === 0 ? 'text-white' : 'text-gray-300'} truncate`}>{username}</p>
            </div>
            {i === 0 && (
              <div className='py-0.5 px-1.5  text-purple-950 bg-gray-300 rounded-xl text-[10px]'>
                <p>+12</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
