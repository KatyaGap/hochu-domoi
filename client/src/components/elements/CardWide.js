import { FavoriteBorder, PinDrop, Restore } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteLikeThunk } from '../../redux/actions/adverts';

function CardWide({ post, handleDeletePost }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const id = post.post_id || post.id;

  const petLink = () => {
    navigate(`/pet/${id}`);
  };

  const { likes } = useSelector((state) => state);
  const deleteLike = React.useCallback((post_id) => {
    dispatch(deleteLikeThunk(post_id));
  }, []);
  return (
    <Card className="card card-wide" variant="outlined">

      <div className="card-overlay">
        {location.pathname === '/profile' && (
          <IconButton
            onClick={() => handleDeletePost(post.id)}
            aria-label="delete"
            className="post-delete-button"
          >
            <DeleteIcon color="error" />
          </IconButton>
        )}
        {location.pathname === '/profile/favor' && (
          <IconButton
            className="favorites-button"
            aria-label="like"
            size="large"
            onClick={() => deleteLike(post.post_id)}
          >
            <span className={likes.find((el) => el.post_id === post.post_id) ? 'material-symbols-outlined like-icon filled' : 'material-symbols-outlined like-icon'}>
              favorite
            </span>
          </IconButton>
        )}
        <Chip
          label={post['Status.status'] || post.status}
          className="card-status"
          variant="outlined"
          color="primary"
        />
      </div>

      <CardActionArea onClick={petLink} className="card-action-area">
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default CardWide;
