import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Paper, IconButton, Input, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMap from './CardMap';
import { getAdvertsThunk, getFilteredThunk, getParamsThunk } from '../../redux/actions/adverts';

function MapSmall({ pet }) {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [go, setGo] = useState(false);
  const myCollection = useRef([]);
  const myMap = useRef(null);
  const geoObjects = useRef([]);
  const clusterer = useRef(null);
  console.log('location', location);
  const placemarks = [];
  const { ymaps } = window;
  const dispatch = useDispatch();
  const { params, filtered, adverts } = useSelector((state) => state);
  const { sizes, types, pets, colors, breeds, statuses } = params;
  console.log('types', types);
  // function getType() {
  //   if (`/map${location.pathname}`.includes('found')) return 1;
  //   return 2;
  // }
  // const [filter, setFilter] = useState({ type_id: getType() });
  // useEffect(() => {
  //   dispatch(getParamsThunk());
  //   dispatch(getAdvertsThunk());
  //   dispatch(getFilteredThunk(filter));
  //   setGo((prev) => !prev);
  // }, [filter]);
  const [flag, setFlag] = useState(false);
  // if (filtered.length !== 0 && !flag) {
  //   setFlag(true);
  // }
  console.log('filtered1', filtered);
  console.log('adverts', adverts);
  // const handleChange = useCallback((e) => {
  //   setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // });
  // console.log('filter', filter);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(getFilteredThunk(filter));
  //   console.log('filtered!!', filtered);
  //   setPosts(filtered);
  // };
  // const myCollection = new ymaps.GeoObjectCollection();
  // const handlerLabel = () => {
  //   myCollection.add(myPlacemark);
  // };
  function init() {
    myMap.current = new ymaps.Map(
      'map',
      {
        center: [55.76, 37.64],
        zoom: 0,
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
    myCollection.current = new ymaps.GeoObjectCollection();
    myCollection.current.add(new ymaps.Placemark(
      [+pet.address_lattitude, +pet.address_longitude],
      {
        balloonContentHeader: pet.text,
        balloonContentBody: `<img src=${pet.images[0]} height="150" width="200">`,
      },
      {
        iconLayout: 'default#image',
        // iconImageHref: 'lable2.png',
        iconImageSize: [35, 35],
      },
    ));
    myMap.current?.geoObjects.add(myCollection.current);
    myMap.current?.setBounds(myMap.current.geoObjects.getBounds(), {
      checkZoomRange: true,
      zoomMargin: 35,
    });
  }
  ymaps?.ready(init);
  return (
    <div className="map-container">
      <div id="map" />
    </div>
  );
}
export default MapSmall;
