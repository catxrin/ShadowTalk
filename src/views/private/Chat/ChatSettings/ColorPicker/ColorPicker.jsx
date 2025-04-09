import { useContext, useEffect, useState } from 'react';

import useFetch from '../../../../../hooks/useFetch';
import { ChatContext } from '../../../../../contexts/ChatProvider';
import { UserContext } from '../../../../../contexts/UserProvider';

import ColorOption from './ColorOption';

export default function ColorPicker() {
  const { user } = useContext(UserContext);
  const { participants } = useContext(ChatContext);

  const [chatColor, setChatColor] = useState('');

  const changeColor = color => {
    setChatColor(color);
    useFetch({
      url: 'conversation/' + user?._id + '/accent',
      method: 'PATCH',
      body: { theme: color },
    });
  };

  useEffect(() => {
    setChatColor(participants[user?._id]?.theme);
  }, []);

  return (
    <div className='flex flex-col gap-3 w-[30rem]'>
      <div className='flex flex-row gap-4 w-full'>
        <div className='flex flex-col w-full gap-2'>
          <ColorOption
            option='Pink'
            primary='bg-pink-300'
            secondary='bg-pink-700'
            active={chatColor === 'Pink'}
            onClick={() => changeColor('Pink')}
          />
          <ColorOption
            option='Purple'
            primary='bg-purple-300'
            secondary='bg-purple-700'
            active={chatColor === 'Purple'}
            onClick={() => changeColor('Purple')}
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <ColorOption
            option='Sky'
            primary='bg-sky-300'
            secondary='bg-sky-700'
            active={chatColor === 'Sky'}
            onClick={() => changeColor('Sky')}
          />
          <ColorOption
            option='Green'
            primary='bg-green-300'
            secondary='bg-green-700'
            active={chatColor === 'Green'}
            onClick={() => changeColor('Green')}
          />
        </div>
      </div>
      <ColorOption
        option='Default'
        primary='bg-white'
        secondary='bg-white/15'
        active={chatColor === 'Default'}
        onClick={() => changeColor('Default')}
      />
    </div>
  );
}
