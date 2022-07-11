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

  return (
    <div className="profile-container">

      <div className="profile-my-data">
        <Typography className="profile-title" variant="h4" gutterBottom component="div">
          Мои данные
        </Typography>

      </div>

      <div className="profile-my-posts">
        <Typography className="profile-title" variant="h4" gutterBottom component="div">
          Мои объявления
        </Typography>

        <Stack className="my-posts-container" spacing={2}>
          {profile.map((post) => <CardWide key={post?.id} post={post} />)}
        </Stack>
      </div>

    </div>
  );
}

export default Profile;
