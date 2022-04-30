import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {check} from "./http/userApi";
import {observer} from "mobx-react-lite";
import {Box, CircularProgress, Container, Stack} from "@mui/material";
const App = observer(() =>{
    const {user} = useContext(Context)
    const[loading, setLoadung] = useState(true)
    useEffect(()=> {
        setTimeout(() => {
            check().then(data => {
                user.setUser(true)
                user.setIsAuth(true)
            }).finally(()=> setLoadung(false))
        }, 1000)

    },[])

    if (loading){
        return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', justify: 'center', marginTop: 80}}><CircularProgress size={150}/></Box>
    }

   return(

       <Router>
           <AppRouter/>
       </Router>
   )
})

export default App;