import { ImageList, ImageListItem, ImageListItemBar, Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardWide from './CardWide';

function PostList({ adverts, posts = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  if (posts.length !== 0 && !flag) {
    setFlag(true);
  }

  const renderList = (array) => array.map((post, i) => (
    <CardWide key={post?.id} post={post} />
  ));

  return (
    <Stack className="my-posts-container" direction="column" spacing={2}>
      {!!posts.length && renderList(posts)}
      {!posts.length && flag && <div>По данным критериям посты не найдены</div>}
      {!posts.length && !flag && renderList(adverts)}
    </Stack>
  );
}
export default PostList;
