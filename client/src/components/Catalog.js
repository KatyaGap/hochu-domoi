import { TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAdvertsThunk } from '../redux/actions/adverts';
import Filters from './Filters';
import PostList from './PostList';

function Catalog() {
  const dispatch = useDispatch();
  const { adverts, filtered } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAdvertsThunk());
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const searchedPosts = useMemo(
    () => adverts.filter((el) => el.text.includes(searchQuery)),
    [searchQuery],
  );
	console.log('=====', searchedPosts)
  return (
    <div className="cont">
      {/* <TextField
        id="outlined-basic"
        rows={4}
        sx={{ m: 1 }}
        variant="outlined"
        name="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Введите текст объявления"
      /> */}
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
