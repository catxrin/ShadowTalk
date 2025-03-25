import { useEffect, useState, useContext } from 'react';

import useFetch from '../../helpers/useFetch';
import { UserContext } from '../../context/UserProvider';
import { ChatContext } from '../../context/ChatProvider';

import Icon from '../Icon';
import Participants from './Participans';

export default function Conversations() {
  const { user } = useContext(UserContext);
  const { directConversations, setAllConversations, savedConversations } = useContext(ChatContext);

  const [showSaved, setShowSaved] = useState(false);
  const [showDirect, setShowDirect] = useState(true);

  useEffect(() => {
    useFetch({ url: 'conversation/' }).then(res => {
      setAllConversations(res, user._id);
    });
  }, []);

  const showMessages = type => {
    setShowDirect(type === 'direct' ? true : false);
    setShowSaved(type === 'saved' ? true : false);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full flex flex-row gap-2 bg-black/50 p-1 rounded'>
        <div
          onClick={() => showMessages('direct')}
          className={`${
            showDirect ? 'bg-white/10 text-gray-200' : 'text-gray-400'
          } w-full font-semibold p-1 rounded cursor-pointer flex flex-row items-center justify-center gap-1`}
        >
          <Icon styles='!text-lg' icon='forward_to_inbox' />
          <button className='text-sm cursor-pointer'>Direct</button>
        </div>
        <div
          onClick={() => showMessages('saved')}
          className={`${
            showSaved ? 'bg-white/10 text-gray-200' : 'text-gray-400'
          } w-full font-semibold p-1 rounded cursor-pointer flex flex-row items-center justify-center gap-1`}
        >
          <Icon styles='!text-lg' icon='bookmark_added' />
          <button className='text-sm cursor-pointer '>Saved</button>
        </div>
      </div>
      <div className='flex flex-col gap-0.5'>
        {showDirect && <Participants participants={directConversations} />}
        {showSaved && <Participants participants={savedConversations} />}
      </div>
    </div>
  );
}
