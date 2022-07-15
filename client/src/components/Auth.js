import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import '../App.scss';
import { TextField, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { toast } from 'react-toastify';
import { UserContext } from '../context/user';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ isNewPost }) {
  const [regToggle, setRegToggle] = useState(false);
  const { handleAuth, message, setMessage } = useContext(UserContext);
  setMessage(''); // скрываем НОВОЕ сообщение с ошибкой при переходе на регистрацию/логин
  const [switched, setSwitched] = useState(false);

  const regAuthToggle = (e) => {
    e.preventDefault();
    const toggle = document.getElementById('auth-toggle');
    const titles = document.querySelectorAll('.auth-title-text');
    setSwitched(!switched);
    titles.forEach((el) => el.classList.toggle('auth-off'));
    setRegToggle(!regToggle);
    toast.dismiss(); // УРА, теперь тост скрывается при переходе с регистрации на логин и обратно
  };

  const sendForm = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    handleAuth(data, regToggle, isNewPost);
  };

  // toast.configure();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <div className="auth-container">
      <div className="auth-title">
        <Typography onClick={(e) => regAuthToggle(e)} variant="h4" className="auth-title-text" gutterBottom component="div">
          Авторизация
        </Typography>

        <Switch {...label} checked={switched} onClick={(e) => regAuthToggle(e)} />

        <Typography onClick={(e) => regAuthToggle(e)} variant="h4" className="auth-title-text auth-off" gutterBottom component="div">
          Регистрация
        </Typography>
      </div>

      <form onSubmit={sendForm} id="auth-form" className="auth-form">
        {regToggle ? (
          <TextField required name="name" label="Имя" variant="outlined" />
        ) : null}
        <TextField required name="email" label="Почта" variant="outlined" />
        <TextField required name="password" label="Пароль" type="password" autoComplete="current-password" variant="outlined" />
        <Button variant="contained" type="submit" className="form-button" size="large">
          Отправить
        </Button>
      </form>
      {message && (
        <div className="toast-njksonkio">
          {toast.info(message, {
            position: toast.POSITION.BOTTOM_CENTER,
          })}
        </div>
      )}
    </div>
  );
}

export default Auth;
