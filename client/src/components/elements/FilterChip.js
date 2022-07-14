import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Button, Chip } from '@mui/material';

export default function FilterChip({ filterName, name, optionsObj, handleSetFilter }) {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(false);

  // Делаем из пришедшего списка опций обычный массив
  React.useEffect(() => {
    if (optionsObj) {
      const optionsArr = optionsObj.map((el) => Object.values(el)).flat();
      setOptions(optionsArr);
    }
  }, [optionsObj]);

  const optionsRender = (optionsArr) => optionsArr.map((option, i) => (
    <MenuItem key={i + 1} value={i + 1}>
      {option}
    </MenuItem>
  ));

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log('value: ', value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="chip-select">
      <Chip label={filterName} variant="outlined" onClick={handleOpen} />

      <FormControl className="chip-select-selector" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={filterName} sx={{ visibility: 'hidden', width: "0", height: "0" }}>Age</InputLabel>
        <Select
          autoWidth
          className="chip-select-hidden"
          labelId={filterName}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label={filterName}
          onChange={handleChange}
          sx={{ visibility: 'hidden', width: "0", height: "0" }}
        >

          {options.length && optionsRender(options)}

        </Select>
      </FormControl>
    </div>
  );
}
