// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   YMaps,
//   Map,
//   Placemark,
//   RouteButton,
//   SearchControl,
//   GeolocationControl,
//   GeoObject,
//   Circle,
// } from 'react-yandex-maps';
// import axios from 'axios';

// // потеряшки/найденыши

// function MapYandex({ filter }) {
//   const [arr, setArr] = useState([]);
//   const [newArr, setNewArr] = useState([]);
//   const [arrCoordinates, setArrCoordinates] = useState();

//   // const dopCoord = (e) => {
//   //   setArrCoordinates(e.get('coords'));
//   // };

//   useEffect(() => {
//     axios(`http://localhost:3000/map/${filter}`)
//       .then((res) => {
//         console.log('res', res.data);
//         setArr(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [filter]);

//   console.log('--->', arr);

//   return (
//     <YMaps
//       className="map"
//       query={{
//         apikey: 'ee7ed649-e248-4853-96e6-be2aa79824a9',
//         ns: 'use-load-option',
//         load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
//       }}
//     >
//       <Map className="map" defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
//         <GeolocationControl
//           options={{
//             float: 'left',
//           }}
//         />
//         {arr
//             && arr.map((el, ind) => (
//               <Placemark
//                 geometry={[el.address_lattitude, el.address_longitude]}
//                 properties={{
//                   balloonContentHeader: 'что-то там из масива',
//                   balloonContentBody: 'описание чего-то там из массива',
//                 }}
//                 key={ind + 1}
//                 options={{
//                   iconLayout: 'default#image',
//                   iconImageHref:
//                      'https://avatars.mds.yandex.net/i?id=66193d0fc93ff6d89b1483bb731930d3-5332098-images-thumbs&n=13',
//                 }}
//               />
//             ))}
//         <RouteButton options={{ float: 'right' }} />
//         <SearchControl
//           options={{
//             float: 'left',
//             provider: 'yandex#search',
//           }}
//         />
//       </Map>
//     </YMaps>
//   );
// }

// export default MapYandex;
