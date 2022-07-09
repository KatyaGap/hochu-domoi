import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAdvertsThunk } from '../redux/actions/adverts';
import Filters from './Filters';
import PostList from './PostList';

function Catalog() {
  const dispatch = useDispatch();
  const { adverts } = useSelector((state) => state);
  const [filteredPosts, setFilteredPosts] = React.useState([...adverts]);
  console.log('adverts', adverts);
  console.log('filtered', filteredPosts);
  useEffect(() => {
    dispatch(getAdvertsThunk());
  }, []);
  return (
    <div className="cont">
      <div>
        <Filters adverts={adverts} setFilteredPosts={setFilteredPosts} />
      </div>
      <div>
        <PostList adverts={adverts} />
      </div>
    </div>
  );
}

export default Catalog;
