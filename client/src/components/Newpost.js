import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getStepLabelUtilityClass,
  IconButton,
  Input,
  Stack,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { PhotoCamera } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdvertsThunk, getParamsThunk } from '../redux/actions/adverts';
import filterReducer from '../redux/reducers/filter';
import AddLabel from './AddLabel';
import Map from './trash/Map';

export default function Newpost({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [flag, setFlag] = React.useState(false);
  const { params } = useSelector((state) => state);
  const { sizes, types, pets, colors, breeds, statuses } = params;
  const [coord, setCoord] = useState({});
  const ref = useRef();
  // console.log('params', params);
  // console.log('pets', pets);
  useEffect(() => {
    dispatch(getParamsThunk());
  }, []);
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();
  console.log('query', query.get('type'));
  function getType() {
    if (query.get('type') === 'found') return 1;
    if (query.get('type') === 'lost') return 2;
    return '';
  }
  const [post, setPost] = useState({
    type_id: getType(),
    pet_id: '',
    breed_id: '',
    color_id: '',
    size: '',
    status_id: '',
    text: '',
    date: '',
    phone: '',
    address_lattitude: '',
    address_longitude: '',
    address_string: '',
  });
  function getStatus() {
    if (post.type_id === 2) return 5;
    return post.status_id;
  }
  function getBreed() {
    if (post.pet_id === 2) return 6;
    return post.breed_id;
  }

  function makeBool1() {
    if (post.type_id && post.pet_id && post.breed_id && post.color_id && post.size && post.status_id && post.text
    ) {
      return true;
    }
    if (post.type_id && post.pet_id && post.breed_id && post.color_id && post.size && post.status_id && post.text
    ) return true;
    return false;
  }
  function makeBool2() {
    if (post.files && post.phone) return true;
    return false;
  }
  function makeToast() {
    return (
      <div className="toast-njksonkio">
        {toast.info('Вы заполнили не все поля!', {
          position: toast.POSITION.BOTTOM_CENTER,
        })}
      </div>
    );
  }
console.log('post', post)
  console.log(query.get('type'));
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type_id', Number(post.type_id));
    formData.append('pet_id', Number(post.pet_id));
    formData.append('breed_id', getBreed());
    formData.append('color_id', Number(post.color_id));
    formData.append('size', Number(post.size));
    formData.append('status_id', getStatus());
    post.files?.map((el, i) => formData.append('files', post.files[i]));
    formData.append('date', post.date);
    formData.append('text', post.text);
    formData.append('phone', post.phone);
    formData.append('address_lattitude', coord?.coordinates[0]);
    formData.append('address_longitude', coord?.coordinates[1]);
    formData.append('address_string', coord?.adress);
    console.log('formData', Object.fromEntries(formData));
    // console.log('post', post);
    fetch(`/map/${type}`, {
      method: 'Post',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => setPosts((prev) => [...prev, result]))
      .finally(() => {
        setPost({
          type_id: '',
          pet_id: '',
          breed_id: '',
          color_id: '',
          size: '',
          status_id: '',
          text: '',
          date: '',
          phone: '',
          address_lattitude: '',
          address_longitude: '',
          address_string: '',
        });
        // navigate('/');
      });
  };
  const handleChange = React.useCallback((e) => {
    if (e.target.type === 'file') {
      console.log(e.target.files.length);
      setPost((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        files: new Array(e.target.files.length)
          .fill('')
          .map((el, i) => e.target.files[i]),
      }));
    } else {
      setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {flag === false ? (
        <div>
          <Typography variant="h4" component="div" gutterBottom>
            Пожалуйста, заполните данные о животном
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            {!query.get('type') && (
              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Выберите ваш случай
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type_id"
                    value={post.type_id}
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
            )}
            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Вид животного
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="pet_id"
                  value={post.pet_id}
                  label="Вид животного"
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
            {post.pet_id === 1 && (
              <div className="select">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Порода</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="breed_id"
                    value={post.breed_id}
                    label="Порода"
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
                  value={post.color_id}
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
                  {sizes?.map((item, ind) => (
                    <MenuItem key={ind + 1} value={ind + 1}>
                      {item.size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <Button
                type="button"
                variant="contained"
                onClick={() => setFlagSize((prev) => !prev)}
              >
                Ориентиры по размеру
              </Button> */}
              {/* {flag && (
                <div>
                  <img src="" alt="размеры"></img>
                </div>
              )} */}
            </div>
            {post.type_id === 1 && (
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
          <Button
            type="submit"
            variant="contained"
            // onClick={() => (makeBool1() ? setFlag((prev) => !prev) : makeToast())}
            onClick={() => setFlag((prev) => !prev)}
          >
            Далее
          </Button>
        </div>
      ) : (
        <div>
          <Typography className="h" variant="h6" component="div" gutterBottom>
            Добавьте фото животного
          </Typography>
          <Stack
            className="file"
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                onChange={handleChange}
                placeholder="Фото"
                name="files"
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

          <Typography className="h" variant="h6" component="div" gutterBottom>
            Укажите контактный телефон
          </Typography>
          <div className="select">
            <Input
              type="phone"
              placeholder="Enter phone number"
              value={post.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
          <AddLabel coord={coord} setCoord={setCoord} />
          <Button
            type="submit"
            variant="contained"
            onClick={() => setFlag((prev) => !prev)}
          >
            Назад
          </Button>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Отправить данные
          </Button>
        </div>
      )}
    </form>
  );
}
