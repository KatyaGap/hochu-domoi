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
import { useDispatch } from 'react-redux';
import PostList from './PostList';
import { getFilteredThunk } from '../redux/actions/adverts';

export default function Filters({ adverts, setFilteredPosts }) {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState({});
  const handleChange = React.useCallback((e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFilteredThunk(filter));
    setFilter({});
    e.target.reset();
  };
  console.log(filter);
  return (
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
                <MenuItem value={1}>Найденыши</MenuItem>
                <MenuItem value={2}>Потеряшки</MenuItem>
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
                <MenuItem value={1}>Собака</MenuItem>
                <MenuItem value={2}>Кошка</MenuItem>
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
                  <MenuItem value={1}>Такса</MenuItem>
                  <MenuItem value={2}>Метис</MenuItem>
                  <MenuItem value={3}>Двортерьер</MenuItem>
                  <MenuItem value={4}>Иное</MenuItem>
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
                <MenuItem value={1}>Черный</MenuItem>
                <MenuItem value={2}>Коричневый</MenuItem>
                <MenuItem value={3}>Белый</MenuItem>
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
                <MenuItem value={1}>Мелкий</MenuItem>
                <MenuItem value={2}>Средний</MenuItem>
                <MenuItem value={3}>Крупный</MenuItem>
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
                  <MenuItem value={1}>Замечен на улице</MenuItem>
                  <MenuItem value={2}>Ищу передержку</MenuItem>
                  <MenuItem value={3}>
                    Животное на передержке. Ищу хозяина
                  </MenuItem>
                  <MenuItem value={4}>Ищу только старого хозяина</MenuItem>
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
  );
}
