import React, { useRef } from 'react';

function MapSmall({ pet }) {
  const myCollection = useRef([]);
  const myMap = useRef(null);
  const { ymaps } = window;

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
