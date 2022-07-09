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

export default function Newpost({ type }) {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();
  console.log('query', query.get('type'));

  const location = useLocation();
  const [post, setPost] = React.useState({
    type_id: query.get('type') === 'found' ? 1 : 2,
    pet_id: '',
    breed_id: 4,
    color_id: '',
    size: '',
    status_id: '1',
    text: '',
    date: '',
  });
  const [posts, setPosts] = React.useState([]);
  console.log(post);
  const handleSubmit = (e) => {
    console.log('я тут');
    e.preventDefault();
    const formData = new FormData();
    formData.append('pet_id', Number(post.pet_id));
    formData.append('breed_id', Number(post.breed_id));
    formData.append('color_id', Number(post.color_id));
    formData.append('size', Number(post.size));
    formData.append('status_id', Number(post.status));
    formData.append('file', post.file);
    formData.append('date', post.date);
    formData.append('text', post.text);

    fetch(`/map/${type}`, { method: 'Post', body: formData })
      .then((response) => response.json())
      .then((result) => {
        console.log(result, posts);
        return setPosts((prev) => [...prev, result]);
      })
      .finally(() => setPost({}));
  };

  const handleChange = React.useCallback((e) => {
    if (e.target.type === 'file') {
      setPost((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        file: e.target.files[0],
      }));
    } else {
      setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="div" gutterBottom>
        Пожалуйста, заполните данные о животном
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <div className="select">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Вид животного</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="pet_id"
              value={post.pet_id}
              label="Pet"
              onChange={handleChange}
            >
              <MenuItem value={1}>Собака</MenuItem>
              <MenuItem value={2}>Кошка</MenuItem>
            </Select>
          </FormControl>
        </div>
        {post.pet_id === '1' && (
          <div className="select">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Порода</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="breed_id"
                value={post.breed_id}
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
              value={post.color_id}
              label="Color"
              onChange={handleChange}
            >
              <MenuItem value={1}>Черный</MenuItem>
              <MenuItem value={2}>Коричневый</MenuItem>
              <MenuItem value={3}>Белый</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <Button type="submit" variant="contained" endIcon={<SendIcon />}> onClick={() => useNavigate('/newpost/2')}
        Отправить данные
      </Button> */}
        <div className="select">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Размер</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="size"
              value={post.size}
              label="Size"
              onChange={handleChange}
            >
              <MenuItem value={1}>Мелкий</MenuItem>
              <MenuItem value={2}>Средний</MenuItem>
              <MenuItem value={3}>Крупный</MenuItem>
            </Select>
          </FormControl>
        </div>
        {query.get('type') === 'found' && (
          <div className="select">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Статус</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="status_id"
                value={post.status_id}
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
      {post.type_id === 1 ? (
        <Typography variant="h6" component="div" gutterBottom>
          Дата обнаружения
        </Typography>
      ) : (
        <Typography variant="h6" component="div" gutterBottom>
          Дата пропажи
        </Typography>
      )}
      <div className="select">
        <Stack component="form" noValidate spacing={3}>
          <TextField
            id="date"
            label="Date"
            type="date"
            name="date"
            defaultValue="2022-07-08"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </Stack>
      </div>
      <Typography className="h" variant="h6" component="div" gutterBottom>
        Добавьте текст объявления
      </Typography>
      <Box
        component="form"
        // sx={{
        //   '& > :not(style)': { m: 1, width: '25ch' },
        // }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          multiline
          rows={4}
          sx={{ m: 1 }}
          variant="outlined"
          name="text"
          value={post.text}
          onChange={handleChange}
          placeholder="Введите текст объявления"
        />
      </Box>
      <Typography className="h" variant="h6" component="div" gutterBottom>
        Добавьте фото животного
      </Typography>
      <Stack className="file" direction="row" alignItems="center" spacing={2}>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleChange}
            placeholder="Фото"
            name="photo_url"
            value={post.photo_url}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Stack>
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
        Отправить данные
      </Button>
    </form>
  );
}
