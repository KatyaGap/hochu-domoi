import {
  Avatar,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { CollectionsBookmarkRounded } from '@mui/icons-material';
import { UserContext } from '../context/user';
import {
	deleteLikeThunk,
  getLikesThunk,
} from '../redux/actions/adverts';
import CardWide from './elements/CardWide';
import { useLocation } from 'react-router-dom';

function Favor() {
  const dispatch = useDispatch();
	// const location = useLocation();
  const { likes } = useSelector((state) => state);
	// console.log('likes0', likes[0])
	console.log('likes in favor', likes)
  // const handleDeleteLike = useCallback((id) => {
  //   dispatch(deleteLikeThunk(id));
  // }, []);
console.log('likes', likes)
  useEffect(() => {
    dispatch(getLikesThunk());
  }, []);

  const likesFounds = likes.filter((el) => el.type_id === 1);
  const likesLosts = likes.filter((el) => el.type_id === 2);
// console.log('likesfound', likesFounds)
// console.log('likeslosts', likesLosts)
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
                      // handleDelete={handleDeletePost}
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
                    <CardWide
                      key={post?.id}
                      post={post}
                      // handleDeletePost={handleDeletePost}
                    />
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
