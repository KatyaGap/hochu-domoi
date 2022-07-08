import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GeolocationControl, Map, Placemark, RouteButton, SearchControl, YMaps } from 'react-yandex-maps';

// потеряшки/найденыши

function Maps({ filter }) {
  // const [arr, setArr] = useState([]);
  // const [newArr, setNewArr] = useState([]);
  // const [arrCoordinates, setArrCoordinates] = useState();

  // const dopCoord = (e) => {
  //   setArrCoordinates(e.get('coords'));
  // };

  // useEffect(() => {
  //   axios(`/map/${filter}`)
  //     .then((res) => {
  //       console.log('res', res.data);
  //       setArr(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [filter]);

  // console.log('--->', arr);
  const { ymaps } = window;
  function init() {
    console.log('lll', ymaps);
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 5,
      controls: [],
    });
    return myMap;
  }
  ymaps.ready(init);

  // const handleScriptLoad = () => {
  //   const { ymaps } = window;
  //   ymaps.ready(init);
  // };
  console.log('1111');
  // const instanceMap = init();
  // console.log(instanceMap);
  return (
    <div id="map" style={{ width: "600px", height: "400px" }} />
  );
}

export default Maps;
