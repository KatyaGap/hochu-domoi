import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { yandexMap } from '../redux/actions/lost';
import Map from './trash/Map';

function AddLabel() {
  console.log('AddLabel');
  const { ymaps } = window;
  const dispatch = useDispatch();
  const [coord, setCoord] = useState({});
  const [inputs, setInputs] = useState({});
  const [inputCoord, setInputCoord] = useState('');
  const [changeLable, setCangeLable] = useState({});

  const myMap = useRef(null);

  let myPlacemark;
  let myGeocoder;

  const bek = async (coor) => {
    if (Object.keys(coor).length > 1) {
      dispatch(
        yandexMap({
          address_lattitude: coor?.coordinates[0],
          address_longitude: coor?.coordinates[1],
          address_string: coor?.adress,
        }),
      );
    }
  };

  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...',
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'lable1.png',
      iconImageSize: [35, 35],
    });
  }
  const addressСoordinates = () => {
    myGeocoder = ymaps.geocode(inputCoord.adress);
    myGeocoder.then((res) => {
      setCoord((prev) => ({ ...prev, coordinates: ((res.geoObjects.get(0).geometry.getCoordinates())), adress: inputCoord.adress }));
      const coords = res.geoObjects.get(0).geometry.getCoordinates();
      myMap.current.geoObjects.add(new ymaps.Placemark(coords, {
        iconCaption: 'поиск...',
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'lable2.png',
        iconImageSize: [35, 35],
      }));
      console.log(myMap.current);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const save = () => {
    bek(coord);
  };

  function init() {
    myMap.current = (new ymaps.Map('map2', {

      center: [55.76, 37.64],
      zoom: 10,
      controls: ['searchControl', 'typeSelector', 'fullscreenControl', 'geolocationControl'],
      behaviors: ['drag', 'multiTouch'],
    }, {
      searchControlProvider: 'yandex#search',
    }));

    myMap.current.controls.add('zoomControl', {
      float: 'none',
      position: {
        right: 20,
        top: 100,
      },
    });

    function getAddress(adress) {
      ymaps.geocode(adress).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties
          .set({
            // Формируем строку с данными об объекте.
            iconCaption: [
              // Название населенного пункта или вышестоящее административно-территориальное образование.
              firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
              // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            ].filter(Boolean).join(', '),
            // В качестве контента балуна задаем строку с адресом объекта.
            balloonContent: setCoord((prev) => ({ ...prev, adress: firstGeoObject.getAddressLine() })),
          });
      });
    }

    myMap.current.events.add('click', (e) => {
      const coords = e.get('coords');
      setCoord({ coordinates: e.get('coords') });
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      } else {
      // Если нет – создаем.

        myPlacemark = createPlacemark(coords);

        myMap.current.geoObjects.add(myPlacemark);

        // Слушаем событие окончания перетаскивания на метке.
      }
      getAddress(coords);
    });
  }

  useEffect(() => {
    ymaps.ready(init);
  }, []);

  return (
    <div>
      <div id="map2" style={{ width: "600px", height: "400px" }} />

      <Map save={save} setCoord={setCoord} inputs={inputs} setInputs={setInputs} inputCoord={inputCoord} setInputCoord={setInputCoord} changeLable={changeLable} setCangeLable={setCangeLable} addressСoordinates={addressСoordinates} />
      {/* <Maps inputs={inputs} setInputs={setInputs} inputCoord={inputCoord} setInputCoord={setInputCoord} changeLable={changeLable} setCangeLable={setCangeLable} addressСoordinates={addressСoordinates} /> */}
    </div>
  );
}

export default AddLabel;
