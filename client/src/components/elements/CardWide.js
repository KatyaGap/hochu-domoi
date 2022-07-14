import { PinDrop, Restore } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteLikeThunk } from '../../redux/actions/adverts';

function CardWide({ post, handleDeletePost }) {
	console.log('post', post)
  const dispatch = useDispatch();
  const location = useLocation();
	console.log('location.pathname', location.pathname)
  const { likes } = useSelector((state) => state);
  console.log('post', post);
  const deleteLike = React.useCallback((id) => {
    console.log('id', id);
    dispatch(deleteLikeThunk(id));
  }, []);
  return (
    <Card className="card card-wide" variant="outlined">
      <CardActionArea className="card-action-area">
        <CardMedia
          className="card-photo"
          component="img"
          sx={{ width: 200 }}
          image={post?.photo_url}
          alt="Фото питомца"
        />
        <CardContent className="card-content">
          <div className="card-top">
            <Typography
              className="card-description small-card-description"
              variant="h6"
            >
              {post?.text}
            </Typography>
            <Chip
              label={post['Status.status'] || post.status}
              className="card-status"
              variant="outlined"
              color="primary"
            />
          </div>
          <div className="card-bottom">
            <Typography
              className="card-address small-card-address"
              variant="body2"
              color="text.secondary"
            >
              <PinDrop
                sx={{
                  width: '18px',
                  height: '18px',
                  position: 'relative',
                  top: '3px',
                  marginRight: '3px',
                }}
              />
              {post?.address_string}
            </Typography>
            <Typography
              className="card-timesincemissing"
              variant="body2"
              color="text.secondary"
            >
              <Restore
                sx={{
                  width: '18px',
                  height: '18px',
                  position: 'relative',
                  top: '3px',
                  marginRight: '3px',
                }}
              />
              {post?.timeSinceMissing}
            </Typography>
          </div>
          {(location.pathname === '/profile/favor') && (
            <IconButton
              onClick={() => deleteLike(post.post_id)}
              aria-label="delete"
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
					{(location.pathname ===  '/profile' ) && (
            <IconButton
              onClick={() => handleDeletePost(post.id)}
              aria-label="delete"
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default CardWide;
