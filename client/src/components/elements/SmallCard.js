import * as React from 'react';
import { Button, Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PinDrop, Restore } from '@mui/icons-material';

export default function SmallCard({ post }) {
  const navigate = useNavigate();

  const petLink = () => {
    navigate(`/pet/${post.id}`);
  };

  console.log(post);

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
          <Typography className="card-description small-card-description" variant="subtitle2" color="text.secondary">
            {post?.text}
          </Typography>
          <div className="card-bottom">
            <Typography className="card-address small-card-address" variant="caption" color="text.secondary">
              <PinDrop sx={{ width: '16px', height: '16px', position: 'relative', top: '3px', marginRight: '3px' }} />
              {post?.address_string}
            </Typography>
            <Typography className="card-timesincemissing" variant="caption" color="text.secondary">
              <Restore sx={{ width: '16px', height: '16px', position: 'relative', top: '3px', marginRight: '3px' }} />
              {post?.timeSinceMissing}
            </Typography>
          </div>
        </CardContent>

        <Chip label={post?.status} size="small" className="card-status" variant="outlined" color="primary" />

      </CardActionArea>
    </Card>
  );
}
