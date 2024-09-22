import React, { createContext, useState, useEffect } from 'react';
import { getUserDetails } from '../utils/apiServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (access) {
      getUserDetails(access).then(userData => {
        setUser({ ...userData, token: access });
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (accessToken) => {
    localStorage.setItem('access', accessToken);
    const userData = await getUserDetails(accessToken);
    setUser({ ...userData, token: accessToken });
  };

  const logout = () => {
    localStorage.removeItem('access');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
