import { createContext, useEffect, useState } from 'react';
import useFetch from './helpers/useFetch';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const setUserAuth = userId => {
    setUser(userId);
  };
  useEffect(() => {
    useFetch({ url: 'auth' }).then(res => {
      setUser(res);
    });
  }, []);

  return <UserContext.Provider value={{ user, setUserAuth }}>{children}</UserContext.Provider>;
}
