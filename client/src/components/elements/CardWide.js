import { PinDrop, Restore } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
// import { use } from '../../../../server/routers/mapRouter';

function CardWide({ post, handleDeletePost }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  console.log('post: ', post);

  const petLink = () => {
    navigate(`/pet/${post.id}`);
  };

  return (
    <Card className="card card-wide" variant="outlined">
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
            <Chip
              label={post.status}
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
          {location.pathname.includes('profile') && (
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
