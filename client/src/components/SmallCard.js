import * as React from 'react';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PinDrop } from '@mui/icons-material';

export default function SmallCard({ post }) {
  const navigate = useNavigate();

  const petLink = () => {
    navigate(`/pet/${post.id}`);
  };

  return (
    <Card sx={{ width: 216, minWidth: 216 }} className="small-card">
      <CardActionArea onClick={petLink}>
        <CardMedia
          component="img"
          height="180"
          image={post.photo_url}
          alt="фотография потеряшки"
        />

        <CardContent className="card-content small-card-content">
          <Typography
            className="card-address small-card-address"
            variant="h6"
            color="text.secondary"
          >
            <PinDrop
              sx={{
                width: '16px',
                height: '16px',
                position: 'relative',
                top: '1px',
                marginRight: '3px',
              }}
            />
            {post.adress}
          </Typography>
          <Typography
            className="card-description small-card-description"
            variant="body2"
            color="text.secondary"
          >
            {post.text}
          </Typography>
          <Typography
            className="card-description small-card-description"
            variant="body2"
            color="text.secondary"
          >
            {post.timeSinceMissing}
          </Typography>
        </CardContent>

        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </CardActionArea>
    </Card>
  );
}
