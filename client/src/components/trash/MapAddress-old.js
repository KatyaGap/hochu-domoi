import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
// import { addressСoordinates } from './AddLabel';
// import { addressСoordinates } from './AddLabel';

export default function MapAddressOld({ addressСoordinates, save, setCoord, inputs, setInputs, changeLable, setCangeLable, inputCoord, setInputCoord }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const inputHandler = (e) => {
    setInputCoord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const changeLableHandler = (e) => {
    setCangeLable({ [e.target.name]: e.target.value });
  };
  // console.log('changeLable', changeLable);
  return (
    
  );
}
