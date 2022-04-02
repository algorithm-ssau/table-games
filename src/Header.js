import React, {useState} from "react";
import './scss/Header.scss';
import Logo from './img/BoardGameBar.svg';
import DownArrow from './img/Icon material-keyboard-arrow-down.svg';
import Basket from './img/basket-outline.svg';
import Profile from './img/profile_2.svg';
import {Link} from 'react-router-dom';

function Header(){



    return(
        <div>
            <div className="Header">
                <div className="Header-Container">
                <img className="Logo" src={Logo} />
                    <div className="search-cont"><input type="search" id="site-search" name="q" placeholder="Поиск..."></input></div>


                    <NavItem >
                        <DropdownMenu/>

                    </NavItem>
                <img id="Basket" src={Basket}/>
                <img id="Profile" src={Profile}/>

                </div>

            </div>

        </div>

    );
}

function NavItem(props){
    const[open, setOpen] = useState(false);
    return(
        <div className="Category">
            <div onClick={() => setOpen(!open)}>
                Все категории
                <img id="DownArrow" src={DownArrow}/>
            </div>

            {open && props.children}
        </div>
);
}
function DropdownItem(props){
    return(
        <div className="menu-item">
            {props.children}
        </div>
    );
}
function DropdownMenu(){

    return(

        <div className="dropdown">
            <DropdownItem>
                #Хиты
            </DropdownItem>
            <DropdownItem>
                #Детектвные
            </DropdownItem>

            <DropdownItem>
                #Логические
            </DropdownItem>
            <DropdownItem>
                #Командные
            </DropdownItem>
        </div>


    );

}





export default Header
export {DropdownMenu}
export {NavItem}