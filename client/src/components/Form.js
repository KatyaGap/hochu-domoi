import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Form() {
	const location = useLocation();
	const [post, setPost] = React.useState({pet_id: '', breed_id: '', color_id: '', size: '', status: ''});
	const handleChange = (event: SelectChangeEvent) => {
    setPost((prev) => ({ ...prev, [event.target.name]: event.target.value }));

		// console.log(value)
  };	console.log(post)

  return (
		<div>
			<h1>Пожалуйста, заполните данные о животном</h1>
    <Box sx={{ minWidth: 120 }}>
			<div className='select'>
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
        </Select>{' '}
      </FormControl></div>
			<div className='select'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Breed</InputLabel>
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
        </Select>{' '}
      </FormControl></div>
			<div className='select'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
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
      </FormControl></div>
			<div className='select'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
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
      </FormControl></div>
    </Box>
		<Box
      component="form"
      // sx={{
      //   '& > :not(style)': { m: 1, width: '25ch' },
      // }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" multiline rows={4} sx={{ m: 1 }} variant="outlined" name="text" onChange={handleChange} placeholder="Введите текст объявления"/>
    </Box>
		<Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
		</div>
  );
}
