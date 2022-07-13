import { Button } from '@mui/material';
import useId from '@mui/material/utils/useId';
import React, { useRef, useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

export default function Map({ deleteLable, addressСoordinates, coord, inputCoord, setInputCoord }) {
  const id = useId();

  const suggestionsRef = useRef < AddressSuggestions > (null);
  console.log('inputCoord', inputCoord);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {!coord.adress
        ? (
          <AddressSuggestions
            token="7fa23e2d6ccf152e411f23cc5401b7984e61ec5c"
            value={inputCoord}
            onChange={setInputCoord}
            uid={id}
          />
        ) : <p>{coord.adress}</p>}
      <div>
        <div style={{ marginTop: "20px" }} />

        <div id="adr">

          <Button variant="outlined" onClick={deleteLable} id="button1" type="button">Очистить</Button>
          <Button variant="outlined" onClick={addressСoordinates} id="button" type="button">Добавить метку на карту</Button>

        </div>

      </div>
    </form>
  );
}
