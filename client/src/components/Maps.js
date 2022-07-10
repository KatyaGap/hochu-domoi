import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Map from './Map';

function Maps() {
  const [arr, setArr] = useState([]);

  const location = useLocation();

  useEffect(() => {
    axios(`/map${location.pathname}`)
      .then((res) => {
        setArr(res.data);
      })
      .catch((err) => console.log(err));
    return () => {
      setArr([]);
    };
  }, [location]);

  console.log('--->', arr);

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
        controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl', 'geolocationControl'],
        behaviors: ['drag'],
      },
      {
        searchControlProvider: 'yandex#search',
      },

    );

    for (let i = 0; i < arr.length; i += 1) {
      geoObjects[i] = new ymaps.Placemark(

        [arr[i].address_lattitude, arr[i].address_longitude],

        {
          // iconContent: arr[i].text,
          hintContent: arr[i].text,
          balloonContent: arr[i].text,

        },

        {
          iconLayout: 'default#image',
          iconImageHref: 'lable2.png',
          iconImageSize: [35, 35],
        },
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

    myMap.geoObjects.add(clusterer);
    clusterer.add(geoObjects);

    // myMap.geoObjects
    //   .add(placemark);
    // .add(geoObjects);
  }

  ymaps.ready(init);

  return (
    <div>
      {arr.length > 0 && (<div id="map" style={{ width: "600px", height: "400px" }} />)}

    </div>
  );
}

export default Maps;
