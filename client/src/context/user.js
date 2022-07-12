import React, { createContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

  const handleAuth = async (data, regToggle, newPost) => {
    const fetchUrl = regToggle ? '/auth/register' : '/auth/login';
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      console.log('result', result);
      if (result.id) {
        setUser({ id: result.id, name: result.name, email: result.email });
        if (newPost) {
          navigate('/newpost');
        } else {
          navigate('/');
        }
      } else {
        console.log('message', result.message);
        setMessage(result.message);
      }
    }
  };

  const handleUpdate = async (data) => {
    let result;
    const fetchUrl = '/auth/update';
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
    });
    console.log('data: ', data);
    if (response.ok) {
      result = await response.json();
      if (result.id) {
        setUser({ id: result.id, name: result.name, email: result.email });
        setMessage(result.message);
        return result;
      }
      setMessage(result.message);
    }
    return result;
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/lk/avatar`, { method: 'delete' });
      const result = await response.json();
      console.log('res1', result);
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleAuth,
        handleLogout,
        handleUpdate,
        loading,
        message,
        setMessage,
        handleDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
