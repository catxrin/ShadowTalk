import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const setUserAuth = userData => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserAuth, onlineUsers, setOnlineUsers }}>{children}</UserContext.Provider>
  );
}
