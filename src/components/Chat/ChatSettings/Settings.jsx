import { useContext, useEffect, useState } from 'react';
import Modal from '../../Modal';
import Option from './Option';
import Icon from '../../Icon';
import useFetch from '../../../hooks/useFetch';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChatContext } from '../../../contexts/ChatProvider';

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState('');

  useEffect(() => {
    const currentTab = location.pathname.split('settings/')[1];
    setTab(currentTab);
  }, [location]);
  // const [mateName, setMateName] = useState('');
  // const { id } = useParams();
  // const { chat, setCurrentChat } = useContext(ChatContext);
  // const partner = chat?.participants?.find(participant => participant.user._id === id);

  // const handleBlock = () => {
  //   useFetch({ url: `/conversation/${id}/block`, method: 'PATCH' }).then(res => {
  //     setCurrentChat(res);
  //     setShow(false);
  //   });
  // };

  // useEffect(() => {
  //   setMateName(partner?.nickname);
  // }, []);
  return (
    <div className='w-screen h-screen flex flex-row'>
      <div className='h-screen w-84 bg-[#121214] text-gray-300 py-4 px-1.5 flex flex-col gap-1'>
        <p
          onClick={() => navigate('chat_customization')}
          className={`cursor-pointer rounded py-3 ${
            tab === 'chat_customization' ? 'bg-white/10' : 'hover:bg-white/10'
          } px-2`}
        >
          Chat Customization
        </p>
        <p
          onClick={() => navigate('danger_zone')}
          className={`cursor-pointer rounded py-3 ${tab === 'danger_zone' ? 'bg-white/10' : 'hover:bg-white/10'} px-2`}
        >
          Danger Zone
        </p>
      </div>
      <div className='h-screen w-full py-6 px-10 bg-[#202024]'>
        <Outlet />
      </div>
    </div>
    // <Modal setShow={setShow} label='Chat Settings'>
    //   <div className='flex flex-col gap-5'>
    //     <div className='flex flex-col'>
    //       <label className='text-sm text-gray-300'>Set a nickname to your chat mate!</label>
    //       <div className='flex flex-row items-center h-full'>
    //         <img className='rounded-l w-10 object-cover' src={`/server/${partner?.user.image}`} alt='pfp' />
    //         <input
    //           value={mateName}
    //           onChange={e => setMateName(e.target.value)}
    //           className='bg-[#404048] text-gray-300 w-full text-base px-3 py-2 outline-hidden'
    //         />
    //         <Icon
    //           onClick={() => {
    //             useFetch({ url: `/conversation/${id}`, body: { nickname: mateName }, method: 'PATCH' }).then(res => {
    //               setCurrentChat(res);
    //               setShow(false);
    //             });
    //           }}
    //           styles='bg-white/15 py-2 px-1 rounded-r'
    //           icon='check'
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       {chat?.blocked ? (
    //         <Option
    //           color='bg-green-700'
    //           icon='block'
    //           label='Unblock user'
    //           description='By clicking here, you will restore the ability to send and receive messages with this user.'
    //           onClick={handleBlock}
    //         />
    //       ) : (
    //         <Option
    //           onClick={handleBlock}
    //           icon='block'
    //           label='Block user'
    //           description='By clicking here sending or receiving messages from this user will be forbidden unless you unblock the user'
    //         />
    //       )}
    //       <div className='min-w-full h-[1px] bg-gray-500'></div>
    //       <Option
    //         icon='delete'
    //         label='Delete chat'
    //         description='By clicking here you will lose your chat with this user forever. The user can still be found, however, the
    //         chat will be gone'
    //       />
    //     </div>
    //   </div>
    // </Modal>
  );
}
