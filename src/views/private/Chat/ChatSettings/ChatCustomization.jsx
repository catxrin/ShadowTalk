import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserContext } from '../../../../contexts/UserProvider';
import { ChatContext } from '../../../../contexts/ChatProvider';

import UsernameInput from '../UsernameInput';
import Icon from '../../../../components/Icon';
import ColorPicker from './ColorPicker/ColorPicker';

export default function ChatCustomization() {
  const { id } = useParams();

  const { user } = useContext(UserContext);
  const { participants } = useContext(ChatContext);

  const navigate = useNavigate();

  return (
    <div className='size-full flex flex-col gap-6 p-3'>
      <div className='flex flex-row items-center gap-2'>
        <Icon onClick={() => navigate(`/chat/${id}`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>Chat Customization</p>
      </div>
      <div className='flex flex-col gap-1'>
        <p className='font-medium text-gray-200 text-lg'>Nicknames</p>
        <div className='flex flex-col gap-6'>
          <UsernameInput participant={participants[id]} />
          <UsernameInput participant={participants[user?._id]} />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium text-gray-200 text-lg'>Nickname Accent</p>
        <ColorPicker />
      </div>
    </div>
  );
}
