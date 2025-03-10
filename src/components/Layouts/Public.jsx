import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../../UserProvider';
import Navigation from '../Navigation/Navigation';

export default function Public() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user?.auth ? (
        <Navigate to='/chat' />
      ) : (
        <>
          <Navigation />
          <Outlet />
        </>
      )}
    </>
  );
}
