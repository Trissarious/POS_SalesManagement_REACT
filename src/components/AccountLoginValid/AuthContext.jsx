import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [isCashierLoggedIn, setIsCashierLoggedIn] = useState(false);
  const [isSalesManLoggedIn, setIsSalesManLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn ] = useState();

  return (
    <AuthContext.Provider value={{ isCashierLoggedIn, setIsCashierLoggedIn, isSalesManLoggedIn, setIsSalesManLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
