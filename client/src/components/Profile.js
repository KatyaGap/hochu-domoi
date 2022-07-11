import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertsThunk } from '../redux/actions/adverts';
import CardBig from './elements/CardBig';

function Profile() {
  const dispatch = useDispatch();
  const { adverts, filtered } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAdvertsThunk());
  }, []);

  return (
    <div className="container">

      <Paper>
        {adverts.map((post) => <CardBig post={post} />)}
      </Paper>

    </div>
  );
}

export default Profile;
