import { useContext, useState } from 'react';
import Icon from '../Icon';
import { socket } from '../../helpers/socket';
import { UserContext } from '../../context/UserProvider';
import { formatDateAndTime } from '../../helpers/utills';

export default function Message({ message, partner, author }) {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useContext(UserContext);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message.body);
    setCopied(true);
  };

  const deleteMessage = () => {
    socket.emit('delete_message', { messageId: message._id, partnerId: partner });
  };

  const isOwner = author._id === user._id;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setCopied(false);
      }}
      className='font-semibold hover:bg-black/15 rounded py-3 px-6 flex flex-row justify-between'
    >
      <div className='flex flex-row items-center gap-2'>
        <img
          className='rounded-full border border-gray-500 w-12 object-cover'
          src={`/server/${author.image}`}
          alt='pfp'
        />
        <div>
          <div className='flex flex-row gap-2 items-center'>
            <p className='text-sm font-semibold text-white'>{author.username}</p>
            <p className='text-[10px] text-gray-400'>{formatDateAndTime(message.createdAt)}</p>
          </div>
          <p className='text-sm font-medium text-gray-300'>{message.body}</p>
        </div>
      </div>
      {hover && (
        <div className='flex flex-row gap-1.5 text-gray-400 items-center'>
          <Icon
            onClick={copyMessage}
            styles={`${copied ? 'text-green-600' : 'text-gray-400 hover:text-gray-200'} !text-2xl`}
            icon={`${!copied ? 'content_paste' : 'inventory'}`}
          />
          {isOwner && <Icon styles='!text-2xl hover:text-gray-200' icon='edit_square' />}
          {isOwner && <Icon onClick={deleteMessage} styles='!text-2xl hover:text-red-500' icon='delete' />}
        </div>
      )}
    </div>
  );
}
