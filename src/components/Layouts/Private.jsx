import { useEffect, useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../../UserProvider';
import useFetch from '../../helpers/useFetch';
import Icon from '../Icon';

export default function Private() {
  const { user, setUserAuth } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useFetch({ url: 'user' })
      .then(res => {
        setUserAuth(res);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {!user ? (
        <Navigate to='/login' />
      ) : (
        <div className='w-full h-screen bg-[#2E2F38] flex flex-row'>
          <div className='lg:w-84 w-screen pt-4 px-4 h-screen bg-[#25262D] flex flex-col justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <img className='h-7 w-8 p-1 bg-white/80 rounded' src='/logoSVG.svg' alt='logo' />
              <p className='font-[nuosu] text-white text-sm'>ShadowTalk</p>
            </div>
            <div className='bg-[#1C1D22] text-white p-4 -mx-4 flex flex-row justify-between'>
              <div className='flex flex-row items-center gap-2 font-semibold'>
                <img className='rounded-full border border-gray-500 w-10 object-cover' src='/pfp.jpeg' alt='pfp' />
                <p className='  text-sm'>{user?.username}</p>
              </div>
              <div className='flex flex-row items-center gap-4 text-gray-300'>
                <Icon styles='!text-2xl' icon='settings' />
                <Icon styles='!text-2xl' icon='logout' />
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}
