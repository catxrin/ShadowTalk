import { useEffect, useState, useContext } from 'react';
import useFetch from '../../helpers/useFetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserProvider';
export default function Conversations() {
  const { user } = useContext(UserContext);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    useFetch({ url: 'conversation/' }).then(res => {
      const chatPartners = res.map(el => el?.participants.filter(p => p._id !== user._id));
      setParticipants(chatPartners);
    });
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full flex flex-row gap-2'>
        <button className='bg-white/5 text-sm font-semibold w-full text-gray-200 p-2 rounded cursor-pointer'>
          Direct
        </button>
        <button className='bg-white/5 text-sm w-full font-semibold text-gray-200 p-2 rounded cursor-pointer'>
          Saved
        </button>
      </div>
      <div className='flex flex-col gap-0.5'>
        {participants?.map(partner => {
          return (
            <div
              key={partner[0]?._id}
              onClick={() => navigate(`/chat/${partner[0]._id}`)}
              className='flex flex-row hover:bg-white/5 bg-black/15 cursor-pointer p-2 rounded items-center gap-2 font-semibold'
            >
              <img
                className='rounded-full border border-gray-500 w-10 object-cover'
                src={`/server/${partner[0]?.image}`}
                alt='pfp'
              />
              <p className='text-sm text-gray-300 truncate'>{partner[0]?.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
