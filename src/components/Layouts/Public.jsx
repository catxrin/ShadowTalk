import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserProvider';
import Navigation from '../Navigation/Navigation';
import useFetch from '../../helpers/useFetch';

export default function Public() {
  const { user, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    useFetch({ url: 'user' }).then(res => {
      setUserAuth(res);
      navigate('/chat');
    });
  }, []);

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
