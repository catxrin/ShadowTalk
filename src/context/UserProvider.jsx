import { createContext, useState } from 'react';
export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [online, setOnline] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const setUserAuth = userData => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserAuth, online, setOnline, onlineUsers, setOnlineUsers }}>
      {children}
    </UserContext.Provider>
  );
}
