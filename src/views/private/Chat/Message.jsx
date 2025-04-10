import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { socket } from '../../../helpers/socket';
import { UserContext } from '../../../contexts/UserProvider';
import { accentColors, formatDateAndTime } from '../../../helpers/utils';

import Icon from '../../../components/Icon';
import EditInput from './EditInput';
import { ChatContext } from '../../../contexts/ChatProvider';

export default function Message({ message }) {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { participants } = useContext(ChatContext);

  const navigate = useNavigate();

  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const participant = participants[message?.author];
  const clipboardIcon = () => `${!copied ? 'content_paste' : 'inventory'}`;

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message.body);
    setCopied(true);
  };
  const deleteMessage = () => {
    socket.emit('delete_message', { messageId: message._id, partnerId: id, author: message.author });
  };

  const displayMessageBody = () => {
    if (!editMode) {
      return <p className='text-sm font-medium text-gray-300 break-all'>{message.body}</p>;
    }
    return <EditInput message={message} setEditMode={setEditMode} />;
  };
  const isOwner = message?.author === user._id;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setCopied(false);
      }}
      className={`font-semibold hover:bg-black/15 rounded items-start py-3 px-6 w-full flex flex-row justify-between ${
        editMode && 'bg-black/15'
      }`}
    >
      <div className='flex items-start flex-row gap-2 w-full'>
        <img
          className='rounded-full border border-gray-500 w-12 object-cover'
          src={`/server/${participant?.user?.image}`}
          alt='pfp'
        />
        <div className='flex flex-col w-full'>
          <div className='flex flex-row gap-2 items-center'>
            <p
              onClick={() => navigate(`/user/${participant?.user?._id}`)}
              className={`text-sm hover:underline cursor-pointer font-semibold ${accentColors[participant?.theme]}`}
            >
              {participant?.nickname}
            </p>
            <p className='text-[10px] text-gray-400'>{formatDateAndTime(message?.createdAt)}</p>
          </div>
          {displayMessageBody()}
        </div>
      </div>
      <div className={`flex pt-4 flex-row gap-1.5 text-gray-400 items-center ${(!hover || editMode) && 'invisible'}`}>
        <Icon
          icon={clipboardIcon()}
          onClick={copyMessage}
          styles={`${copied ? 'text-green-600' : 'hover:text-gray-200'} !text-2xl`}
        />
        {isOwner && (
          <Icon onClick={() => setEditMode(true)} styles='!text-2xl hover:text-gray-200' icon='edit_square' />
        )}
        {isOwner && <Icon onClick={deleteMessage} styles='!text-2xl hover:text-red-500' icon='delete' />}
      </div>
    </div>
  );
}
