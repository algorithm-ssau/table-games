import './App.css';
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
import {Checkbox} from "@mui/material";
import {TextField} from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import {Alert} from "@mui/material";
import {Stack} from "@mui/material";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'GameName', headerName: 'Название игры', width: 130 },
    { field: 'Category', headerName: 'Категория', width: 130 },
    { field: 'Price', headerName: 'Цена', width: 70 }

];

const rows = [
    {id: 1, GameName: 'Немезида', Category: 'Кооперативные игры', Price: '18999'},
    {id: 2, GameName: 'Немезида', Category: 'Кооперативные игры', Price: '18999'}
];


function Table() {
    return (
        <div className="Padding">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
            />
            <div className="But"><Button color="success"  variant="contained">Добавить</Button></div>
            <div className="But"><Button color="secondary"  variant="contained">Изменить</Button></div>
            <div className="But"><Button color="error"  variant="contained">Удалить</Button></div>
        </div>
    );
}

export default Table;
