import { Avatar, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLikeThunk, getLikesThunk } from '../redux/actions/adverts';
import CardWide from './elements/CardWide';

function Favor() {
  const dispatch = useDispatch();
  const { likes } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getLikesThunk());
  }, []);

  const likesFounds = likes.filter((el) => el.type_id === 1);
  const likesLosts = likes.filter((el) => el.type_id === 2);
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {likes.length > 0 ? (
          <div className="profile-my-posts">
            <Typography
              className="profile-title"
              variant="h4"
              gutterBottom
              component="div"
            >
              Избранное
            </Typography>

            {likesLosts.length > 0 ? (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ mt: 4 }}
                >
                  Потерявшиеся
                </Typography>
                <Stack className="my-posts-container" spacing={2}>
                  {likesLosts.map((post) => (
                    <CardWide
                      key={post?.id}
                      post={post}
                    />
                  ))}
                </Stack>
              </>
            ) : null}

            {likesFounds.length > 0 ? (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ mt: 4 }}
                >
                  Найденные
                </Typography>
                <Stack className="my-posts-container" spacing={2}>
                  {likesFounds.map((post) => (
                    <CardWide key={post?.id} post={post} />
                  ))}
                </Stack>
              </>
            ) : null}
          </div>
        ) : (
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ textAlign: 'center' }}
          >
            У вас пока нет избранных объявлений
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Favor;
