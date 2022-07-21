import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Paper, Stack } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import CardMap from './elements/CardMap';

import { getAdvertsThunk, getFilteredThunk, getParamsThunk } from '../redux/actions/adverts';
import FilterChip from './elements/FilterChip';

function Maps() {
  const location = useLocation();
  const [go, setGo] = useState(false);
  const myCollection = useRef([]);
  const myMap = useRef(null);

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
  }, [filter]);

  const [flag, setFlag] = useState(false);

  const handleSetFilter = useCallback((name, value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  });

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
      <div>Ничего не найдено</div>;
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
      <div className="old-filters" />
    </>
  );
}

export default Maps;
