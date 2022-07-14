import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Paper } from '@mui/material';
import CardMap from './elements/CardMap';

function Maps() {
  const [posts, setPosts] = useState([]);
  const [go, setGo] = useState(false);
  const location = useLocation();
  const myMap = useRef(null);
  const geoObjects = useRef([]);
  const clusterer = useRef(null);

  const { ymaps } = window;

  function init() {
    myMap.current = new ymaps.Map(
      'map',
      {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['typeSelector', 'fullscreenControl', 'geolocationControl'],
        behaviors: ['drag', 'multiTouch', 'scrollZoom'],
      },
      {
        searchControlProvider: 'yandex#search',
      },
    );
    myMap.current.controls.add('zoomControl', {
      float: 'none',
      position: {
        right: 20,
        top: 100,
      },
    });

    for (let i = 0; i < posts.length; i += 1) {
      geoObjects.current[i] = new ymaps.Placemark(
        [posts[i].address_lattitude, posts[i].address_longitude],

        {
          balloonContentHeader: posts[i].text,

          balloonContentBody: `<img src=${posts[i].photo_url} height="150" width="200">`,
        },

        {
          iconLayout: 'default#image',
          iconImageHref: 'lable2.png',
          iconImageSize: [35, 35],
        },
      );
    }

    clusterer.current = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: 'lable4.png',
          size: [60, 60],
          offset: [-50, -50],
        },
      ],
      clusterIconContentLayout: null,
    });

    myMap.current?.geoObjects.add(clusterer?.current);
    clusterer?.current?.add(geoObjects?.current);
  }

  useEffect(() => {
    if (posts.length) {
      ymaps?.ready(init);
    }
    return () => {
      myMap?.current?.destroy();
    };
  }, [go]);

  useEffect(() => {
    axios(`/map${location.pathname}`)
      .then((res) => {
        setGo((prev) => !prev);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [location]);

  return (
    <div className="map-container">
      <div id="map" />

      {posts.length > 0 && (
        <Paper className="map-posts-overlay" elevation={8}>
          {posts.map((post, ind) => (
            <CardMap post={post} key={ind + 1} />
          ))}
        </Paper>
      )}
    </div>
  );
}

export default Maps;
