import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/auth')
      .then((res) => res.json())
      .then((res) => setUser(res))
      .finally(() => setLoading(false));
    return () => {};
  }, []);

  const handleLogout = () => fetch('/auth/logout')
    .then(() => {
      setUser(null);
    })
    .catch(console.log);

  const handleAuth = async (data, regToggle) => {
    const fetchUrl = regToggle ? '/auth/register' : '/auth/login';
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      if (result.id) {
        setUser({ id: result.id, name: result.name, email: result.email });
      } else {
        setMessage(result.message);
      }
    }
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, handleAuth, handleLogout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
