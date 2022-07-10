import React from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import SmallCard from './SmallCard';

function Carousel({ posts, id }) {
  return (

    <div id={`carousel-${id}`} data-interval={false} className="carousel slide" data-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target={`#carousel-${id}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
        <button type="button" data-bs-target={`#carousel-${id}`} data-bs-slide-to="1" aria-label="Slide 2" />
        <button type="button" data-bs-target={`#carousel-${id}`} data-bs-slide-to="2" aria-label="Slide 3" />
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-flex">
            {posts.map((post, index) => {
              if (index < 4) {
                return <SmallCard key={index} post={post} />;
              }
              return null;
            })}
          </div>
        </div>

        {posts[4]?.id
          ? (
            <div className="carousel-item">
              <div className="carousel-flex">
                {posts.map((post, index) => {
                  if (index >= 4 && index < 8) {
                    return <SmallCard key={index} post={post} />;
                  }
                  return null;
                })}
              </div>
            </div>
          )
          : null}

        {posts[8]?.id
          ? (
            <div className="carousel-item">
              <div className="carousel-flex">
                {posts.map((post, index) => {
                  if (index >= 8 && index <= 12) {
                    return <SmallCard key={index} post={post} />;
                  }
                  return null;
                })}
              </div>
            </div>
          )
          : null}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="prev">
        <ArrowForwardIos sx={{ color: "#2776d2", width: "48px", height: "48px", transform: "rotate(180deg)" }} aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="next">
        <ArrowForwardIos sx={{ color: "#2776d2", width: "48px", height: "48px" }} aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
