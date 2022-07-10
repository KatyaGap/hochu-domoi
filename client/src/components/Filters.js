import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Input, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { PhotoCamera } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import PostList from './PostList';
import { getFilteredThunk, getParamsThunk } from '../redux/actions/adverts';

export default function Filters({ adverts, setSearchedPosts }) {
  const dispatch = useDispatch();
  const { params } = useSelector((store) => store);
  const { types, pets, colors, breeds, statuses } = params;
	const sizes=['мелкий', 'средний', 'крупный']
  const [filter, setFilter] = React.useState({
    type_id: '',
    pet_id: '',
    breed_id: '',
    color_id: '',
    size: '',
    status_id: '',
  });
  React.useEffect(() => {
    dispatch(getParamsThunk());
  }, []);
  const handleChange = React.useCallback((e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFilteredThunk(filter));
    setFilter({
      type_id: '',
      pet_id: '',
      breed_id: '',
      color_id: '',
      size: '',
      status_id: '',
    });
  };
  console.log(filter);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="h4" component="div" gutterBottom>
            Пожалуйста, выберите данные
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Какие животные вас интересуют?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="type_id"
                  value={filter.type_id}
                  label="Pet"
                  onChange={handleChange}
                >
                  {types?.map((item, ind) => (
                    <MenuItem key={ind + 1} value={ind + 1}>
                      {item.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Вид животного
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="pet_id"
                  value={filter.pet_id}
                  label="Pet"
                  onChange={handleChange}
                >
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
                  <InputLabel id="demo-simple-select-label">Порода</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="breed_id"
                    value={filter.breed_id}
                    label="Breed"
                    onChange={handleChange}
                  >
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
                <InputLabel id="demo-simple-select-label">Цвет</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="color_id"
                  value={filter.color_id}
                  label="Color"
                  onChange={handleChange}
                >
                  {colors?.map((item, ind) => (
                    <MenuItem key={ind + 1} value={ind + 1}>
                      {item.color_name}
                      <span
                        style={{
                          backgroundColor: `${item.hex}`,
                          width: '100px',
                          borderRadius: '20px',
                          margin: '10px',
                        }}
                      >
                        color
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Размер</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="size"
                  value={filter.size}
                  label="Size"
                  onChange={handleChange}
                >
                  {sizes?.map((item, ind) => (
                    <MenuItem key={ind + 1} value={ind + 1}>
                      {item}
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
                    onChange={handleChange}
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
