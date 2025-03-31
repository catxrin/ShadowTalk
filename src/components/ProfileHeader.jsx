import Icon from './Icon';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useState } from 'react';
import Settings from '../views/private/Settings';
import { useNavigate } from 'react-router-dom';

import { logout } from '../helpers/auth';
export default function ProfileHeader() {
  const { user, setUserAuth, online } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const logoutUser = () => {
    logout().then(() => {
      setUserAuth(null);
      navigate('/');
    });
  };
  return (
    <>
      {show && <Settings setShow={setShow} />}
      <div className='bg-[#1C1D22] text-white px-4 h-19 flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-2 font-semibold'>
          <div className='relative'>
            <img
              className='rounded-full border border-gray-500 w-10 object-cover'
              src={`/server/${user?.image}`}
              alt='pfp'
            />
            <div
              className={`p-1 absolute right-0 top-7 border-2 border-black max-w-1 rounded-full ${
                online ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
          </div>
          <p className='text-sm truncate'>{user?.username}</p>
        </div>
        <div className='flex flex-row items-center gap-4 text-gray-300'>
          <Icon onClick={() => setShow(true)} styles='!text-2xl' icon='settings' />
          <Icon onClick={logoutUser} styles='!text-2xl text-red-600' icon='logout' />
        </div>
      </div>
    </>
  );
}
