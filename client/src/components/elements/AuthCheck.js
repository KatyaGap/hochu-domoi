import React, { useContext, useEffect } from 'react';
import '../App.scss';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';

function AuthCheck({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('приватный роутер в деле');
      navigate('/');
    }
  }, []);

  return (
    <div>{ children }</div>
  );
}

export default AuthCheck;
