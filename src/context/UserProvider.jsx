import { createContext, useState } from 'react';
export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const setUserAuth = userData => {
    setUser(userData);
  };

  return <UserContext.Provider value={{ user, setUserAuth }}>{children}</UserContext.Provider>;
}
