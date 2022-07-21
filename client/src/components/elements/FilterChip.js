import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Button, Chip } from '@mui/material';

export default function FilterChip({ filterName, name, options, handleSetFilter }) {
  const [value, setValue] = React.useState('');
  const [optionShow, setOptionShow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setValue(+e.target.dataset.value);
    handleSetFilter(name, +e.target.dataset.value);
    setOptionShow(e.target.dataset.option);
  };

  const handleReset = () => {
    handleSetFilter(name, "");
    setOptionShow(null);
  };

  return (
    <div className="chip-select">
      {optionShow
        ? <Chip className="filter-chip" label={optionShow} color="primary" onClick={handleOpen} onDelete={handleReset} />
        : <Chip className="filter-chip" label={filterName} variant="outlined" onClick={handleOpen} /> }

      <FormControl className="chip-select-selector" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={filterName} sx={{ visibility: 'hidden', width: "0", height: "0" }}>{name}</InputLabel>
        <Select
          autoWidth
          className="chip-select-hidden"
          labelId={filterName}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label={filterName}
          sx={{ visibility: 'hidden', width: "1", height: "1", opacity: "0" }}
        >

          {options?.length
            && options?.map((option, i) => (
              <MenuItem onClick={handleChange} data-option={option.value} key={option.id} value={option.id} name={name}>
                {option.value}
                <span className="value" data-value={option.value} />
              </MenuItem>
            ))}

        </Select>
      </FormControl>
    </div>
  );
}
