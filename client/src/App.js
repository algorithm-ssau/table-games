import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {check, checkBuyer, getBasket, pushBasket} from "./http/userApi";
import {observer} from "mobx-react-lite";
import {Box, CircularProgress} from "@mui/material";

const App = observer(() =>{
    const {user} = useContext(Context)
    const {buyer} = useContext(Context)
    const[loading, setLoadung] = useState(true)
    useEffect(()=> {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart === null){
            buyer.setBasketCount2(0)
            buyer.setBasketCount(0)

        }
        else {
            buyer.setBasketCount2(cart.length)
            buyer.setBasketCount(cart.length)
            buyer.setBasket(cart)

        }

        setTimeout(() => {
            checkBuyer().then(data => {
                buyer.setUser(data)
                buyer.setIsAuth(true)
                let basket = buyer.basket;
                var buyerIdBuyer = buyer.user.id
                setTimeout(() => {

                    basket.forEach(element => {pushBasket(parseInt(buyerIdBuyer),element.id_product,element.products_count,element.price )})
                    setTimeout(() => {
                        getBasket(buyerIdBuyer).then(data => {
                            var newData = data;
                            if(newData.length===0){
                            }
                            else{
                                var id_product
                                for(let i=0; i<newData.length; i++){
                                    id_product = newData[i].productIdProduct
                                    delete newData[i].productIdProduct
                                    newData[i].id_product = id_product
                                }
                                localStorage.setItem('cart',JSON.stringify(newData))
                                buyer.setBasket(newData)
                                buyer.setBasketCount(newData.length)
                                buyer.setBasketCount2(newData.length)
                            }

                        })
                    },100)


                },1000)


            })
            check().then(data => {
                user.setUser(data)
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