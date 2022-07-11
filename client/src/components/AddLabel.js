import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yandexMap } from '../redux/actions/lost';
import Map from './Map';

function AddLabel() {
  const { ymaps } = window;
  const dispatch = useDispatch();
  const [coord, setCoord] = useState({});
  const [inputs, setInputs] = useState({});
  const [inputCoord, setInputCoord] = useState('');
  const [changeLable, setCangeLable] = useState({});
  // const { lost } = useSelector((state) => state);
  // const [inputs, setInputs] = useState();
  let myMap;
  let myPlacemark;
  let myGeocoder;
  let getCoordinates;
  let mySearchControl;
  let myPlacemark2;
  // console.log('coord', coord);
  // console.log('inputs', inputs);
  // console.log('inputCoord', inputCoord);
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
      preset: 'islands#violetDotIconWithCaption',
      draggable: true,
    });
  }
  const addressСoordinates = () => {
    console.log('inputCoord.adress');
    // ymaps.geocode(inputCoord.adress).then((res) => {
    //   const coo = res.geoObjects.get(0).geometry.getCoordinates();
    //   setCoord((prev) => ({ ...prev, coordinates: (coo), adress: inputCoord.adress }));
    //   myPlacemark2 = new ymaps.Placemark(coo, null, {
    //     preset: 'islands#blueDotIcon',
    //   });
    //   myMap.geoObjects.add(myPlacemark2);
    // }).catch((err) => {
    //   console.log('Ошибка');
    ymaps.ready(async () => {
      const res = await ymaps.geocode(inputCoord.adress);
      console.log('res', res);
      const coo = res.geoObjects.get(0).geometry.getCoordinates();
      console.log('coo', res);
      setCoord((prev) => ({ ...prev, coordinates: (coo), adress: inputCoord.adress }));
      const nextPlacemark = new ymaps.Placemark(coo, {
        iconContent: 'address',
      }, {
        preset: 'islands#greenStretchyIcon',
      });
      myMap.geoObjects.add(nextPlacemark);
    });
    // myGeocoder = ymaps.geocode(inputCoord.adress);
    // myGeocoder.then((res) => {
    //   setCoord((prev) => ({ ...prev, coordinates: ((res.geoObjects.get(0).geometry.getCoordinates())), adress: inputCoord.adress }));
    //   getCoordinates = (res.geoObjects.get(0).geometry.getCoordinates());
    //   myPlacemark2 = createPlacemark(getCoordinates);
    //   // myMap.geoObjects
    //   //   .add(myPlacemark2);
    //   console.log('getCoordinates', myPlacemark2);
    // })
    //   .catch((err) => {
    //     console.log('Ошибка');
    //   });
  };

  const save = () => {
    bek(coord);
  };

  /// ///////////
  /// //////////         init
  function init() {
    myMap = new ymaps.Map('map', {

      center: [55.76, 37.64],
      zoom: 10,
      controls: ['searchControl', 'typeSelector', 'fullscreenControl', 'geolocationControl'],
      behaviors: ['drag'],
    }, {
      searchControlProvider: 'yandex#search',
    });
    myMap.controls.add('zoomControl', {
      float: 'none',
      position: {
        right: 20,
        top: 100,
      },
    });
    mySearchControl = new ymaps.control.SearchControl({
      options: {
        noPlacemark: true,
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
            // balloonContent: setCoord(coord.adress = firstGeoObject.getAddressLine()),
          });
      });
    }
    // addressСoordinates = function saveLable () {
    //   console.log('inputCoord.adress');
    //   myGeocoder = ymaps.geocode(inputCoord.adress);
    //   myGeocoder.then((res) => {
    //     setCoord((prev) => ({ ...prev, coordinates: ((res.geoObjects.get(0).geometry.getCoordinates())), adress: inputCoord.adress }));
    //     getCoordinates = (res.geoObjects.get(0).geometry.getCoordinates());
    //     console.log('getCoordinates', getCoordinates);
    //   })
    //     .catch((err) => {
    //       console.log('Ошибка');
    //     });
    //     myPieChart = createPlacemark(getCoordinates);
    // };

    myMap.events.add('click', (e) => {
      // Если метка уже создана – просто передвигаем ее.
      const coords = e.get('coords');
      setCoord({ coordinates: e.get('coords') });
      if (myPlacemark) {
        // setCoord((prev) => ({ ...prev, coordinates: e.get('coords') }));
        myPlacemark.geometry.setCoordinates(coords);
      } else {
      // Если нет – создаем.

        myPlacemark = createPlacemark(coords);

        myMap.geoObjects
          .add(myPlacemark);

        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', () => {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });
  }
  ymaps.ready(init);

  return (
    <>
      <div id="map" style={{ width: "600px", height: "400px" }} />
      <Map save={save} setCoord={setCoord} inputs={inputs} setInputs={setInputs} inputCoord={inputCoord} setInputCoord={setInputCoord} changeLable={changeLable} setCangeLable={setCangeLable} addressСoordinates={addressСoordinates} />
    </>
  );
}

export default AddLabel;
