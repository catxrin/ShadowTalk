import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  return <UserContext.Provider value={{ user, setUser, onlineUsers, setOnlineUsers }}>{children}</UserContext.Provider>;
}
