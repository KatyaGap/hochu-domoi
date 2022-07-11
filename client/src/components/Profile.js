import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../redux/actions/adverts';
import CardWide from './elements/CardWide';

function Profile() {
  const dispatch = useDispatch();
  const { profile, filtered } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getProfileThunk());
  }, []);
  const profileFounds = profile?.filter((el) => el.type_id === 1);
  const profileLosts = profile?.filter((el) => el.type_id === 2);

  return (
    <div className="profile-container">
      <div className="profile-wrapper">

        <div className="profile-my-data">
          <Typography className="profile-title" variant="h4" gutterBottom component="div">
            Мои данные
          </Typography>

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
    </div>
  );
}

export default Profile;
