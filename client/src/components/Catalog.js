import { TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertsThunk } from '../redux/actions/adverts';
import Filters from './elements/Filters';
import PostList from './elements/PostList';

function Catalog() {
  const dispatch = useDispatch();
  const { adverts, filtered } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAdvertsThunk());
  }, []);

  return (
    <div className="container catalog">
      <div className="content catalog">
        <Typography variant="h3" gutterBottom component="div">Каталог</Typography>
        <Filters adverts={adverts} />
        <PostList posts={filtered} adverts={adverts} />
      </div>
    </div>
  );
}

export default Catalog;
