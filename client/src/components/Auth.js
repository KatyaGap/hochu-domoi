import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import '../App.css';
import { TextField, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { UserContext } from '../context/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ isNewPost }) {
  const [regToggle, setRegToggle] = useState(false);
  const { handleAuth, handleLogout, message } = useContext(UserContext);

  const regAuthToggle = () => {
    const titles = document.querySelectorAll('.auth-title-text');
    titles.forEach((el) => el.classList.toggle('auth-off'));
    setRegToggle(!regToggle);
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
        <Typography
          variant="h4"
          className="auth-title-text"
          gutterBottom
          component="div"
        >
          Авторизация
        </Typography>
        <Switch {...label} onClick={regAuthToggle} />
        <Typography
          variant="h4"
          className="auth-title-text auth-off"
          gutterBottom
          component="div"
        >
          Регистрация
        </Typography>
      </div>

      <form onSubmit={sendForm} id="auth-form" className="auth-form">
        {regToggle ? (
          <TextField required name="name" label="Имя" variant="outlined" />
        ) : null}
        <TextField required name="email" label="Почта" variant="outlined" />
        <TextField
          required
          name="password"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button
          variant="contained"
          type="submit"
          className="form-button"
          size="large"
        >
          Отправить
        </Button>
      </form>
      {message && (
        <div className='toast-njksonkio'>
          {toast.info(message, {
            position: toast.POSITION.BOTTOM_CENTER,
          })}
        </div>
      )}
    </div>
  );
}

export default Auth;
