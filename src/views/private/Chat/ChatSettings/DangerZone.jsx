import { useNavigate, useParams } from 'react-router-dom';

import Option from './Option';
import Icon from '../../../../components/Icon';
import { useContext } from 'react';
import { ChatContext } from '../../../../contexts/ChatProvider';
import { socket } from '../../../../helpers/socket';
export default function DangerZone() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chat } = useContext(ChatContext);

  return (
    <div className='size-full flex flex-col gap-4'>
      <div className='flex flex-row items-center gap-2'>
        <Icon onClick={() => navigate(`/chat/${id}`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>Danger Zone</p>
      </div>

      <div className='flex flex-col'>
        <Option
          onClick={() => {
            socket.emit('delete_conversation', chat?._id);
            navigate('/chat');
          }}
          icon='delete'
          label='Delete chat'
          description='By clicking here you will lose your chat with this user forever. The user can still be found, however, the
            chat will be gone'
        />
      </div>
    </div>
  );
}
