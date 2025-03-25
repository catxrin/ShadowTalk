import { useNavigate } from 'react-router-dom';

export default function Participants({ participants }) {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-1'>
      {participants?.map(partner => {
        return (
          <div
            key={partner?._id}
            onClick={() => navigate(`/chat/${partner._id}`)}
            className='flex flex-row hover:bg-white/5 bg-black/20 cursor-pointer p-2 rounded items-center gap-2 font-semibold'
          >
            <img
              className='rounded-full border border-gray-500 w-10 object-cover'
              src={`/server/${partner?.image}`}
              alt='pfp'
            />
            <p className='text-sm text-gray-300 truncate'>{partner?.username}</p>
          </div>
        );
      })}
    </div>
  );
}
