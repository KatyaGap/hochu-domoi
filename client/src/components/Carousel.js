import React from 'react';
import { ArrowDropDownCircle } from '@mui/icons-material';
import SmallCard from './SmallCard';

function Carousel({ imgArray, id }) {
  return (

    <div id={`carousel-${id}`} data-interval={false} className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target={`#carousel-${id}`} data-slide-to="0" className="active" />
        <li data-target={`#carousel-${id}`} data-slide-to="1" />
        <li data-target={`#carousel-${id}`} data-slide-to="2" />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          {imgArray.map((img, index) => {
            if (index < 4) {
              return <SmallCard key={index} imgUrl={imgArray[index]} />;
            }
            return null;
          })}
        </div>
        <div className="carousel-item">
          {imgArray.map((img, index) => {
            if (index >= 4 && index < 8) {
              return <SmallCard key={index} imgUrl={imgArray[index]} />;
            }
            return null;
          })}
        </div>
        <div className="carousel-item">
          {imgArray.map((img, index) => {
            if (index >= 8 && index <= 12) {
              return <SmallCard key={index} imgUrl={imgArray[index]} />;
            }
            return null;
          })}
        </div>
      </div>
      <a className="carousel-control-prev" href={`#carousel-${id}`} role="button" data-slide="prev">
        <ArrowDropDownCircle sx={{ color: "#2776d2", width: "48px", height: "48px", transform: "rotate(90deg)" }} aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href={`#carousel-${id}`} role="button" data-slide="next">
        <ArrowDropDownCircle sx={{ color: "#2776d2", width: "48px", height: "48px", transform: "rotate(-90deg)" }} aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
