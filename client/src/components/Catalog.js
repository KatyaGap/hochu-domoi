import { TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAdvertsThunk } from '../redux/actions/adverts';
import Filters from './elements/Filters';
import PostList from './elements/PostList';

function Catalog() {
  const dispatch = useDispatch();
  const { adverts, filtered } = useSelector((state) => state);
  console.log('adverts', adverts);
  console.log('filtered', filtered);
  useEffect(() => {
    dispatch(getAdvertsThunk());
  }, []);
  return (
    <div className="cont">
      <div>
        <Filters adverts={adverts} />
      </div>
      <div>
        <PostList adverts={filtered.length ? filtered : adverts} />
      </div>
    </div>
  );
}

export default Catalog;
