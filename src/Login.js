
import './App.css';
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
import {Checkbox} from "@mui/material";
import {TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid"
import {Alert} from "@mui/material";
import {Stack} from "@mui/material";





function Login() {
    return (
        <div className="Padding">
            <Stack spacing={5} justifyContent="center"
                   alignItems="center">
                <TextField sx={{ width: 800 }} id="AdminLogin" label="Почта" variant="filled" />
                <TextField type="password" sx={{ width: 800 }} id="AdminPassword" label="Пароль" variant="filled" />

                <Button variant="contained" color="success">Войти</Button>
            </Stack>
        </div>
    );
}

export default Login;
