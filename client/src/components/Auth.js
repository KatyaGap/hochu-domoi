import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import '../App.scss';
import { TextField, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { toast } from 'react-toastify';
import { UserContext } from '../context/user';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ isNewPost }) {
  const [regToggle, setRegToggle] = useState(false);
  const { handleAuth, handleLogout, message, setMessage } = useContext(UserContext);
  setMessage(''); // скрываем НОВОЕ сообщение с ошибкой при переходе на регистрацию/логин

  const regAuthToggle = () => {
    const titles = document.querySelectorAll('.auth-title-text');
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
<<<<<<< HEAD
      <div>
        {message}
        {' '}
      </div>
=======
        <div className="toast-njksonkio">
          {toast.info(message, {
            position: toast.POSITION.BOTTOM_CENTER,
          })}
        </div>
>>>>>>> f52723d65828630056fd9b64add49e2f949940d4
      )}
    </div>
  );
}

export default Auth;
