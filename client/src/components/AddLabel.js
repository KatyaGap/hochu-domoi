import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yandexMap } from '../redux/actions/lost';
import Maps from './Maps';

function AddLabel() {
  const { ymaps } = window;
  const dispatch = useDispatch();
  const [adress, setAdress] = useState();
  const [coord, setCoord] = useState({});
  const [all, setAll] = useState('');
  const [inputs, setInputs] = useState({});
  const [inputCoord, setInputCoord] = useState({});
  const [changeLable, setCangeLable] = useState({});
  // const { lost } = useSelector((state) => state);
  // const [inputs, setInputs] = useState();
  // console.log('coord', coord, 'j,', Object.keys(coord).length);
  // console.log('adress,', adress);

  const bek = async (coor, inputCoor) => {
    // setAll({ coord, adress });
    // console.log('+++>', inputCoor.coordinates);
    // console.log('--->', coor, Object.keys(coor).length);
    if (Object.keys(coor).length > 1 || Object.keys(inputCoor).length > 1) {
      dispatch(
        yandexMap({
          address_lattitude: (Array.isArray(coor?.coordinates) ?? coor?.coordinates[0]) || (Array.isArray(inputCoor?.coordinates) ?? inputCoor?.coordinates[0]),
          address_longitude: (Array.isArray(coor?.coordinates) ?? coor?.coordinates[1]) || (Array.isArray(inputCoor?.coordinates) ?? inputCoor?.coordinates[1]),
          address_string: coor?.adress || inputCoor?.adress,
          // pet: inputs.pet,
          // color_name: inputs.color_name,
          // text: inputs.text,
          // user_id: inputs.id,

        }),
      );
    }
  };
  bek(coord, inputCoord);
  // console.log('coord', coord, Object.keys(coord).length);
  // console.log('inputCoord', inputCoord, Object.keys(inputCoord).length);
  // bek(coord, inputCoord);

  let myMap;
  let myPlacemark;
  let myGeocoder;
  let myCollection;
  let mySearchControl;
  let mySearchResults;
  let suggestView;

  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...',
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true,
    });
  }

  const addressСoordinates = () => {
    myGeocoder = ymaps.geocode(inputCoord.adress);
    myGeocoder.then((res) => {
      setInputCoord((prev) => ({ ...prev, coordinates: ((res.geoObjects.get(0).geometry.getCoordinates())) }));
      // console.log('dddd', ((res.geoObjects.get(0).geometry.getCoordinates())));
      // setAll((res.geoObjects.get(0).geometry.getCoordinates()));
      // console.log('inputCoord', inputCoord, 'j,', Object.keys(coord).length);
      // myPlacemark = createPlacemark(inputCoord);
      // myMap.geoObjects.add(myPlacemark);
    })
      .catch((err) => {
        console.log('Ошибка');
      });
    bek(coord, inputCoord);
  };
  function init() {
    // suggestView = new ymaps.SuggestView('suggest'),
    // map,
    // placemark;

    myMap = new ymaps.Map('map', {

      center: [55.76, 37.64],
      zoom: 10,
    }, {
      searchControlProvider: 'yandex#search',
    });

    // Создание метки.
    // function createPlacemark(coords) {
    //   return new ymaps.Placemark(coords, {
    //     iconCaption: 'поиск...',
    //   }, {
    //     preset: 'islands#violetDotIconWithCaption',
    //     draggable: true,
    //   });
    // }
    // Создаем экземпляр класса ymaps.control.SearchControl
    mySearchControl = new ymaps.control.SearchControl({
      options: {
        noPlacemark: true,
      },
    });
    // Результаты поиска будем помещать в коллекцию.
    mySearchResults = new ymaps.GeoObjectCollection(null, {
      hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]'),
    });
    myMap.controls.add(mySearchControl);
    myMap.geoObjects.add(mySearchResults);
    // При клике по найденному объекту метка становится красной.
    mySearchResults.events.add('click', (e) => {
      e.get('target').options.set('preset', 'islands#redIcon');
    });
    // Выбранный результат помещаем в коллекцию.
    mySearchControl.events.add('resultselect', (e) => {
      const index = e.get('index');
      mySearchControl.getResult(index).then((res) => {
        mySearchResults.add(res);
      });
    }).add('submit', () => {
      mySearchResults.removeAll();
    });

    function getAddress(coords) {
      myPlacemark.properties.set('iconCaption', 'поиск...');
      ymaps.geocode(coords).then((res) => {
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
    myMap.events.add('click', (e) => {
      const coords = e.get('coords');
      setCoord((prev) => ({ ...prev, coordinates: e.get('coords') }));
      // bek(coord, inputCoord);
      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      } else {
      // Если нет – создаем.

        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
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
      <Maps inputs={inputs} setInputs={setInputs} inputCoord={inputCoord} setInputCoord={setInputCoord} changeLable={changeLable} setCangeLable={setCangeLable} addressСoordinates={addressСoordinates} />
    </>
  );
}

export default AddLabel;
