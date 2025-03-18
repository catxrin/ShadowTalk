import ChatBar from './ChatBar';

export default function Chat() {
  return (
    <div className='w-full h-full justify-between flex flex-col'>
      <ChatBar />
      <input
        className='bg-[#404048] text-gray-300 text-base px-3 py-2 outline-hidden mx-3 mb-3 rounded'
        placeholder='Send a message'
        type='text'
      />
    </div>
  );
}
