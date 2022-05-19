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
import {Breadcrumbs} from "@mui/material";
import {Context} from "../index";
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const GamePage = observer(() => {
    const[game, setGame] = useState({})
    const {category} = useContext(Context)
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

    const catId = game.categoryIdCategories
    let link = "/" + catId
    const [category1, setCategory1] = useState('');
    setTimeout(() => {
        setCategory1((get(category.categories, (catId- 1))).name_category)

    }, 100)
    let rule_link = "" + game.rool_link





    return(

            <div>
                <Header/>
                <div className="Container">
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs" aria-label="breadcrumb">
                        <Link className="breadcrumbsLink" to="/">Игры</Link>
                        <Link className="breadcrumbsLink" to={link}>{category1}</Link>
                        <div className="breadcrumbsName">{game.game_name}</div>
                    </Breadcrumbs>
                    <div className="Container-game">
                        <div className="Container-game-name">
                            <div className="container-game-name-ver">
                            <div className="game-name"> {game.game_name}</div>
                            <div className="game-little-description">{game.little_description}</div>
                            </div>
                        </div>
                        <div className="Container-game-params">
                            <div className="Container-con-game-params">
                                <div className="game-age-rating">{game.age_rating}</div>
                                <GroupsIcon className="game-params-icon"/><div className="game-player-number">{game.players_number}</div>
                                    <AccessTimeIcon className="game-params-icon"/><div className="game-time">{game.game_time}</div>
                            </div>
                        </div>
                        <div className="Container-game-descriptions">
                            <div className="game-img-container"></div>
                            <div><div className="game-des">Описание</div><div className="game-description">{game.description}</div></div>
                        </div>
                        <div className="Container-game-price">
                            <div className="game-id">Код товара:{game.id_product}</div>
                            <div className="game-price-container"><div className="game-price">{game.price}</div><div className="game-rub">руб.</div></div>
                            <div className="game-dropbus-button">В корзину</div>
                            <div className="game-delivery">Самовывоз из 1 магазина от 7 дней, бесплатно<br/>Самовывоз из 51 пункта выдачи, 2 - 7 дней, от 165 ₽ <br/>Курьерская доставка, от 7 дней, от 343 ₽<br/> Почта России, от 15 дней, от 292 ₽</div>
                        </div>

                        {
                            rule_link === "" ? <div></div> :
                                <div className="Container-game-rule">
                                    <a href={rule_link}>Правила игры {game.game_name}</a>
                                </div>


                        }

                    </div>

                    <Footer/>
                </div>
            </div>
    )

})

export default GamePage