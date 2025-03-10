import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../UserProvider';

export default function Private() {
  const { user } = useContext(UserContext);
  return (
    <>
      {!user?.auth ? (
        <Navigate to='/login' />
      ) : (
        <>
          <p>I'm private hshshs</p>
        </>
      )}
    </>
  );
}
