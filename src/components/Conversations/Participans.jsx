import { useNavigate } from 'react-router-dom';

export default function Participants({ participants }) {
  const navigate = useNavigate();

  return (
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
  );
}
