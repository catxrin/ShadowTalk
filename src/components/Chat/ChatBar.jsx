import { useState } from 'react';
import Icon from '../Icon';
import Settings from './ChatSettings/Settings';

export default function ChatBar({ partner }) {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && <Settings setShow={setShow} />}
      <div className='w-full bg-[#25262D] py-3 px-6 text-white shadow-sm justify-between flex flex-row'>
        <div className='flex flex-row items-center gap-2 font-semibold'>
          <img
            className='rounded-full border border-gray-500 w-10 object-cover'
            src={`/server/${partner?.image}`}
            alt='pfp'
          />
          <p className='text-sm'>{partner?.username}</p>
        </div>
        <div className='flex flex-row  gap-2 items-center text-gray-200'>
          <Icon icon='bookmark' />
          <Icon icon='more_vert' onClick={() => setShow(true)} />
        </div>
      </div>
    </>
  );
}
