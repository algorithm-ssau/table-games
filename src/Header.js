import React, {useState} from "react";
import './scss/Header.scss';
import AddCart from './img/add-shopping-cart.svg'
import Logo from './img/BoardGameBar.svg';
import DownArrow from './img/Icon material-keyboard-arrow-down.svg';
import Basket from './img/basket-outline.svg';
import Profile from './img/profile_2.svg';
import {Link} from 'react-router-dom';
import {getValue} from "@testing-library/user-event/dist/utils";
import Arrow from "./img/Icon ionic-ios-arrow-back.svg";

function Header(){



    return(
        <div className="Header">

            <img className="Logo" src={Logo} />

                <div id="search-Nav">
                    <NavSearch >
                        <DropdownMenuSearch></DropdownMenuSearch>
                    </NavSearch>
                </div>


                <NavCat >
                    <DropdownMenu/>
                </NavCat>

          <div className="Basket">
            <NavBasket>
                <DropdownBasket/>
            </NavBasket>
          </div>

            <img id="Profile" src={Profile}/>
            <div className="Header-Bg"></div>
        </div>

    );
}

function NavSearch(props){
    const[open, setOpen] = useState(false);
    var value = "";

/*

$$\   $$\  $$$$$$\         $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\  $$$$$$\  $$$$$$$$\ $$\
$$$\  $$ |$$  __$$\       $$  __$$\ $$ |  $$ |$$  __$$\ $$$\  $$ |$$  __$$\ $$  _____|$$ |
$$$$\ $$ |$$ /  $$ |      $$ /  \__|$$ |  $$ |$$ /  $$ |$$$$\ $$ |$$ /  \__|$$ |      $$ |
$$ $$\$$ |$$ |  $$ |      $$ |      $$$$$$$$ |$$$$$$$$ |$$ $$\$$ |$$ |$$$$\ $$$$$\    $$ |
$$ \$$$$ |$$ |  $$ |      $$ |      $$  __$$ |$$  __$$ |$$ \$$$$ |$$ |\_$$ |$$  __|   \__|
$$ |\$$$ |$$ |  $$ |      $$ |  $$\ $$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |  $$ |$$ |
$$ | \$$ | $$$$$$  |      \$$$$$$  |$$ |  $$ |$$ |  $$ |$$ | \$$ |\$$$$$$  |$$$$$$$$\ $$\
\__|  \__| \______/        \______/ \__|  \__|\__|  \__|\__|  \__| \______/ \________|\__|


*/

    var flag = new Boolean(false);
    function Check() {
        value = document.getElementById("site-search").value;
        if (value === "" && flag) {
            setOpen(!open);
            flag = false;
        }
        else if(flag) {
            setOpen(!open);
            setOpen(flag);

        }

    }


    return(
        <div>
            <div className="search-cont" >
                <div><input onInput={Check}  autoComplete="off" type="search" id="site-search" name="q" placeholder="Поиск..."></input></div>

                {open && props.children}
            </div>
        </div>
    );

};

function DropdownItemSearch(props){
    return(
        <div>
            <div className="menu-search-img"></div>
            <div className="menu-search-name">Немезида</div>
            <div className="menu-search-subname">В космосе никто не услышит вашего крика</div>
            <img src={AddCart} className="AddCard"/>
            <div className="menu-search-price">6999р</div>

            <div className="menu-search-line"></div>
        </div>
    );
};

function DropdownMenuSearch(){

    return(

        <div className="dropdown-search">
            <DropdownItemSearch/>
            <DropdownItemSearch/>
        </div>


    );

}

function NavCat(props){
    const[open, setOpen] = useState(false);
    var Arr = "DownArrow";
    if(open){
        Arr = "UpArrow";
    }
    else{
        Arr = "DownArrow";
    };


    return(
        <div className="Category">
            <div onClick={() => setOpen(!open)}>
                Все категории
                <img className={Arr} src={DownArrow}/>
            </div>

            {open && props.children}
        </div>
);
};

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

function NavBasket(props){
    const[open, setOpen] = useState(false);
    return(
        <div>

            <div>
                <img onClick={() => setOpen(!open)}  src={Basket}/>

            {open && props.children}
                </div>

        </div>
    );
};

function DropdownBasket() {
    return (
        <div className="BasketVoidDrop">
            <div className="Oooops-Text">#Ooops</div>
            <div className="BasketVoidDrop-Void-Text">Кажется ваша корзина пуста</div>
            <div className="BasketVoidDrop-sub-text">Добавьте хотя бы один товар, чтобы сделать заказ</div>

            <div className="BasketVoidDrop-Container-back-button">
                <img id="BasketVoidDrop-Arrow-back" src={Arrow}></img>
                <div className="BasketVoidDrop-back-text">Вернуться назад</div>
            </div>


        </div>
    );
}



export default Header