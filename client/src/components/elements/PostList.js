import { Stack } from '@mui/material';
import React, { useState } from 'react';
import CardWide from './CardWide';

function PostList({ adverts, posts = [] }) {
  const [isEmpty, setIsEmpty] = useState(false);
  if (posts.length !== 0 && !isEmpty) {
    setIsEmpty(true);
  }

  const renderList = (array) => array.map((post, i) => (
    <CardWide key={post?.id} post={post} />
  ));

  return (
    <Stack className="my-posts-container postlist" direction="column" spacing={2}>
      {!!posts.length && renderList(posts)}
      {!posts.length && isEmpty && <div>По данным критериям посты не найдены</div>}
      {!posts.length && !isEmpty && renderList(adverts)}
    </Stack>
  );
}
export default PostList;
