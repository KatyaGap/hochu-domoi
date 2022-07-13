import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Typography, Box, InputLabel, MenuItem, Input, Stack, TextField, ToggleButtonGroup, ToggleButton, Select, FormControl, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { PhotoCamera, Send, KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdvertsThunk, getParamsThunk } from '../redux/actions/adverts';
import filterReducer from '../redux/reducers/filter';
import AddLabel from './elements/AddLabel';

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
  function getType() {
    if (query.get('type') === 'found') return 1;
    if (query.get('type') === 'lost') return 2;
    return 0;
  }

  const [post, setPost] = useState({ type_id: getType(), pet_id: '', breed_id: '', color_id: '', size: '', status_id: '', text: '', date: '', phone: '', address_lattitude: '', address_longtitude: '', address_string: '' });

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
    let newPostId = 0;
    fetch(`/map/${type}`, {
      method: 'Post',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setPosts((prev) => [...prev, result]);
        newPostId = result.id;
      })
      .finally(() => {
        setPost({ type_id: '', pet_id: '', breed_id: '', color_id: '', size: '', status_id: '', text: '', date: '', phone: '', address_lattitude: '', address_longtitude: '', address_string: '' });
        navigate(`/pet/${newPostId}`);
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
    } else if (+e.target.value) {
      setPost((prev) => ({ ...prev, [e.target.name]: +e.target.value }));
    } else {
      setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }, []);

  const changePage = () => {
    setFlag((prev) => !prev);
    console.log("post:::", post);
  };

  // ДЛЯ СТИЛИЗАЦИИ ========================

  const [typeButtonValue, setTypeButtonValue] = useState(getType());
  const handleChangeType = (event, newTypeId) => {
    setTypeButtonValue(newTypeId);
    handleChange(event);
    console.log('typeButtonValue: ', typeButtonValue);
  };

  const [sizeButtonValue, setSizeButtonValue] = useState(0);
  const handleChangeSize = (event, newSizeId) => {
    setSizeButtonValue(newSizeId);
    handleChange(event);
  };

  return (
  // =========================== СТРАНИЦА 1 ===========================
    <div className="container">
      <form className="newpost-content" onSubmit={handleSubmit}>
        {flag === false ? (
          <>
            <Typography variant="h4" component="div" gutterBottom>
              Что у вас случилось?
            </Typography>

            <div className="newpost-item">
              <ToggleButtonGroup className="newpost-type" onChange={handleChangeType} color="primary" value={typeButtonValue} exclusive>
                {types?.map((item, i) => (
                  <ToggleButton key={i + 1} value={i + 1} name="type_id">{item.type}</ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>

            <div className="newpost-item">
              {post.type_id === 1 ? (
                <Typography variant="h6" component="div" gutterBottom>
                  Кому вы ищете хозяина?
                </Typography>
              ) : (
                <Typography variant="h6" component="div" gutterBottom>
                  Кто пропал?
                </Typography>
              )}
              <FormControl className="newpost-pet">
                <div className="newpost-select">
                  <InputLabel id="pet">
                    Вид животного
                  </InputLabel>

                  <Select labelId="pet" fullWidth onChange={handleChange} name="pet_id" value={post.pet_id} label="Вид животного">
                    {pets?.map((item, ind) => (
                      <MenuItem key={ind + 1} value={ind + 1}>
                        {item.pet}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                {post.pet_id === 1 && (
                  <div className="newpost-select newpost-breed">
                    <InputLabel id="breed">Порода</InputLabel>
                    <Select labelId="breed" fullWidth name="breed_id" value={post.breed_id} label="Порода" onChange={handleChange}>
                      {breeds?.map((item, ind) => (
                        <MenuItem key={ind + 1} value={ind + 1}>
                          {item.breed}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}

              </FormControl>
            </div>

            <div className="newpost-item">
              <Typography variant="h6" component="div" gutterBottom>
                Цвет
              </Typography>

              <div className="color-selector">
                {colors?.map((color, i) => (
                  <div className="color-item" key={i + 1}>
                    <span className="color-wrapper">
                      <input onChange={handleChange} value={i + 1} className="color-radio" type="radio" name="color_id" id={`color-${color.hex}`} />
                      <Tooltip title={color.color_name}>
                        <label style={{ backgroundColor: `${color.hex}` }} className="color-label" htmlFor={`color-${color.hex}`}>{color.color_name}</label>
                      </Tooltip>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="newpost-item">
              <FormControl fullWidth>

                <Typography variant="h6" component="div" gutterBottom>
                  Размер
                </Typography>

                <ToggleButtonGroup className="newpost-size" onChange={handleChangeSize} color="primary" value={sizeButtonValue} exclusive>
                  {sizes?.map((size, i) => (
                    <ToggleButton key={i + 1} value={i + 1} name="size_id">
                      <div className="size-icon" style={{ WebkitMaskImage: `url('/sizes/size${i + 1}.svg')`, maskImage: `url('/sizes/size${i + 1}.svg')` }} />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>

              </FormControl>
            </div>

            {post.type_id === 1 && (
              <div className="newpost-item">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                  <Select name="status_id" value={post.status_id} label="Status" onChange={handleChange}>
                    {statuses?.map((item, ind) => {
                      if (ind !== 4) { // не выводить "Потерялся"
                        return (
                          <MenuItem key={ind + 1} value={ind + 1}>
                            {item.status}
                          </MenuItem>
                        );
                      }
                      return null;
                    })}
                  </Select>
                </FormControl>
              </div>
            )}

            <div className="newpost-item">
              {post.type_id === 1 ? (
                <Typography variant="h6" component="div" gutterBottom>
                  Дата обнаружения
                </Typography>
              ) : (
                <Typography variant="h6" component="div" gutterBottom>
                  Дата пропажи
                </Typography>
              )}

              <Stack noValidate spacing={3}>
                <TextField onChange={handleChange} id="date" label="Дата" type="date" name="date" defaultValue="2022-07-08" InputLabelProps={{ shrink: true }} />
              </Stack>
            </div>

            <div className="newpost-item">
              <Typography className="h" variant="h6" component="div" gutterBottom>
                Добавьте текст объявления
              </Typography>
              <Box className="newpost-description" noValidate autoComplete="off">
                <TextField multiline rows={3} sx={{ m: 1 }} variant="outlined" name="text" value={post.text} onChange={handleChange} placeholder="Опишите питомца, особенно его отличительные признаки, чтобы другие могли его узнать" />
              </Box>
            </div>

            <div className="newpost-item newpost-button">
              <Button type="submit" variant="contained" size="large" endIcon={<KeyboardArrowRight />} onClick={changePage}>Далее</Button>
            </div>
          </>

        // ================================ СТРАНИЦА 2 ================================

        ) : (
          <>

            <div className="newpost-item">
              <Typography variant="h6" component="div" gutterBottom>
                Добавьте фото животного
              </Typography>
              <Stack className="file" direction="row" alignItems="center" spacing={2}>
                <label className="newpost-upload-label" htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    <Typography sx={{ ml: "0.5rem" }} variant="subtitle2" color="primary" component="div" gutterBottom>
                      Загрузить фото
                    </Typography>
                  </IconButton>
                </label>
                <input className="newpost-upload-input" accept="image/*" id="icon-button-file" type="file" multiple onChange={handleChange} placeholder="Фото" name="files" />
              </Stack>
            </div>

            <div className="newpost-item">
              <Typography variant="h6" component="div" gutterBottom>
                Укажите контактный телефон
              </Typography>
              <div className="newpost-tel">
                <TextField type="tel" placeholder="+79161234567" value={post.phone} name="phone" onChange={handleChange} label="Телефон" variant="outlined" />
              </div>
            </div>

            <div className="newpost-item">
              <div className="newpost-map-title">
                <Typography variant="h6" component="div" gutterBottom>
                  Где это случилось?
                </Typography>
                <Typography variant="caption" gutterBottom>
                  введите адрес или поставьте метку на карте
                </Typography>
              </div>

              <AddLabel coord={coord} setCoord={setCoord} />

            </div>

            <div className="newpost-item buttons">
              <Button size="large" type="submit" variant="outlined" startIcon={<KeyboardArrowLeft />} onClick={() => setFlag((prev) => !prev)}>
                Назад
              </Button>
              <Button size="large" type="submit" variant="contained" endIcon={<Send />}>
                Разместить объявление
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
