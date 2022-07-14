import { RestartAlt, Search } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import useId from '@mui/material/utils/useId';
import React, { useRef, useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

export default function MapAddress({ deleteLable, addressСoordinates, save, coord, setCoord, inputs, setInputs, changeLable, setCangeLable, inputCoord, setInputCoord }) {
  const id = useId();

  const suggestionsRef = useRef < AddressSuggestions > (null);
  // console.log('inputCoord', inputCoord);

  const inputHandler = (e) => {
    setInputCoord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="newpost-map-address">
        {coord.adress
          ? (
            <Typography variant="body1" component="div" className="newpost-map-address-string" gutterBottom>
              {coord.adress}
            </Typography>
          )
          : (
            <AddressSuggestions
              token="7fa23e2d6ccf152e411f23cc5401b7984e61ec5c"
              value={inputCoord}
              onChange={setInputCoord}
              uid={id}
              placeholder="Введите адрес"
              minChars="4"
              delay="400"
              inputProps={{ placeholder: 'Адрес', required: true }}
              // customInput={<TextField placeholder="Введите адрес" variant="outlined" label="Адрес" />}
            />
          )}
        {coord.adress
          ? <Button startIcon={<RestartAlt />} className="newpost-map-address-button" variant="outlined" onClick={deleteLable} type="button">Очистить</Button>
          : <Button startIcon={<Search />} className="newpost-map-address-button" variant="outlined" onClick={addressСoordinates} type="button">Поиск</Button>}

        {/* <div><input type="text" id="suggest" value={inputs.adress} onChange={inputHandler} name="adress" placeholder="Введите адрес" style={{ width: "400px", height: "40px" }} /></div> */}
        {/* <Button variant="outlined" onClick={(e) => save(e.preventDefault())} id="button" type="submit">Сохранить метку</Button> */}

        {/* <div className="newpost-map-address">
          <TextField
            id="suggest"
            type="text"
            value={inputs.adress}
            onChange={inputHandler}
            label="Адрес"
            name="adress"
            placeholder="Введите адрес"
            variant="outlined"
          /> */}

        {/* <Button variant="outlined" onClick={(e) => save(e.preventDefault())} id="button" type="submit">Сохранить метку</Button> */}

      </div>
    </form>

  );
}
