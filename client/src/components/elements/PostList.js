import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAdvertsThunk } from '../../redux/actions/adverts';

function PostList({ adverts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleDelete = useCallback((id) => {
  //   dispatch(deletePostThunk(id));
  // }, []);
  return (
    <ImageList sx={{ width: 600 }} cols={4} gap={8}>
      {adverts?.map((item, ind) => (
        <ImageListItem key={ind + 1} onClick={() => navigate(`/pet/${item.id}`)}>
          <img
            src={`${item.photo_url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.photo_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />

          <ImageListItemBar
            title={`${item.text?.slice(0, 25)}...`}
            // subtitle={<span>{item.text}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
export default PostList;
