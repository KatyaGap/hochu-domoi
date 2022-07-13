import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
// import { addressСoordinates } from './AddLabel';
// import { addressСoordinates } from './AddLabel';

export default function MapAddress({ addressСoordinates, save, setCoord, inputs, setInputs, changeLable, setCangeLable, inputCoord, setInputCoord }) {
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
      <div className="newpost-map-address">
        <TextField
          id="suggest"
          type="text"
          value={inputs.adress}
          onChange={inputHandler}
          label="Адрес"
          name="adress"
          placeholder="Введите адрес"
          variant="outlined"
        />

        <Button className="newpost-map-address-button" variant="outlined" onClick={addressСoordinates} id="button" type="button">Поиск</Button>
        {/* <Button variant="outlined" onClick={(e) => save(e.preventDefault())} id="button" type="submit">Сохранить метку</Button> */}
      </div>
    </form>
  );
}
