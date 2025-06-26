import { useEffect, useState, useContext } from 'react';
import { Navigate, Outlet, useOutlet } from 'react-router-dom';

import { UserContext } from '../../contexts/UserProvider';
import useScreenSize from '../../hooks/useScreenSize';
import useFetch from '../../hooks/useFetch';

import Loading from '../Loading';
import Placeholder from '../Placeholder';
import ProfileHeader from '../ProfileHeader';

export default function Private({ children }) {
  const { user, setUserAuth } = useContext(UserContext);

  const screenSize = useScreenSize();
  const outlet = useOutlet();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      useFetch({ url: 'user' })
        .then(res => setUserAuth(res))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Loading />;

  if (!isLoading && !user) return <Navigate to='/login' />;
  return (
    <div className='w-screen h-screen bg-[#2E2F38] flex flex-row'>
      {screenSize > 768 && (
        <>
          <div className='w-92 h-screen bg-[#25262D] pt-4 flex flex-col justify-between'>
            <div className='flex flex-col gap-5 px-3'>
              <div className='flex flex-row items-center gap-2'>
                <img className='h-7 w-8 p-1 bg-white/80 rounded' src='/logoSVG.svg' alt='logo' />
                <p className='font-[nuosu] text-white text-sm'>ShadowTalk</p>
              </div>
              <div>{children}</div>
            </div>
            <ProfileHeader />
          </div>
          <div className='size-full overflow-auto'>{outlet ? <Outlet /> : <Placeholder />}</div>
        </>
      )}
      {screenSize < 768 && (
        <>
          {!outlet ? (
            <div className='w-screen h-screen bg-[#25262D] flex flex-col justify-between'>
              {children}
              <ProfileHeader />
            </div>
          ) : (
            <div className='size-full'>{outlet ? <Outlet /> : <Placeholder />}</div>
          )}
        </>
      )}
    </div>
  );
}
