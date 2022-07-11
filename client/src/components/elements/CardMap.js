import { PinDrop, Restore } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function CardMap({ post }) {
  return (
    <Card className="card map-card" variant="outlined">
      <CardActionArea sx={{ display: 'flex' }}>
        <CardMedia className="card-photo" component="img" sx={{ width: 130 }} image={post?.photo_url} alt="Фото питомца" />
        <CardContent className="card-content">
          <Typography className="card-description small-card-description" variant="body2" color="text.secondary">
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
      </CardActionArea>
    </Card>
  );
}

export default CardMap;
