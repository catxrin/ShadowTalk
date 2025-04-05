import { useEffect, useState, useContext } from 'react';
import { Navigate, Outlet, useOutlet } from 'react-router-dom';

import { UserContext } from '../../contexts/UserProvider';
import useFetch from '../../hooks/useFetch';

import Loading from '../Loading';
import Placeholder from '../Placeholder';
import Search from '../UserSearch/Search';
import ProfileHeader from '../ProfileHeader';
import Conversations from '../Conversations/Conversations';

export default function Private() {
  const { user, setUserAuth } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const outlet = useOutlet();

  // useEffect(() => {
  //   if (!user) {
  //     useFetch({ url: 'user' })
  //       .then(res => setUserAuth(res))
  //       .finally(() => setIsLoading(false));
  //   }
  //   setIsLoading(false);
  // }, []);

  // if (isLoading) return <Loading />;
  return (
    <>
      {!user ? (
        <Navigate to='/login' />
      ) : (
        <div className='w-screen h-screen bg-[#2E2F38] flex flex-row'>
          <div className='w-84 h-screen bg-[#25262D] flex flex-col justify-between'>
            <div className='flex pt-4 px-3 h-full overflow-x-auto flex-col gap-4'>
              <div className='flex flex-row items-center gap-2'>
                <img className='h-7 w-8 p-1 bg-white/80 rounded' src='/logoSVG.svg' alt='logo' />
                <p className='font-[nuosu] text-white text-sm'>ShadowTalk</p>
              </div>
              <Search />
              <Conversations />
            </div>
            <ProfileHeader />
          </div>
          <div className='size-full'>{outlet ? <Outlet /> : <Placeholder />}</div>
        </div>
      )}
    </>
  );
}
