import React, {useContext, useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import '../css/index.scss'
import '../css/gamePage.scss'
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchCategory, fetchOneGame} from "../http/gameAPI";
import {Link} from 'react-router-dom'
import {get} from "mobx";
import {Breadcrumbs, Stack} from "@mui/material";
import {Context} from "../index";
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Grid from "@mui/material/Grid";
import Carousel from "nuka-carousel";
import Arrow from "../img/Icon ionic-ios-arrow-back.svg";
import {CATEGORY_ROUTE} from "../utils/const";
import {pushBasket, updBasket} from "../http/userApi";

const GamePage = observer(() => {
    const[game, setGame] = useState({})
    const {category} = useContext(Context)
    const {buyer} = useContext(Context)
    const {id} = useParams()
    useEffect(() =>{

        fetchCategory().then(data => {
            category.setCategories(data)
        })
        setTimeout(() => {},700)
        fetchOneGame(id).then(data => {
            setGame(data)
        })

    },[])
    useEffect(()=>{
        setTimeout(()=>{
                setImg(game.mas_pictures.split('\n'))

            },100
        )
        setTimeout(() => {
            setCategory1((get(category.categories, (catId- 1))).name_category)

        }, 100)
    },[game])
    useEffect(() =>{

        fetchCategory().then(data => {
            category.setCategories(data)
        })
        setTimeout(() => {},700)
        fetchOneGame(id).then(data => {
            setGame(data)
        })
    },[id])

    function Cart(){
        const basket = buyer.basket
        var index = basket.findIndex(obj => obj.id_product===game.id_product)
        var auth = buyer.isAuth
        if(index < 0){
            if(buyer.basketCount === 0){

                const updateCart = [{id_product: game.id_product, products_count: 1, price: game.price}]
                if(auth===true){
                    pushBasket(parseInt(buyer.user.id),game.id_product,1,game.price).then(data => {})
                }

                buyer.setBasket(updateCart)
                localStorage.setItem('cart', JSON.stringify(updateCart))
                buyer.setBasketCount(buyer.basketCount + 1)
            }
            else {
                const oldCart = basket
                const updateCart = [...oldCart, {id_product: game.id_product, products_count: 1, price: game.price}]

                if(buyer.isAuth===true){
                    pushBasket(parseInt(buyer.user.id),game.id_product,1,game.price).then(data => {})
                }
                buyer.setBasket(updateCart)
                localStorage.setItem('cart', JSON.stringify(updateCart))
                buyer.setBasketCount(buyer.basketCount + 1)
            }
        }
        else{
            const updateCart = basket;
            const countCart = basket
            const newCountCart = countCart.slice(index, index + 2)
            const count = newCountCart[0].products_count
            const newCount = count + 1
            if(buyer.isAuth===true){
                console.log(newCount)
                updBasket(parseInt(buyer.user.id),game.id_product,newCount).then(data => {})
            }
            updateCart.splice(index,1, {id_product: game.id_product,  products_count: newCount, price: game.price});
            buyer.setBasket(updateCart)
            buyer.setBasketCount2(buyer.basketCount2 + 1)
            localStorage.setItem('cart', JSON.stringify(updateCart))
        }

    }
    const catId = game.categoryIdCategories
    let link = CATEGORY_ROUTE +"/" +catId
    const [category1, setCategory1] = useState('');

    let rule_link = "" + game.rool_link


    const [img, setImg] = useState([])
    return(

            <div>
                <Header/>
                <div className="Container">
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs" aria-label="breadcrumb">
                        <Link className="breadcrumbsLink" to="/">Игры</Link>
                        <Link className="breadcrumbsLink" to={link}>{category1}</Link>
                        <div className="breadcrumbsName">{game.game_name}</div>
                    </Breadcrumbs>
                    <Grid container spacing={0} className="Container-game">
                        <Grid item xs={9} className="Container-game-name">
                            <div className="container-game-name-ver">
                            <div className="game-name"> {game.game_name}</div>
                            <div className="game-little-description">{game.little_description}</div>
                            </div>
                        </Grid>
                        <Grid item xs={2.5} className="Container-game-params">

                            <Grid   item xs={15} spacing={15} className="Container-con-game-params">
                                <div className="game-age-rating">{game.age_rating}</div>
                                <GroupsIcon className="game-params-icon"/><div className="game-player-number">{game.players_number}</div>
                                    <AccessTimeIcon className="game-params-icon"/><div className="game-time">{game.game_time}</div>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} className="Container-game-descriptions">
                            <div className="game-img-container">
                                <Carousel
                                    renderCenterLeftControls={({ previousSlide }) => (
                                        <img onClick={previousSlide} className="left-arrow-container" src={Arrow} ></img>
                                    )}
                                    renderCenterRightControls={({ nextSlide }) => (
                                        <img onClick={nextSlide} className="right-arrow-container" src={Arrow} ></img>
                                    )}
                                    renderBottomCenterControls={({ currentSlide }) => (
                                        img.map((image, index) => index === currentSlide ? <div className="paging active"></div> : <div  className="paging"></div>)
                                    )}
                                >

                                    {img.map(image => <div className="game-img-container-2"><img className="fit" src={image}/></div>)}

                                </Carousel>
                            </div>
                            <div className="game-des-container"><div className="game-des">Описание</div><div className="game-description">{game.description}</div></div>
                        </Grid>
                        <Grid item xs={2.5} className="Container-game-price">
                                <div className="game-id">Код товара:{game.id_product}</div>
                                <div className="game-price-container"><div className="game-price">{game.price}</div><div className="game-rub">руб.</div></div>
                                <div onClick={() => Cart()} className="game-dropbus-button">В корзину</div>
                                <div className="game-delivery">Самовывоз из 1 магазина от 7 дней, бесплатно<br/>Самовывоз из 51 пункта выдачи, 2 - 7 дней, от 165 ₽ <br/>Курьерская доставка, от 7 дней, от 343 ₽<br/> Почта России, от 15 дней, от 292 ₽</div>

                        </Grid>
                        {
                            rule_link === "" ? <div></div> :
                                <div className="Container-game-rule">
                                    <a className="game-rule" href={rule_link}>Правила игры {game.game_name}</a>
                                </div>


                        }
                    </Grid>

                    <Footer/>
                </div>
            </div>
    )

})

export default GamePage