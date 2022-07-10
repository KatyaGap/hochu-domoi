import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function CardMap({ post }) {
  console.log(post);
  return (
    <Card>
      <CardActionArea sx={{ display: 'flex' }}>
        <CardMedia component="img" sx={{ width: 151 }} image={post?.photo_url} alt="Live from space album cover" />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            <Typography className="card-description small-card-description" variant="body2" color="text.secondary">
              {post?.text}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default CardMap;
