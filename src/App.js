
import './App.css';
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
import {Checkbox} from "@mui/material";
import {TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid"
import {Alert} from "@mui/material";
import {Stack} from "@mui/material";


const options = [

    { label: 'Для компании', id:1},
    {label: 'Для всей семьи', id:2},
    {label: 'Для детей', id: 3},
    {label: 'Для влюбленных', id: 4},
    {label: 'Детективные игры', id: 5},
    {label: 'Ролевые игры', id: 6},
    {label: 'Хардкорные игры', id: 7},
    {label: 'Дуэльные игры', id: 8},
    {label: 'Стратегические игры', id:9},
    {label: 'Экономические игры', id:10},
    {label: 'Кооперативные игры', id:11}

]

const optionsRating = [
    { label: '3+', id:1},
    {label: '6+', id:2},
    {label: '8+', id: 3},
    {label: '13+', id: 4},
    {label: '16+', id: 5},
    {label: '18+', id: 6},
]

const optionsPlayers = [
    { label: '1-2', id:1},
    { label: '2-4', id:2},
    { label: '4-8', id:3},
]

const optionsTime = [
    { label: 'до 15 минут', id:1},
    { label: '16-30 минут', id:2},
    { label: '31-60 минут', id:3},
    { label: '61-120 минут', id:4},
    { label: 'от 2 часов', id:5},
]






function App() {
  return (
    <div className="Padding">
      <Stack spacing={5} justifyContent="center"
             alignItems="center">
          <TextField sx={{ width: 800 }} id="Game-Name" label="Название игры" variant="filled" />
          <TextField sx={{ width: 800 }} id="Short-Description" label="Кароткое описание" variant="filled" />
          <TextField sx={{ width: 800 }} multiline rows={20} id="Full-Description" label="Полное описание" variant="filled" />
          <TextField sx={{ width: 800 }} id="Price" label="Цена" variant="filled" />
          <TextField sx={{ width: 800 }} id="Rules" label="Правила-ссылка" variant="filled" />
          <Autocomplete
              disablePortal
              id="Category-List"
              options={options}
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Категория" />}
          />
          <TextField sx={{ width: 800 }} id="Image-Cover" label="Ссылка на мини-картинку" variant="filled" />
          <TextField sx={{ width: 800 }} id="Images" label="Ссылка на картинки" variant="filled" />
          <Autocomplete
              disablePortal
              id="Rating"
              options={optionsRating}
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Возрастной рейтинг" />}
          />
          <Autocomplete
              disablePortal
              id="Count-Players"
              options={optionsPlayers}
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Кол-во игроков" />}
          />
          <Autocomplete
              disablePortal
              id="TimeOfPlay"
              options={optionsTime}
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Время игры" />}
          />
          <Button variant="contained" color="success">Сохранить</Button>
      </Stack>
    </div>
  );
}

export default App;
