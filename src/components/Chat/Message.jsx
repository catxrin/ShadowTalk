export default function Message({ image, body, username, createdAt }) {
  return (
    <div className='flex flex-row items-center gap-2 font-semibold'>
      <img className='rounded-full border border-gray-500 w-12 object-cover' src={`/server/${image}`} alt='pfp' />
      <div>
        <div className='flex flex-row gap-2 items-center'>
          <p className='text-sm font-semibold text-white'>{username}</p>
          <p className='text-[10px] text-gray-400'>{createdAt}</p>
        </div>
        <p className='text-sm font-medium text-gray-300'>{body}</p>
      </div>
    </div>
  );
}
