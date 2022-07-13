import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Button, Modal } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelect } from '@mui/base';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import { getAdvertsThunk } from '../redux/actions/adverts';
import { UserContext } from '../context/user';
import BasicModal from './BasicModal';

export default function Pet({ post }) {
  const dispatch = useDispatch();
  const params = useParams();
  const { adverts } = useSelector((state) => state);
  const location = useLocation();
  const id = location.pathname.slice(-1);
  // console.log(id);
  const [pet, setPet] = React.useState({});
  const [expanded, setExpanded] = React.useState(true);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  React.useEffect(() => {
    fetch(`/adverts/${id}`)
      .then((res) => res.json())
      .then((res) => setPet(res));
  }, []);
  // console.log('pet', pet);
  // console.log(adverts);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleNav = () => navigate('/auth');

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={pet.photo_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet.user_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet.text}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {pet.address_string}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Показать номер</Button>
        {user ? <BasicModal /> : <Button onClick={handleNav}>Зарегистрироваться для отправки сообщений</Button>}
      </CardActions>
    </Card>
  );
}
