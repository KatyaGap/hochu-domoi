


////////////////////////////////////////////////

// <YMaps
  //   className="map"
  //   query={{
  //     apikey: 'ee7ed649-e248-4853-96e6-be2aa79824a9',
  //     ns: 'use-load-option',
  //     load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
  //   }}
  // >
  //   <Map className="map" defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
  //     <GeolocationControl
  //       options={{
  //         float: 'left',
  //       }}
  //     />
  //     {arr
  //         && arr.map((el, ind) => (
  //           <Placemark
  //             geometry={[el.address_lattitude, el.address_longitude]}
  //             properties={{
  //               balloonContentHeader: 'что-то там из масива',
  //               balloonContentBody: 'описание чего-то там из массива',
  //             }}
  //             key={ind + 1}
  //             options={{
  //               iconLayout: 'default#image',
  //               iconImageHref:
  //                  'https://avatars.mds.yandex.net/i?id=66193d0fc93ff6d89b1483bb731930d3-5332098-images-thumbs&n=13',
  //             }}
  //           />
  //         ))}
  //     <RouteButton options={{ float: 'right' }} />
  //     <SearchControl
  //       options={{
  //         float: 'left',
  //         provider: 'yandex#search',
  //       }}
  //     />
  //   </Map>
  // </YMaps>
//////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import axios from 'axios';

// function Maps({ filter }) {
//   const [arr, setArr] = useState([]);

//   useEffect(() => {
//     axios(`/map/${filter}`)
//       .then((res) => {
//         // console.log('res', res.data.map((el) => ([el.address_lattitude, el.address_longitude])));
//         setArr(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [filter]);

//   console.log('--->', arr);

//   const { ymaps } = window;
//   let map;
//   let myGeoObject;
//   let placemark;
//   const geoObjects = [];
//   let clusterer;

//   function init() {
//     map = new ymaps.Map(
//       'map',
//       {
//         center: [55.76, 37.64],
//         zoom: 10,
//         controls: ['zoomControl'],
//         behaviors: ['drag'],
//       },
//       {
//         searchControlProvider: 'yandex#search',
//       },

//     );

//     for (let i = 0; i < arr.length; i += 1) {
//       geoObjects[i] = new ymaps.Placemark(

//         [arr[i].address_lattitude, arr[i].address_longitude],
//         // console.log('obj', [arr[i].address_lattitude, arr[i].address_longitude]),
//         {
//           balloonContent: arr[i].text,
//         },

//         {
//           iconLayout: 'default#image',
//           preset: 'islands#icon',
//           iconColor: '#0095b6',
//         },
//       );
//     }

//     clusterer = new ymaps.Clusterer({
      // clusterIcons: [
      //   {
      //     href: 'img/dogs.webp',
      //     size: [100, 100],
      //     offset: [-50, -50],
      //   },
      // ],
    //   clusterIconContentLayout: null,
    // });

    // map.geoObjects.add(clusterer);
    // clusterer.add(geoObjects);

    // myMap.geoObjects
    // .add(myGeoObject)
    // .add(geoObjects);
//   }

//   ymaps.ready(init);

//   return (

//     <div id="map" style={{ width: "600px", height: "400px" }} />
//   );
// }

// export default Maps;
