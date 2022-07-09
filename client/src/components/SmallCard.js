import * as React from 'react';
import { Button, Card, CardMedia, CardContent, CardActions, CardActionArea, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PinDrop } from '@mui/icons-material';

export default function SmallCard({ imgUrl }) {
  const navigate = useNavigate();

  const petLink = () => { navigate('/pet'); };

  return (
    <Card sx={{ width: 216, minWidth: 216 }} className="small-card">
      <CardActionArea onClick={petLink}>
        <CardMedia
          component="img"
          height="180"
          image={imgUrl}
          alt="фотография потеряшки"
        />

        <CardContent className="card-content small-card-content">
          <Typography className="card-address small-card-address" variant="h6" color="text.secondary">
            <PinDrop sx={{ width: "16px", height: "16px", position: "relative", top: "1px", marginRight: "3px" }} />
            ул. Сходненская, 28
          </Typography>
          <Typography className="card-description small-card-description" variant="body2" color="text.secondary">
            Пропала собака по кличке Дружок
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
