import { useContext, useState } from 'react';
import { ChatContext } from '../../../contexts/ChatProvider';
import Icon from '../../Icon';
import ColorOption from './ColorOption';

export default function ChatCustomization() {
  const { chat } = useContext(ChatContext);

  const [chatColor, setChatColor] = useState('');

  return (
    <div className='size-full flex flex-col gap-4'>
      <p className='font-semibold text-gray-300 text-xl'>Chat Customization</p>
      <div className='flex flex-col gap-9 h-full'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-gray-300 text-lg'>Nicknames</p>
          <div className='flex flex-col gap-3'>
            {chat?.participants?.map(participant => {
              return (
                <div key={participant?._id} className='flex flex-row h-full items-center w-96'>
                  <img className='rounded-l w-12 object-cover' src={`/server/${participant?.user.image}`} alt='pfp' />
                  <input
                    value={participant?.nickname.length > 0 ? participant?.nickname : participant?.user.username}
                    // onChange={e => setMateName(e.target.value)}
                    className='bg-white/10 text-gray-300 w-full h-full text-base px-3 py-2 outline-hidden'
                  />
                  <div
                    className='bg-white/30 flex h-full items-center rounded-r px-1 cursor-pointer'
                    onClick={() => {
                      // useFetch({ url: `/conversation/${id}`, body: { nickname: mateName }, method: 'PATCH' }).then(res => {
                      //   setCurrentChat(res);
                      // });
                    }}
                  >
                    <Icon icon='check' />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-medium text-gray-300 text-lg'>Appearance</p>
          <div className='w-[30rem]'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row gap-4 w-full'>
                <div className='flex flex-col w-full gap-1.5'>
                  <ColorOption option='Sky' color='bg-sky-200' />
                  <ColorOption option='Green' color='bg-green-200' />
                  <ColorOption option='Soft pink' color='bg-pink-200' />
                  <ColorOption option='Purple' color='bg-purple-200' />
                </div>
                <div className='flex flex-col w-full gap-1.5'>
                  <ColorOption option='Dark Sky' color='bg-sky-950' />
                  <ColorOption option='Dark Green' color='bg-green-950' />
                  <ColorOption option='Dark pink' color='bg-pink-950' />
                  <ColorOption option='Dark Purple' color='bg-purple-950' />
                </div>
              </div>
              <div>
                <p className='text-sm text-gray-300'>Default</p>
                <div className='bg-[#393A42] rounded p-5 border border-white'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
