import { Button } from '@mui/material';
import React, { useState } from 'react';
// import { addressСoordinates } from './AddLabel';
// import { addressСoordinates } from './AddLabel';

export default function Map({ addressСoordinates, save, setCoord, inputs, setInputs, changeLable, setCangeLable, inputCoord, setInputCoord }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const inputHandler = (e) => {
    setInputCoord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // setCoord((prev) => ({
    //   ...prev,
    //   [e.target.name]: e.target.value,
    // }));
  };
  const changeLableHandler = (e) => {
    setCangeLable({ [e.target.name]: e.target.value });
  };
  // console.log('changeLable', changeLable);
  return (
    <form onSubmit={handleSubmit}>
      <div>

        <div><input type="text" id="suggest" value={inputs.adress} onChange={inputHandler} name="adress" placeholder="Введите адрес" style={{ width: "400px", height: "40px" }} /></div>
        <div id="adr">

          <Button variant="outlined" onClick={addressСoordinates} id="button" type="button">Добавить метку на карту</Button>
          <Button variant="outlined" onClick={(e) => save(e.preventDefault())} id="button" type="submit">Сохранить метку</Button>
        </div>

      </div>
    </form>
  );
}
