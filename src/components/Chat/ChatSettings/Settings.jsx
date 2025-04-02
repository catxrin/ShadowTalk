import { useContext, useEffect, useState } from 'react';
import Modal from '../../Modal';
import Option from './Option';
import Icon from '../../Icon';
import useFetch from '../../../helpers/useFetch';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../../../context/ChatProvider';

export default function Settings({ setShow }) {
  const [mateName, setMateName] = useState('');
  const { id } = useParams();
  const { chat, setCurrentChat } = useContext(ChatContext);
  const partner = chat?.participants.find(participant => participant.user._id === id);

  useEffect(() => {
    setMateName(partner.nickname);
  }, []);
  return (
    <Modal setShow={setShow} label='Chat Settings'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col'>
          <label className='text-sm text-gray-300'>Set a nickname to your chat mate!</label>
          <div className='flex flex-row items-center h-full'>
            <img className='rounded-l w-10 object-cover' src={`/server/${partner.user.image}`} alt='pfp' />
            <input
              value={mateName}
              onChange={e => setMateName(e.target.value)}
              className='bg-[#404048] text-gray-300 w-full text-base px-3 py-2 outline-hidden'
            />
            <Icon
              onClick={() => {
                useFetch({ url: `/conversation/${id}`, body: { nickname: mateName }, method: 'PATCH' }).then(res => {
                  setCurrentChat(res);
                  setShow(false);
                });
              }}
              styles='bg-white/15 py-2 px-1 rounded-r'
              icon='check'
            />
          </div>
        </div>
        <div>
          <Option
            icon='block'
            label='Block user'
            description='By clicking here sending or receiving messages from this user will be forbidden unless you unblock the user'
          />
          <div className='min-w-full h-[1px] bg-gray-500'></div>
          <Option
            icon='delete'
            label='Delete chat'
            description='By clicking here you will lose your chat with this user forever. The user can still be found, however, the
            chat will be gone'
          />
        </div>
      </div>
    </Modal>
  );
}
