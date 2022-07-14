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
import CardMap from './elements/CardMap';

import { getAdvertsThunk, getFilteredThunk, getParamsThunk } from '../redux/actions/adverts';

function Maps() {
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
  function getType() {
    if (`/map${location.pathname}`.includes('found')) return 1;
    return 2;
  }
  const [filter, setFilter] = useState({ type_id: getType() });
  useEffect(() => {
    dispatch(getParamsThunk());
    dispatch(getAdvertsThunk());
    dispatch(getFilteredThunk(filter));
    setGo((prev) => !prev);
  }, [filter]);

  const [flag, setFlag] = useState(false);
  // if (filtered.length !== 0 && !flag) {
  //   setFlag(true);
  // }
  console.log('filtered1', filtered);
  console.log('adverts', adverts);

  const handleChange = useCallback((e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  });
  console.log('filter', filter);
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

    myCollection.current = new ymaps.GeoObjectCollection();

    for (let i = 0; i < filtered.length; i += 1) {
      myCollection.current.add(new ymaps.Placemark(

        [+filtered[i].address_lattitude, +filtered[i].address_longitude],

        {

          balloonContentHeader: filtered[i].text,

          balloonContentBody: `<img src=${filtered[i].photo_url} height="150" width="200">`,
        },

        {
          iconLayout: 'default#image',
          iconImageHref: 'lable2.png',
          iconImageSize: [35, 35],
        },
      ));
    }

    myMap.current?.geoObjects.add(myCollection.current);
    myMap.current?.setBounds(myMap.current.geoObjects.getBounds(), {
      checkZoomRange: true,
      zoomMargin: 35,
    });
  }

  useEffect(() => {
    if (filtered.length) {
      console.log('filtered.length', filtered.length);
      ymaps?.ready(init);
    }
    setFlag((prev) => !prev);
    return () => {
      myMap?.current?.destroy();
    };
  }, [filtered.length, filter, location.pathname]);

  console.log('postss', posts);

  const setTypeAndPan = (latt, long) => {
    console.log('latt, long', [+latt, +long]);
    myMap.current.panTo([+latt, +long], {
      flying: true,
      // Задержка между перемещениями.
      duration: 800,
      callback() {
        myMap.current.setZoom(15, {

        });
      },
    });

    myMap.current.setCenter([+latt, +long], 15, {
      checkZoomRange: true,
    });
  };

  return (
    <>
      <div className="map-container">

        <div id="map" />

        {filtered.length > 0 && (
        <Paper className="map-posts-overlay" elevation={8}>
          {filtered.map((post) => <CardMap setTypeAndPan={setTypeAndPan} post={post} />)}

        </Paper>
        )}
      </div>
      <div>
        <form>
          <div>
            <Typography variant="h4" component="div" gutterBottom>
              Пожалуйста, выберите данные
            </Typography>
            <Box sx={{ minWidth: 120 }}>

              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Вид животного
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="pet_id"
                    value={filter.pet_id}
                    label="Pet"
                    onChange={handleChange}
                  >
                    {pets?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.pet}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {filter.pet_id === 1 && (
              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Порода</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="breed_id"
                    value={filter.breed_id}
                    label="Breed"
                    onChange={handleChange}
                  >
                    {breeds?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.breed}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              )}

              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Цвет</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="color_id"
                    value={filter.color_id}
                    label="Color"
                    onChange={handleChange}
                  >
                    {colors?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.color_name}
                        <span
                          style={{
                            backgroundColor: `${item.hex}`,
                            width: '100px',
                            borderRadius: '20px',
                            margin: '10px',
                          }}
                        >
                          color
                        </span>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Размер</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="size_id"
                    value={filter.size_id}
                    label="Size"
                    onChange={handleChange}
                  >
                    {sizes?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {filter.type_id === 1 && (
              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="status_id"
                    value={filter.status_id}
                    label="Status"
                    onChange={handleChange}
                  >
                    {statuses?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              )}
            </Box>
          </div>
          <Button type="submit" variant="contained">
            Выбрать объявления
          </Button>
        </form>
      </div>
    </>
  );
}

export default Maps;
