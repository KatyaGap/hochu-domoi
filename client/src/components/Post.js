import { PinDrop } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

function Post({ post }) {
  return (
    <Card sx={{ width: 216, minWidth: 216 }} className="small-card">
      {/* <CardActionArea onClick={petLink}> */}
      <CardActionArea>
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

export default Post;
