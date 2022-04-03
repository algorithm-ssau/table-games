import React, {useState} from "react";
import './scss/Header.scss';
import './scss/AnimationHeader.scss'
import AddCart from './img/add-shopping-cart.svg'
import Logo from './img/BoardGameBar.svg';
import DownArrow from './img/Icon material-keyboard-arrow-down.svg';
import Basket from './img/basket-outline.svg';
import Profile from './img/profile_2.svg';
import Cancel from './img/cancel.svg';
import Search from './img/Icon ionic-ios-search.svg'
import {Link} from 'react-router-dom';
import Arrow from "./img/Icon ionic-ios-arrow-back.svg";
import {CSSTransition} from 'react-transition-group';



var flagBasket = new Boolean(false);



function Header(){

    return(
        <div className="Header">
            <div className="Header-Bg"></div>
            <img className="Logo" src={Logo} />

                <div id="search-Nav">
                    <NavSearch >
                        <DropdownMenuSearch></DropdownMenuSearch>
                    </NavSearch>
                </div>


                <NavCat>
                    <DropdownMenu/>
                </NavCat>


            <NavBasket>
                <DropdownBasket/>
            </NavBasket>

            <img id="Profile" src={Profile}/>

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
            DropCSS_Search  = "fade-out dropdown-search"
        }
        else if(flag) {
            setOpen(!open);
            setOpen(flag);
            DropCSS_Search = "fade-in dropdown-search"

        }

    }


   return(
        <div>
            <div className="search-cont" >
                <CSSTransition in={open}
                               timeout={200}
                               classNames="DropAnim"
                               onEntering={() => setOpen(open)}
                               onExited={() => setOpen(open)}
                >{props.children}</CSSTransition>
                <div><input onInput={Check}  autoComplete="off" type="search" id="site-search" name="q" placeholder="Поиск..."></input></div>


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

        <div className={DropCSS_Search}>

            <DropdownItemSearch/>
            <DropdownItemSearch/>
        </div>

    );

}

var DropCSS = "fade-out dropdown";
var DropCSS_Search = "fade-out dropdown-search";
var DropCSS_Basket = "fade-out BasketVoidDrop";
var DropCSS_Profile = "fade-out dropdown-profile"


var Arr = "DownArrow";
var flagClose = false;
function NavCat(props){
        const[open, setOpen] = useState(false);
    function Hide(){


        flagClose = false;
        Arr = "DownArrow";
        DropCSS = "fade-out dropdown";
        setOpen(!flagClose)

    }
    function Open(){

        if(flagClose){
            DropCSS = "fade-out dropdown";

            Arr = "DownArrow";
            setOpen(flagClose);
            flagClose = false;
        }
        else{
        DropCSS = "fade-in dropdown";

        Arr = "UpArrow";

            setOpen(flagClose);
            flagClose = true;
        }
    }

    return(
        <div className="Category" >
            <div className="FakeHeader">
                <div className="Full" onMouseOut={Hide}></div>
            <CSSTransition in={!open}
                           timeout={200}
                           classNames="DropAnim"
            >{props.children}</CSSTransition></div>
    <div><div onClick={Open}>

                Все категории
                <img className={Arr} src={DownArrow}/>
            </div></div>



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

        <div className={DropCSS}>
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
    const [open, setOpen] = useState(false);

    if(!open){
        DropCSS_Basket = "fade-out BasketVoidDrop";
    }
    else{
        DropCSS_Basket = "fade-in BasketVoidDrop";

    }
 return(
     <div  className="Basket">

            <div>
                <div className="FakeHeader2"><CSSTransition in={!open}
                               timeout={200}
                               classNames="DropAnim"
                               onEntering={() => setOpen(open)}
                               onExited={() => setOpen(open)}
                >{props.children}</CSSTransition></div>
                <img onClick={() => setOpen(!open)}  src={Basket}/>


            </div>

        </div>
    );
};

function DropdownBasketVoid() {
    return (
        <div   className={DropCSS_Basket}>
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
function DropdownBasket(){
    return(
        <div className={DropCSS_Basket}>
            <div className="dropdown-basket-container">
                <DropdownBasketItem/>
                <DropdownBasketItem/>
            </div>

        </div>

    );
}
function DropdownBasketItem(){
    return(
      <div  className="dropdown-basket-container-item">
        <div className="dropdown-basket-img"></div>
          <div className="dropdown-basket-name">Немезис</div>
          <div className="dropdown-basket-price">6999р</div>
          <div className="dropdown-basket-counter"><div  className="dropdown-basket-counter-symbol"> -</div ><div className="dropdown-basket-counter-symbol">2</div><div className="dropdown-basket-counter-symbol">+</div> </div>
            <img src={Cancel} className="dropdown-basket-cancel"/>
            <div className="dropdown-basket-line"></div>
      </div>


    );
}


export default Header