import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import FilterChip from './FilterChip';
import { getFilteredThunk, getParamsThunk } from '../../redux/actions/adverts';

export default function Filters({ adverts }) {
  const dispatch = useDispatch();
  const { params, filtered } = useSelector((state) => state);
  const { sizes, types, pets, colors, breeds, statuses } = params;
  const [filter, setFilter] = React.useState({});
  React.useEffect(() => {
    dispatch(getParamsThunk());
  }, []);

  const handleSetFilter = React.useCallback((e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log('filter', filter);
  });

  const handleApplyFilter = (e) => {
    e.preventDefault();
    dispatch(getFilteredThunk(filter));
  };

  return (
    <div>
      <form onSubmit={handleApplyFilter}>
        <div>
          {/* <Typography variant="h4" component="div" gutterBottom>
            Пожалуйста, выберите данные
          </Typography> */}
          <Box sx={{ minWidth: 120 }}>

            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="post_type">
                  Какие животные вас интересуют?
                </InputLabel>
                <Select labelId="post_type" name="type_id" value={filter.type_id} label="Pet" onChange={handleSetFilter}>
                  <MenuItem value={1}>Найденыши</MenuItem>
                  <MenuItem value={2}>Потеряшки</MenuItem>
                </Select>
              </FormControl>
            </div>

            <FilterChip
              filterName="Вид питомца"
              name="pet_id"
              optionsObj={pets}
              handleSetFilter={handleSetFilter}
            />

            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="pet">
                  Вид животного
                </InputLabel>
                <Select labelId="pet" name="pet_id" value={filter.pet_id} label="Pet" onChange={handleSetFilter}>
                  {pets?.map((item, ind) => (
                    <MenuItem key={ind + 1} value={ind + 1}>
                      {item.pet}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {filter.pet_id === 1 && (
              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="breed">Порода</InputLabel>
                  <Select labelId="breed" name="breed_id" value={filter.breed_id} label="Breed" onChange={handleSetFilter}>
                    {breeds?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.breed}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="color">Цвет</InputLabel>
                <Select labelId="color" name="color_id" value={filter.color_id} label="Color" onChange={handleSetFilter}>
                  {colors?.map((item, ind) => (
                    <MenuItem key={ind + 1} value={ind + 1}>
                      {item.color_name}
                      <span style={{ backgroundColor: `${item.hex}`, width: '100px', borderRadius: '20px', margin: '10px' }}>
                        color
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="size">Размер</InputLabel>
                <Select labelId="size" name="size_id" value={filter.size_id} label="Size" onChange={handleSetFilter}>
                  {sizes?.map((item, ind) => (
                    <MenuItem key={ind + 1} value={ind + 1}>
                      {item.size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {filter.type_id === 1 && (
              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="status_id"
                    value={filter.status_id}
                    label="Status"
                    onChange={handleSetFilter}
                  >
                    {statuses?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </Box>
        </div>
        <Button type="submit" variant="contained">
          Выбрать объявления
        </Button>
      </form>
    </div>
  );
}
