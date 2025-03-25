import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../../context/UserProvider';
import Navigation from '../Navigation/Navigation';

export default function Public() {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {user ? (
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
