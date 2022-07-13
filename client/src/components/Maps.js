import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Paper } from '@mui/material';
import CardMap from './elements/CardMap';

function Maps() {
  console.log('MAP');
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { likes } = useSelector((state) => state);
  
  useEffect(() => {
    axios(`/map${location.pathname}`)
      .then((res) => {
        // console.log('res', res.data.map((el) => ([el.address_lattitude, el.address_longitude])));
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
    return () => {
      console.log('unmount');
      setPosts([]);
    };
  }, [location]);

  const { ymaps } = window;
  let myMap;
  const geoObjects = [];
  let clusterer;

  function init() {
    // geolocation = ymaps.geolocation,
    myMap = new ymaps.Map(
      'map',
      {
        center: [55.76, 37.64],
        zoom: 10,
        controls: [
          'searchControl',
          'typeSelector',
          'fullscreenControl',
          'geolocationControl',
        ],
        behaviors: ['drag'],
      },
      {
        searchControlProvider: 'yandex#search',
      }
    );
    myMap.controls.add('zoomControl', {
      float: 'none',
      position: {
        right: 20,
        top: 100,
      },
    });

    for (let i = 0; i < posts.length; i += 1) {
      geoObjects[i] = new ymaps.Placemark(
        [posts[i].address_lattitude, posts[i].address_longitude],
        // console.log('obj', [arr[i].address_lattitude, arr[i].address_longitude]),
        {
          // iconContent: arr[i].text,
          balloonContentHeader: posts[i].text,
          // balloonContentBody: arr[i].text,
          balloonContentBody: `<img src=${posts[i].photo_url} height="150" width="200">`,
        },

        {
          iconLayout: 'default#image',
          iconImageHref: 'lable2.png',
          iconImageSize: [35, 35],
        }
      );
    }

    clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: 'lable4.png',
          size: [60, 60],
          offset: [-50, -50],
        },
      ],
      clusterIconContentLayout: null,
    });

    myMap?.geoObjects.add(clusterer);
    clusterer?.add(geoObjects);

    // myMap.geoObjects
    //   .add(placemark);
    // .add(geoObjects);
  }

  ymaps?.ready(init);

  return (
    <div className="map-container">
      {posts.length > 0 && <div id="map" />}
      {/* <div id="map" /> */}
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
