import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { UserContext } from '../../contexts/UserProvider';
import Navigation from '../Navigation/Navigation';
import useFetch from '../../hooks/useFetch';

export default function Public() {
  const { user, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      useFetch({ url: 'user', noError: true }).then(res => {
        if (res) {
          setUserAuth(res);
          navigate('/chat');
        }
      });
    }
  }, []);

  if (user) return <Navigate to='/chat' />;

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
