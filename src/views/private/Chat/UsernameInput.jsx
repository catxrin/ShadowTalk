import { useState, useEffect, useContext } from 'react';

import useFetch from '../../../hooks/useFetch';
import { ChatContext } from '../../../contexts/ChatProvider';

import Icon from '../../../components/Icon';

export default function UsernameInput({ participant }) {
  const { setChat } = useContext(ChatContext);

  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setNickname(participant?.nickname);
  }, []);

  useEffect(() => {
    setEdit(nickname !== participant?.nickname);
    if (nickname === participant?.nickname) setError(false);
  }, [nickname]);

  const changeNickname = (id, nickname) => {
    if (nickname.length > 15) return setError('Nickname must not be greater than 15 characters!');

    useFetch({ url: `conversation/${id}/nickname`, body: { nickname }, method: 'PATCH' }).then(res => {
      setChat(res);
      setEdit(false);
    });
  };

  return (
    <div className='flex flex-col w-96 h-full relative'>
      <div className='flex flex-row h-full'>
        <img alt='pfp' className='rounded-l w-12 object-cover h-12' src={`/server/${participant?.image}`} />
        <input
          name='nickname'
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className='bg-white/10 text-gray-200 w-full h-full text-base px-3 py-2 outline-hidden rounded-r'
        />
        <div
          onClick={() => edit && changeNickname(participant?._id, nickname)}
          className={` ${edit ? 'bg-white' : 'bg-white/30'} flex h-full items-center rounded-r px-1 cursor-pointer`}
        >
          <Icon icon={edit ? 'check' : 'edit'} />
        </div>
      </div>
      <p className='text-red-500 text-sm absolute -bottom-5'>{error}</p>
    </div>
  );
}
