import { Button } from '@mui/material';
import useId from '@mui/material/utils/useId';
import React, { useRef, useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

export default function Map({ deleteLable, addressСoordinates, save, coord, setCoord, inputs, setInputs, changeLable, setCangeLable, inputCoord, setInputCoord }) {
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
        {/* <div><input type="text" id="suggest" value={inputs.adress} onChange={inputHandler} name="adress" placeholder="Введите адрес" style={{ width: "400px", height: "40px" }} /></div> */}
        <div id="adr">
          <button type="button" onClick={deleteLable}>очистить</button>
          <Button variant="outlined" onClick={addressСoordinates} id="button" type="button">Добавить метку на карту</Button>
          {/* <Button variant="outlined" onClick={(e) => save(e.preventDefault())} id="button" type="submit">Сохранить метку</Button> */}
        </div>

      </div>
    </form>
  );
}
