import Login from "./pages/Login";
import Table from "./pages/Table";
import Add from "./pages/Add"
import Change from "./pages/Change";
import {ADD_ROUTE, ADMIN_ROUTE_LOGIN, TABLE_ROUTE} from "./utils/const";



export const authRoutes = [
    {
        path: TABLE_ROUTE,
        component: <Table/>
    },
    {
        path: ADD_ROUTE,
        component: <Add/>
    },
    {
        path: ADD_ROUTE + '/:id',
        component: <Change/>
    }
]

export const publicRoutes = [
    {
        path: ADMIN_ROUTE_LOGIN,
        component: <Login/>
    }
]