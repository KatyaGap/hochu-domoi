import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Maps() {
  const [arr, setArr] = useState([]);
  const maaap = useRef();
  const location = useLocation();
  // console.log(location);
  // maaap(maaap.current);
  useEffect(() => {
    axios(`/map${location.pathname}`)
      .then((res) => {
        // console.log('res', res.data.map((el) => ([el.address_lattitude, el.address_longitude])));
        setArr(res.data);
      })
      .catch((err) => console.log(err));
    return () => {
      console.log('unmount');
      setArr([]);
    };
  }, [location]);

  console.log('--->', arr);

  const { ymaps } = window;
  let myMap;
  let myGeoObject;
  let placemark;
  const geoObjects = [];
  let clusterer;

  function init() {
    myMap = new ymaps.Map(
      'map',
      {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl'],
        behaviors: ['drag'],
      },
      {
        searchControlProvider: 'yandex#search',
      },

    );

    for (let i = 0; i < arr.length; i += 1) {
      geoObjects[i] = new ymaps.Placemark(

        [arr[i].address_lattitude, arr[i].address_longitude],
        // console.log('obj', [arr[i].address_lattitude, arr[i].address_longitude]),
        {
          iconContent: arr[i].text,
          hintContent: arr[i].text,
          balloonContent: arr[i].text,
        },

        {
          // iconLayout: 'default#image',
          preset: "islands#redStretchyIcon",
          // iconColor: '#0095b6',
        },
      );
    }

    clusterer = new ymaps.Clusterer({
      // clusterIcons: [
      //   {
      //     href: 'img/dogs.webp',
      //     size: [100, 100],
      //     offset: [-50, -50],
      //   },
      // ],
      clusterIconContentLayout: null,
    });

    myMap.geoObjects.add(clusterer);
    clusterer.add(geoObjects);

    myMap.geoObjects
      .add(myGeoObject);
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
