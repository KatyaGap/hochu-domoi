import { Button, ButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.scss';
import Carousel from './Carousel';

function Main() {
  const navigate = useNavigate();

  const newpostLink = (type) => {
    navigate(`/chat?type=${type}&step=1`);
  };

  return (
    <div className="container">
      <div className="content">

        <ButtonGroup className="main-buttons-group" size="large" variant="contained" aria-label="outlined primary button group">
          <Button onClick={(e) => newpostLink("lost")}>Я потерял</Button>
          <Button onClick={(e) => newpostLink("found")}>Я нашёл</Button>
        </ButtonGroup>

        <div className="main-last-posts main-last-posts-lost">
          <div className="main-last-posts-wrapper">
            <div className="main-last-posts-title-wrapper">
              <Typography className="main-last-posts-title" variant="h4" gutterBottom component="div">
                Потерялись недавно
              </Typography>
              <Button variant="text">Показать всех</Button>
            </div>

            <Carousel id={1} imgArray={new Array(12).fill('druzhok.jpg')} />

            {/* <div className="main-last-posts main-last-posts-found">
            123
          </div> */}
          </div>
        </div>

        <div className="main-last-posts main-last-posts-found">
          <div className="main-last-posts-wrapper">
            <div className="main-last-posts-title-wrapper">
              <Typography className="main-last-posts-title" variant="h4" gutterBottom component="div">
                Ищут хозяев
              </Typography>
              <Button variant="text">Показать всех</Button>
            </div>
            <Carousel id={2} imgArray={new Array(12).fill('druzhok.jpg')} />
          </div>
        </div>

      </div>
      <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js" />
    </div>
  );
}

export default Main;
