import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../../../helpers/socket';

export default function EditInput({ message, setEditMode }) {
  const { id } = useParams();
  const [editValue, setEditValue] = useState(message?.body);

  const cancel = () => {
    setEditMode(false);
    setEditValue(message.body);
  };
  const save = () => {
    socket.emit('edit_message', { partnerId: id, ...message, body: editValue.trim() });
    setEditMode(false);
  };

  return (
    <div className='flex flex-col items-end gap-1 w-full'>
      <input
        value={editValue}
        onChange={e => {
          setEditValue(e.target.value);
        }}
        className='p-3 outline-hidden font-normal text-gray-200 text-sm rounded-md bg-[#404048] w-full'
      />
      <div className='flex flex-row justify-center gap-2 text-[12px] font-normal text-gray-200'>
        <button onClick={cancel} className='text-blue-400 cursor-pointer hover:underline'>
          cancel
        </button>
        <button onClick={save} className='text-blue-400 cursor-pointer hover:underline'>
          save
        </button>
      </div>
    </div>
  );
}
