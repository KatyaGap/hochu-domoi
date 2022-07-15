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
import FilterChip from './elements/FilterChip';

function Maps() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [go, setGo] = useState(false);
  const myCollection = useRef([]);
  const myMap = useRef(null);
  const geoObjects = useRef([]);
  const clusterer = useRef(null);

  const placemarks = [];
  const { ymaps } = window;
  const dispatch = useDispatch();
  const { params, filtered, adverts } = useSelector((state) => state);
  const { sizes, types, pets, colors, breeds, statuses } = params;
  function getType() {
    if (`/map${location.pathname}`.includes('found')) return 1;
    return 2;
  }
  const [filter, setFilter] = useState({ type_id: getType() });
  useEffect(() => {
    if (filtered.length) {
      dispatch(getParamsThunk());
      dispatch(getAdvertsThunk());
      dispatch(getFilteredThunk(filter));
      setGo((prev) => !prev);
    } else {
      dispatch(getParamsThunk());
      dispatch(getFilteredThunk([]));
    }
    console.log('filtered: ', filtered);
  }, [filter]);

  const [flag, setFlag] = useState(false);
  // if (filtered.length !== 0 && !flag) {
  //   setFlag(true);
  // }

  const handleSetFilter = useCallback((name, value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  });
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
    if (filtered.length) {
      for (let i = 0; i < filtered.length; i += 1) {
        myCollection.current.add(new ymaps.Placemark(

          [+filtered[i].address_lattitude, +filtered[i].address_longitude],

          {

            balloonContentHeader: filtered[i].text,

            balloonContentBody: `<img src=${filtered[i].photo_url} height="150" width="200"><br/><a href="/pet/${filtered[i].id}">подробнее</a>`,
          },

          {
            iconLayout: 'default#image',
            iconImageHref: 'lable2.png',
            iconImageSize: [35, 35],
          },
        ));
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      `<div>Ничего не найдено</div>`;
    }

    myMap.current?.geoObjects.add(myCollection.current);
    myMap.current?.setBounds(myMap.current.geoObjects.getBounds(), {
      checkZoomRange: true,
      zoomMargin: 35,
    });
  }

  useEffect(() => {
    if (filtered.length || adverts.length) {
      ymaps?.ready(init);
    }
    setFlag((prev) => !prev);
    return () => {
      myMap?.current?.destroy();
    };
  }, [filtered.length, filter, location.pathname]);

  const setTypeAndPan = (latt, long) => {
    // console.log('latt, long', [+latt, +long]);
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

        {(filtered.length > 0 || adverts.length > 0) && (
        <Paper className="map-posts-overlay" elevation={8}>

          <Stack direction="row" className="filterstack">

            <Stack direction="row" spacing={2} className="filters-chips">
              <FilterChip
                filterName="Вид питомца"
                name="pet_id"
                options={pets}
                handleSetFilter={handleSetFilter}
              />

              {filter.pet_id === 1 && (
              <FilterChip
                filterName="Порода"
                name="breed_id"
                options={breeds}
                handleSetFilter={handleSetFilter}
              />
              )}

              <FilterChip
                filterName="Цвет"
                name="color_id"
                options={colors}
                handleSetFilter={handleSetFilter}
              />

              <FilterChip
                filterName="Размер"
                name="size_id"
                options={sizes}
                handleSetFilter={handleSetFilter}
              />

              {filter.type_id === 1 && (
              <FilterChip
                filterName="Статус"
                name="status_id"
                options={statuses}
                handleSetFilter={handleSetFilter}
              />
              )}
            </Stack>

          </Stack>

          {filtered.map((post, i) => <CardMap setTypeAndPan={setTypeAndPan} key={i + 1} post={post} />)}
        </Paper>
        )}
      </div>

      <div className="old-filters">
        {/* <form>
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
        </form> */}
      </div>
    </>
  );
}

export default Maps;
