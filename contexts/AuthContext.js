'use client';
import React, { useState, useEffect, useContext } from 'react';
import Loading from '@/components/Loading';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [madinahTickets, setMadinahTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null);
  }

  const getCurrentUser = () => {
    setLoading(true);
    if (!localStorage.getItem('token')) {
      setCurrentUser(null);
      setLoading(false);
    } else {
      getProfile();
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          authorization: `${localStorage.getItem('token')}`,
        },
      });
      console.log('response', response);
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.profile);
        setLoading(false);
      } else {
        console.error('Error fetching user profile');
        localStorage.removeItem('token');
        setCurrentUser(null);
        setLoading(false);
      }
    } catch (e) {
      localStorage.removeItem('token');
      setCurrentUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    getCurrentUser,
    logout,
    tickets,
    setTickets,
    madinahTickets,
    setMadinahTickets,
  };

  while (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
