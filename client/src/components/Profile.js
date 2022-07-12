import { Avatar, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { UserContext } from '../context/user';
import { getProfileThunk } from '../redux/actions/adverts';
import CardWide from './elements/CardWide';

function Profile() {
  const { user, handleUpdate, message, setMessage } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  setMessage('');

  const dispatch = useDispatch();
  const { profile, filtered } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getProfileThunk());
  }, []);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const profileFounds = profile?.filter((el) => el.type_id === 1);
  const profileLosts = profile?.filter((el) => el.type_id === 2);

  const sendForm = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log('data: ', data);
    const result = await handleUpdate(data);
    if (result.user?.email) { setEmail(result.user.email); }
    if (result.user?.name) { setUsername(result.user.name); }
    setEdit(false);
  };

  const updateAvatar = () => {
    // тут обновление аватара
  };

  const deleteAvatar = () => {
    // тут удаление аватара
  };

  const editToggle = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    setUsername(user?.name);
    setEmail(user?.email);
  }, [user]);

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div className="profile-container">
      <div className="profile-wrapper">

        <div className="profile-my-data">
          <div className="profile-my-data-title">
            <Typography className="profile-title" variant="h4" gutterBottom component="div">
              Мои данные
            </Typography>
            {edit
              ? <Button variant="outlined" onClick={editToggle} color="info">Отмена</Button>
              : <Button variant="outlined" onClick={editToggle}>Изменить</Button>}
          </div>

          <div className="profile-my-data-content">

            <div className="avatar-flex">
              <div className="avatar-container" sx={{ mt: 4, width: 180, height: 180 }}>
                <Avatar className="avatar" alt={user?.name} src={user?.user_photo} sx={{ width: 180, height: 180 }} />
                {edit
                  ? (
                    <label htmlFor="avatar-update">
                      <Input onChange={updateAvatar} accept="image/*" id="avatar-update" multiple type="file" />
                      <div className="avatar-fade">Выбрать новую</div>
                    </label>
                  )
                  : null}
              </div>
              {edit
                ? <Typography onClick={deleteAvatar} className="delete-button" variant="caption" gutterBottom component="div">Удалить</Typography>
                : null}
            </div>
            <div className="profile-my-data-text">
              <form onSubmit={sendForm} id="user-update-form">

                <div className="profile-my-data-data">
                  <Typography variant="h6" gutterBottom component="div" sx={{ mt: 4 }}>
                    Имя
                  </Typography>
                  {edit
                    ? <TextField name="name" defaultValue={username} className="profile-textfield" label="Введите новое имя" variant="outlined" />
                    : <Typography variant="body1" className="profile-textfield read-only" gutterBottom component="div">{username}</Typography>}
                </div>

                <div className="profile-my-data-data">
                  <Typography variant="h6" gutterBottom component="div" sx={{ mt: 4 }}>
                    E-mail
                  </Typography>
                  {edit
                    ? <TextField name="email" defaultValue={email} className="profile-textfield" label="Введите новую почту" variant="outlined" />
                    : <Typography variant="body1" className="profile-textfield read-only" gutterBottom component="div">{email}</Typography>}
                </div>

                <div className="profile-my-data-data">
                  <Typography variant="h6" gutterBottom component="div" sx={{ mt: 4 }}>
                    Пароль
                  </Typography>
                  {edit
                    ? <TextField name="password" className="profile-textfield" label="Введите новый пароль" type="password" autoComplete="current-password" variant="outlined" />
                    : <Typography variant="body1" className="profile-textfield read-only" gutterBottom component="div">••••••••</Typography>}

                </div>

                <div className="profile-my-data-data send-form">
                  {edit
                    ? <Button variant="contained" type="submit" className="form-button" size="large">Обновить</Button>
                    : null}
                </div>

              </form>
            </div>

          </div>

        </div>

        {profile.length > 0
          ? (
            <div className="profile-my-posts">
              <Typography className="profile-title" variant="h4" gutterBottom component="div">
                Мои объявления
              </Typography>

              {profileLosts.length > 0
                ? (
                  <>
                    <Typography variant="h5" gutterBottom component="div" sx={{ mt: 4 }}>
                      Потерявшиеся
                    </Typography>
                    <Stack className="my-posts-container" spacing={2}>
                      {profileLosts.map((post) => <CardWide key={post?.id} post={post} />)}
                    </Stack>
                  </>
                )
                : null}

              {profileFounds.length > 0
                ? (
                  <>
                    <Typography variant="h5" gutterBottom component="div" sx={{ mt: 4 }}>
                      Найденные
                    </Typography>
                    <Stack className="my-posts-container" spacing={2}>
                      {profileFounds.map((post) => <CardWide key={post?.id} post={post} />)}
                    </Stack>
                  </>
                )
                : null}
            </div>
          )
          : (
            <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center' }}>
              У вас пока нет объявлений
            </Typography>
          )}

      </div>
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

export default Profile;
