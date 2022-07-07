import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  YMaps,
  Map,
  Placemark,
  RouteButton,
  SearchControl,
  GeolocationControl,
  GeoObject,
  Circle,
} from 'react-yandex-maps';
import axios from 'axios';

//потеряшки/найденыши

function MapYandex({ filter }) {
  const { lost } = useSelector((state) => state);

  useEffect(() => {
    axios('http://localhost:3000/map/lost') //изменить запрос
      .then((res) => {
				console.log('res', res.data)
				res.data
			})
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="upMap">
      <div className="cardAds">div</div>
      <YMaps
        query={{
          apikey: 'ee7ed649-e248-4853-96e6-be2aa79824a9',
          ns: 'use-load-option',
          load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
        }}
      >
        <div id="map-test" className="div">
          <Map
            className="map"
            defaultState={{
              center: [55.75, 37.57],
              zoom: 9,
              controls: ['zoomControl', 'fullscreenControl'],
            }}
          >
            <GeolocationControl
              options={{
                float: 'left',
              }}
            />
            {lost &&
              lost.map((el) => (
                <Placemark
                  geometry={[el.address_lattitude, el.address_longitude]}
                  properties={{
                    balloonContentHeader: 'что-то там из масива',
                    balloonContentBody: 'описание чего-то там из массива',
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref:
                      'https://avatars.mds.yandex.net/i?id=66193d0fc93ff6d89b1483bb731930d3-5332098-images-thumbs&n=13',
                  }}
                />
              ))}
            <RouteButton options={{ float: 'right' }} />
            <SearchControl
              options={{
                float: 'left',
                provider: 'yandex#search',
              }}
            />
          </Map>
        </div>
      </YMaps>
    </div>
  );
}
export default MapYandex;

// для добавления
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { YMaps, Map, Placemark, RouteButton, SearchControl, GeolocationControl, GeoObject, Circle } from "react-yandex-maps";
import axios from 'axios'

import { deleteLableYaMap, yandexMap } from '../redux/actions/lost';

export function YaMap() {
  const dispatch = useDispatch();
  const [coord, setCoord] = useState('');
  const [sendCoord, setSendCoord] = useState({});
  const [form, setForm] = useState('');
  const { lost } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  const [inputs, setInputs] = useState({});

  const bek = async (coor) => {
    const co = coor.join(', ');
    dispatch(
      yandexMap({
        coord: co,
        title: inputs.title,
        description: inputs.description,
        file: inputs.file,
        user_id: inputs.id,
      })
    );
  };
  console.log('---;', sendCoord);
  // console.log('input', inputs);
  const getAnyCoordinate = (e) => {
    setCoord(e.get('coords'));
    bek(e.get('coords'));
  };

  useEffect(() => {
    axios('http://localhost:3000/map/lost') //изменить
      .then((res) => {
        console.log('res.data2', res.data);
        setSendCoord(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log('====', sendCoord);
  console.log('form->', form);
  return (
    <YMaps
      query={{
        apikey: 'ee7ed649-e248-4853-96e6-be2aa79824a9',
        ns: 'use-load-option',
        load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
      }}
    >
      <Map
        onClick={getAnyCoordinate}
        className="map"
        defaultState={{
          center: [55.75, 37.57],
          zoom: 9,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
      >
        <GeolocationControl
          options={{
            float: 'left',
          }}
        />
        {lost &&
          lost.map((el) => {
            return (
              <Placemark
                onClick={(e) => delLableMap(e.id)}
                geometry={el.coordinate.split(', ')}
                properties={{
                  balloonContentHeader: el.text,
                  // balloonContentBody: `<div><button type="button">Удалить</button></div>`,
                }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref:
                    'https://avatars.mds.yandex.net/i?id=66193d0fc93ff6d89b1483bb731930d3-5332098-images-thumbs&n=13',
                }}
              />
            );
          })}
        <RouteButton options={{ float: 'right' }} />
        <SearchControl
          options={{
            float: 'left',
            provider: 'yandex#search',
          }}
        />
      </Map>
      <div className="upMap"></div>
    </YMaps>
  );
}
