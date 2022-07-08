import { Button, ButtonGroup, Typography } from '@mui/material';
import React from 'react';
import '../App.scss';
import Carousel from './Carousel';
import SmallCard from './SmallCard';

function Main() {
  return (
    <div className="container">
      <div className="content">

        <ButtonGroup className="main-buttons-group" size="large" variant="contained" aria-label="outlined primary button group">
          <Button>Я потерял</Button>
          <Button>Я нашёл</Button>
        </ButtonGroup>

        <div className="main-last-posts main-last-posts-lost">
          <div className="main-last-posts-wrapper">
            <Typography variant="h4" gutterBottom component="div">
              Потерялись недавно
            </Typography>

            <Carousel id={1} imgArray={new Array(12).fill('druzhok.jpg')} />

            {/* <div className="main-last-posts main-last-posts-found">
            123
          </div> */}
          </div>
        </div>

        <div className="main-last-posts main-last-posts-found">
          <div className="main-last-posts-wrapper">
            <Typography variant="h4" gutterBottom component="div">
              Ищут хозяев
            </Typography>
            <Carousel id={2} imgArray={new Array(12).fill('druzhok.jpg')} />
          </div>
        </div>

      </div>
      <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js" />
    </div>
  );
}

export default Main;
