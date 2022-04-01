import React from "react";
import './scss/Header.scss';
import Logo from './img/BoardGameBar.svg';
import DownArrow from './img/Icon material-keyboard-arrow-down.svg';
import Basket from './img/basket-outline.svg';
import Profile from './img/profile_2.svg';

const Header = () =>{
    return(
            <div className="Header">
                <div className="Header-Container">
                <img className="Logo" src={Logo} />
                    <div className="search-cont"><input type="search" id="site-search" name="q" placeholder="Поиск..."></input></div>
                <div className="Category">
                    Все категории
                    <img id="DownArrow" src={DownArrow}/>
                </div>
                <img id="Basket" src={Basket}/>
                <img id="Profile" src={Profile}/>
                </div>
            </div>
    );
}

export default Header