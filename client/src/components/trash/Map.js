import React, { useState } from 'react';

export default function Map({ inputs, setInputs, changeLable, setCangeLable, addressСoordinates, inputCoord, setInputCoord }) {
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
    <form onSubmit={handleSubmit}>
      <div>
        {/* <input type="text" id="suggest" class="input" placeholder="Введите адрес"> */}
        <div><input type="text" id="suggest" value={inputs.adress} onChange={inputHandler} name="adress" placeholder="Введите адрес" style={{ width: "400px", height: "40px" }} /></div>
        <div>
          {/* <button type="button" name="lable1"><img src="lable1.png" alt="label1" style={{ width: "30px", height: "30px" }} /></button>
          <button type="button" name="lable2"><img src="lable2.png" alt="label2" style={{ width: "30px", height: "30px" }} /></button>
          <div>выбор метки</div> */}
          <button onClick={addressСoordinates} id="button" type="submit">Добавить метку на карту</button>
        </div>

        {/* <div><input type="text" name="description" placeholder="Описание" /></div> */}
        {/* <div><input type="file" value={form.url} name="file" onChange={handleChange} placeholder="файл" /></div> */}
      </div>
    </form>
  );
}
