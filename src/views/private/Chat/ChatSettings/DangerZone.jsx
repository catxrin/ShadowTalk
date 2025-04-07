import { useNavigate, useParams } from 'react-router-dom';

import Option from './Option';
import Icon from '../../../../components/Icon';
export default function DangerZone() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className='size-full flex flex-col gap-4'>
      <div className='flex flex-row items-center gap-2'>
        <Icon onClick={() => navigate(`/chat/${id}`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>Danger Zone</p>
      </div>

      <div className='flex flex-col'>
        {/* {chat?.blocked ? (
        <Option
          color='bg-green-700'
          icon='block'
          label='Unblock user'
          description='By clicking here, you will restore the ability to send and receive messages with this user.'
          onClick={handleBlock}
        />
      ) : ( */}
        <Option
          //   onClick={handleBlock}
          icon='block'
          label='Block user'
          description='By clicking here sending or receiving messages from this user will be forbidden unless you unblock the user'
        />
        {/* )} */}
        {/* <div className='max-w-96 h-[1px] bg-gray-500'></div> */}
        <Option
          icon='delete'
          label='Delete chat'
          description='By clicking here you will lose your chat with this user forever. The user can still be found, however, the
            chat will be gone'
        />
      </div>
    </div>
  );
}
