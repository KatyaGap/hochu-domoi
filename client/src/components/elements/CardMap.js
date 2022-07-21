import { FavoriteBorder, PinDrop, Restore } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeLikeThunk } from '../../redux/actions/adverts';

function CardMap({ post, hasLike, setTypeAndPan }) {
  const { likes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const petLink = () => {
    navigate(`/pet/${post.id}`);
  };

  const makeLike = React.useCallback((obj) => {
    dispatch(makeLikeThunk(obj));
  }, []);

  return (
    <Card className="card map-card" variant="outlined">
      <CardActionArea onClick={() => setTypeAndPan(post.address_lattitude, post.address_longitude)} sx={{ display: 'flex' }}>

        <CardMedia className="card-photo" component="img" sx={{ width: 130 }} image={post?.photo_url} alt="Фото питомца" />
        <CardContent className="card-content">
          <Typography
            className="card-description small-card-description"
            variant="body2"
            color="text.secondary"
          >
            {post?.text}
          </Typography>
          <div className="card-bottom">
            <Typography
              className="card-address small-card-address"
              variant="caption"
              color="text.secondary"
            >
              <PinDrop
                sx={{
                  width: '16px',
                  height: '16px',
                  position: 'relative',
                  top: '3px',
                  marginRight: '3px',
                }}
              />
              {post?.address_string}
            </Typography>
            <Typography
              className="card-timesincemissing"
              variant="caption"
              color="text.secondary"
            >
              <Restore
                sx={{
                  width: '16px',
                  height: '16px',
                  position: 'relative',
                  top: '3px',
                  marginRight: '3px',
                }}
              />
              {post?.timeSinceMissing}
            </Typography>
          </div>

          <div className="card-overlay">
            <IconButton
              className="favorites-button"
              aria-label="like"
              size="large"
              onClick={() => makeLike(post)}
            >
              <span className={likes.find((el) => el.post_id === post.id)
                ? "material-symbols-outlined like-icon filled"
                : "material-symbols-outlined like-icon"}
              >
                favorite
              </span>
            </IconButton>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardMap;
