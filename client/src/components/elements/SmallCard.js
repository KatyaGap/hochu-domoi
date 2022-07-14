import * as React from 'react';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteBorder, PinDrop, Restore } from '@mui/icons-material';
import { makeLikeThunk } from '../../redux/actions/adverts';

export default function SmallCard({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { likes } = useSelector((state) => state);
  const [flag, setFlag] = React.useState(false);
  const petLink = () => {
    navigate(`/pet/${post.id}`);
  };
  const makeLike = (e, obj) => {
    dispatch(makeLikeThunk(obj));
    likes.indexOf((el) => el.post_id === post.id);
    // const icon = e.target.classList.contains('like-icon') ? e.target : e.target.querySelector('.like-icon'); // находим элемент иконки
    // icon.classList.toggle("filled");
  };

  // console.log('likes: ', likes);
  // console.log('post: ', post);

  return (
    <Card sx={{ minWidth: 216, maxWidth: 216 }} className="card small-card">
      <CardActionArea onClick={petLink}>
        <CardMedia
          component="img"
          height="180"
          image={post.photo_url}
          alt="фотография потеряшки"
        />

        <CardContent className="card-content small-card-content">
          <Typography
            className="card-description small-card-description"
            variant="subtitle2"
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
        </CardContent>
      </CardActionArea>

      <div className="card-overlay">
        <IconButton
          className="favorites-button"
          aria-label="like"
          size="large"
          onClick={(e) => makeLike(e, post)}
        >
          <span className={likes.find((el) => el.post_id === post.id)
            ? "material-symbols-outlined like-icon filled"
            : "material-symbols-outlined like-icon"}
          >
            favorite
          </span>
        </IconButton>

        <Chip
          label={post?.status}
          size="small"
          className="card-status"
          variant="outlined"
          color="primary"
        />
      </div>
    </Card>
  );
}
