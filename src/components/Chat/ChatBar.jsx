import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../helpers/useFetch';
import { useState } from 'react';
import Icon from '../Icon';
import Settings from './ChatSettings/Settings';

export default function ChatBar() {
  const params = useParams();
  const [chatPartner, setChatPartner] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    useFetch({ url: `user/${params.id}` }).then(res => setChatPartner(res));
  }, [params.id]);

  return (
    <>
      {show && <Settings setShow={setShow} />}
      <div className='w-full bg-[#25262D] py-3 px-6 text-white shadow-sm justify-between flex flex-row'>
        <div className='flex flex-row items-center gap-2 font-semibold'>
          <img
            className='rounded-full border border-gray-500 w-10 object-cover'
            src={`/server/${chatPartner?.image}`}
            alt='pfp'
          />
          <p className='text-sm'>{chatPartner?.username}</p>
        </div>
        <div className='flex flex-row  gap-2 items-center text-gray-200'>
          <Icon icon='bookmark' />
          <Icon icon='more_vert' onClick={() => setShow(true)} />
        </div>
      </div>
    </>
  );
}
