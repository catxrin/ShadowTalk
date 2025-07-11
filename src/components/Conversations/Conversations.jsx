import { useEffect, useState, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useFetch from '../../hooks/useFetch';
import { ChatContext } from '../../contexts/ChatProvider';

import Icon from '../Icon';
import Search from '../UserSearch/Search';
import Participants from './Participants';

export default function Conversations() {
  const { conversations, setConversations } = useContext(ChatContext);

  const { t } = useTranslation();

  const [showSaved, setShowSaved] = useState(false);
  const [showDirect, setShowDirect] = useState(true);

  useEffect(() => {
    useFetch({ url: 'conversation/' }).then(res => {
      setConversations(res);
    });
  }, []);

  const savedConversations = useMemo(() => {
    return conversations.filter(conversation => conversation?.saved);
  }, [conversations]);

  const directConversations = useMemo(() => {
    return conversations.filter(conversation => !conversation?.saved);
  }, [conversations]);

  const showMessages = type => {
    setShowDirect(type === 'direct' ? true : false);
    setShowSaved(type === 'saved' ? true : false);
  };

  return (
    <div className='flex overflow-visible flex-col gap-4'>
      <Search />
      <div className='flex flex-col gap-2'>
        <div className='w-full flex flex-row gap-2 bg-black/50 p-1 rounded'>
          <div
            onClick={() => showMessages('direct')}
            className={`${
              showDirect ? 'bg-white/10 text-gray-200' : 'text-gray-400'
            } w-full transition duration-500 ease-in-out font-semibold p-1 rounded cursor-pointer flex flex-row items-center justify-center gap-1`}
          >
            <Icon styles='!text-lg' icon='forward_to_inbox' />
            <button className='text-sm cursor-pointer'>{t('Direct')}</button>
          </div>
          <div
            onClick={() => showMessages('saved')}
            className={`${
              showSaved ? 'bg-white/10 text-gray-200' : 'text-gray-400'
            } w-full font-semibold transition duration-500 ease-in-out p-1 rounded cursor-pointer flex flex-row items-center justify-center gap-1`}
          >
            <Icon styles='!text-lg' icon='bookmark_added' />
            <button className='text-sm cursor-pointer'>{t('Saved')}</button>
          </div>
        </div>
        <div className='flex flex-col gap-0.5'>
          {showDirect && <Participants participants={directConversations} />}
          {showSaved && <Participants participants={savedConversations} />}
        </div>
      </div>
    </div>
  );
}
