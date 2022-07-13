import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Button, Chip } from '@mui/material';

export default function FilterChip() {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="chip-select">
      <Chip label="Название фильтра" variant="outlined" onClick={handleOpen} />

      <FormControl className="chip-select-selector" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="chip-select" sx={{ visibility: 'hidden', width: "0", height: "0" }}>Age</InputLabel>
        <Select
          autoWidth
          labelId="chip-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label="???"
          onChange={handleChange}
          sx={{ visibility: 'hidden', width: "0", height: "0" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
