import { useEffect, useState, useContext } from 'react';
import { Navigate, Outlet, useNavigate, useOutlet } from 'react-router-dom';
import Loading from '../Loading';

import { UserContext } from '../../UserProvider';
import Icon from '../Icon';

import { logout } from '../../helpers/auth';
import useFetch from '../../helpers/useFetch';

import Placeholder from '../Placeholder';
import Settings from '../../views/private/Settings';

export default function Private() {
  const { user, setUserAuth } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const outlet = useOutlet();
  const navigate = useNavigate();

  const logoutUser = () => {
    logout().then(() => {
      setUserAuth(null);
      navigate('/');
    });
  };

  useEffect(() => {
    useFetch({ url: 'user' })
      .then(res => {
        setUserAuth(res);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      {!user ? (
        <Navigate to='/login' />
      ) : (
        <div className='w-full h-screen bg-[#2E2F38] flex flex-row'>
          {show && <Settings setShow={setShow} />}
          <div className='sm:w-84 w-screen pt-4 px-4 h-screen bg-[#25262D] flex flex-col justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <img className='h-7 w-8 p-1 bg-white/80 rounded' src='/logoSVG.svg' alt='logo' />
              <p className='font-[nuosu] text-white text-sm'>ShadowTalk</p>
            </div>
            <div className='bg-[#1C1D22] text-white p-4 -mx-4 flex flex-row justify-between'>
              <div className='flex flex-row items-center gap-2 font-semibold'>
                <img
                  className='rounded-full border border-gray-500 w-10 object-cover'
                  src={`/server/${user?.image}`}
                  alt='pfp'
                />
                <p className='text-sm'>
                  {user?.username.length > 10 ? `${user?.username.substring(0, 10)}...` : user?.username}
                </p>
              </div>
              <div className='flex flex-row items-center gap-4 text-gray-300'>
                <Icon onClick={() => setShow(true)} styles='!text-2xl' icon='settings' />
                <Icon onClick={logoutUser} styles='!text-2xl' icon='logout' />
              </div>
            </div>
          </div>
          {outlet ? <Outlet /> : <Placeholder />}
        </div>
      )}
    </>
  );
}
