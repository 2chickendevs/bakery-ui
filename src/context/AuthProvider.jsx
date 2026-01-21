import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const addToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const value = useMemo(() => ({ token, addToken, removeToken }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
