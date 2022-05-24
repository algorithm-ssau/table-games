import React, {useState} from "react";
import '../css/Header.scss';
import '../css/AnimationHeader.scss'
import AddCart from '../img/add-shopping-cart.svg'
import Logo from '../img/BoardGameBar.svg';
import DownArrow from '../img/Icon material-keyboard-arrow-down.svg';
import Basket from '../img/basket-outline.svg';
import Profile from '../img/profile_2.svg';
import Cancel from '../img/cancel.svg';
import Search from '../img/Icon ionic-ios-search.svg'
import {Link, useNavigate, useParams} from 'react-router-dom';
import Arrow from "../img/Icon ionic-ios-arrow-back.svg";
import {CSSTransition} from 'react-transition-group';
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {fetchCategory, fetchOneGame, fetchSearch} from "../http/gameAPI";
import {CATEGORY_ROUTE, MAIN_ROUTE} from "../utils/const";
import {delBasket, getBasket, loginBuyer, pushBasket, registration, updBasket} from "../http/userApi";
import MonoBear from "../img/monobear-eating.gif"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


/*
$$\   $$\                           $$\
$$ |  $$ |                          $$ |
$$ |  $$ | $$$$$$\   $$$$$$\   $$$$$$$ | $$$$$$\   $$$$$$\
$$$$$$$$ |$$  __$$\  \____$$\ $$  __$$ |$$  __$$\ $$  __$$\
$$  __$$ |$$$$$$$$ | $$$$$$$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
$$ |  $$ |$$   ____|$$  __$$ |$$ |  $$ |$$   ____|$$ |
$$ |  $$ |\$$$$$$$\ \$$$$$$$ |\$$$$$$$ |\$$$$$$$\ $$ |
\__|  \__| \_______| \_______| \_______| \_______|\__|
*/



const Header = observer(() =>{
    const {game} = useContext(Context)
    const {buyer} = useContext(Context)
    useEffect(() => {
        {

        }
    }, [buyer.basketCount2])


    useEffect(() => {
        fetchCategory().then(data => game.setCategories(data))
    }, [])
    return(
        <div className="Header">
            <div className="Header-Bg"></div>
            <Link to={MAIN_ROUTE}><img className="Logo" src={Logo} /></Link>

                <div id="search-Nav">
                    <NavSearch >
                        <DropdownMenuSearch></DropdownMenuSearch>
                    </NavSearch>
                </div>


                <NavCat>
                    <DropdownMenu/>
                </NavCat>


            <NavBasket>
                {buyer.basketCount===0 ? <DropdownBasketVoid/> : <DropdownBasket/>}
            </NavBasket>

            <NavProf>
                <DropdownProfile/>
            </NavProf>



        </div>

    );
})

var searchVal;

function NavSearch(props){
    const[open, setOpen] = useState(false);
    const [value, setValue] = useState('')
    const {id} = useParams();

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

    useEffect(()=> {
        searchVal = value


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

    },[value])
    useEffect(()=>{
        setValue('')
    },[id])

   return(
        <div>
            <img src={Search} className="Search-Icon"/>
            <div className="search-cont" >

                <CSSTransition in={open}
                               timeout={200}
                               classNames="DropAnim"
                               onEntering={() => setOpen(open)}
                               onExited={() => setOpen(open)}
                >{props.children}</CSSTransition>
                <div><input onChange={e => setValue(e.target.value)} type="search" id="site-search" placeholder="Поиск..."></input></div>


            </div>
        </div>
    );

};

const DropdownItemSearch = ({game}) =>{

    const nav = useNavigate()

    {

        return (
            <div onClick={() => nav('/Game/' + game.id_product)} className="search-nav">
                <img src={game.little_picture} className="menu-search-img"></img>
                <div className="menu-search-name">{game.game_name}</div>
                <div className="menu-search-subname">{game.little_description}</div>
                <img src={AddCart} className="AddCard"/>
                <div className="menu-search-price">{game.price}</div>

                <div className="menu-search-line"></div>
            </div>
        );
    }
    ;
}





function DropdownMenuSearch(){
    const {search} = useContext(Context)

    useEffect(() => {
        if(searchVal === ""){}
        else {

            fetchSearch(searchVal).then(data =>{
                search.setGames(data.rows)
                search.setTotal(data.count)}
            )
        }
    },[searchVal])
    return(

        <div className={DropCSS_Search}>
            {
                search.countTotal > 0 ? <div>{search.games.map(game => <DropdownItemSearch key={game.id_product} game={game}/>)}</div> :  <div className="searchOpps">#Oppps. Ничего не найдено. </div>
            }
        </div>

    );

}

var DropCSS = "fade-out dropdown";
var DropCSS_Search = "fade-out dropdown-search";
var DropCSS_Basket = "fade-out BasketVoidDrop";

var DropCSS_Profile = "fade-out dropdown-profile"


var Arr = "DownArrow";
var flagClose = false;
var flagClose2 = false
function NavCat(props){
/*
    $$\   $$\  $$$$$$\         $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\  $$$$$$\  $$$$$$$$\       $$\   $$\  $$$$$$\  $$\
    $$$\  $$ |$$  __$$\       $$  __$$\ $$ |  $$ |$$  __$$\ $$$\  $$ |$$  __$$\ $$  _____|      $$ |  $$ |$$  __$$\ $$ |
    $$$$\ $$ |$$ /  $$ |      $$ /  \__|$$ |  $$ |$$ /  $$ |$$$$\ $$ |$$ /  \__|$$ |            \$$\ $$  |\__/  $$ |$$ |
    $$ $$\$$ |$$ |  $$ |      $$ |      $$$$$$$$ |$$$$$$$$ |$$ $$\$$ |$$ |$$$$\ $$$$$\           \$$$$  /  $$$$$$  |$$ |
    $$ \$$$$ |$$ |  $$ |      $$ |      $$  __$$ |$$  __$$ |$$ \$$$$ |$$ |\_$$ |$$  __|          $$  $$<  $$  ____/ \__|
    $$ |\$$$ |$$ |  $$ |      $$ |  $$\ $$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |  $$ |$$ |            $$  /\$$\ $$ |
    $$ | \$$ | $$$$$$  |      \$$$$$$  |$$ |  $$ |$$ |  $$ |$$ | \$$ |\$$$$$$  |$$$$$$$$\       $$ /  $$ |$$$$$$$$\ $$\
    \__|  \__| \______/        \______/ \__|  \__|\__|  \__|\__|  \__| \______/ \________|      \__|  \__|\________|\__|

 */

    const[open, setOpen] = useState(false);
    function Hide(){


        flagClose = false;
        Arr = "DownArrow";
        DropCSS = "fade-out dropdown";
        setOpen(flagClose)

    }
    function Open(){

        if(flagClose){
            DropCSS = "fade-out dropdown";

            Arr = "DownArrow";
            setOpen(!flagClose);
            flagClose = false;
        }
        else{
            DropCSS = "fade-in dropdown";

            Arr = "UpArrow";

            setOpen(!flagClose);
            flagClose = true;
        }
    }

    return(
        <div className="Category" >
            <div className="FakeHeader">

                <CSSTransition in={!open}
                               timeout={200}
                               classNames="DropAnim"
                ><div onPointerLeave={Hide} className={DropCSS}>{props.children}</div></CSSTransition></div>
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
const DropdownMenu = observer(() => {
    const {game} = useContext(Context)
    useEffect(() => {
        fetchCategory().then(data => game.setCategories(data))
    }, [])
    return(

        <div>
            {game.categories.map(category => <DropdownItem><Link className="no_decor" to={CATEGORY_ROUTE + '/' +category.id_categories}>#{category.name_category}</Link></DropdownItem>)}
        </div>


    );

})

function NavBasket(props){

   /* $$\   $$\  $$$$$$\         $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\  $$$$$$\  $$$$$$$$\       $$\   $$\  $$$$$$\  $$\ $$\
    $$$\  $$ |$$  __$$\       $$  __$$\ $$ |  $$ |$$  __$$\ $$$\  $$ |$$  __$$\ $$  _____|      $$ |  $$ |$$ ___$$\ $$ |$$ |
    $$$$\ $$ |$$ /  $$ |      $$ /  \__|$$ |  $$ |$$ /  $$ |$$$$\ $$ |$$ /  \__|$$ |            \$$\ $$  |\_/   $$ |$$ |$$ |
    $$ $$\$$ |$$ |  $$ |      $$ |      $$$$$$$$ |$$$$$$$$ |$$ $$\$$ |$$ |$$$$\ $$$$$\           \$$$$  /   $$$$$ / $$ |$$ |
    $$ \$$$$ |$$ |  $$ |      $$ |      $$  __$$ |$$  __$$ |$$ \$$$$ |$$ |\_$$ |$$  __|          $$  $$<    \___$$\ \__|\__|
    $$ |\$$$ |$$ |  $$ |      $$ |  $$\ $$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |  $$ |$$ |            $$  /\$$\ $$\   $$ |
    $$ | \$$ | $$$$$$  |      \$$$$$$  |$$ |  $$ |$$ |  $$ |$$ | \$$ |\$$$$$$  |$$$$$$$$\       $$ /  $$ |\$$$$$$  |$$\ $$\
    \__|  \__| \______/        \______/ \__|  \__|\__|  \__|\__|  \__| \______/ \________|      \__|  \__| \______/ \__|\__|
*/


    const [open, setOpen] = useState(false);

    function Hide(){


        flagClose = false;

        DropCSS_Basket = "fade-out BasketVoidDrop";
        setOpen(flagClose)

    }
    function Open(){

        if(flagClose){
            DropCSS_Basket = "fade-out BasketVoidDrop";
            setOpen(!flagClose);
            flagClose = false;
        }
        else{
            DropCSS_Basket = "fade-in BasketVoidDrop";
            setOpen(!flagClose);
            flagClose = true;
        }
    }

 return(
     <div  className="Basket">

            <div>

                <div className="FakeHeader2">
                    <CSSTransition in={!open}
                               timeout={200}
                               classNames="DropAnim"
                               onEntering={() => setOpen(open)}
                               onExited={() => setOpen(open)}
                    ><div onPointerLeave={Hide}   className={DropCSS_Basket}>{props.children}</div></CSSTransition></div>
                <img onClick={Open}  src={Basket}/>


            </div>

        </div>
    );
};

function DropdownBasketVoid() {
    return (
        <div>
            <div className="Oooops-Text">#Ooops</div>
            <div className="BasketVoidDrop-Void-Text">Кажется ваша корзина пуста</div>
            <div className="BasketVoidDrop-sub-text">Добавьте хотя бы один товар, чтобы сделать заказ</div>



        </div>


    );
}


const DropdownBasket = observer(() => {

    const {buyer} = useContext(Context)

    const [price, setPrice] = useState(0)
    var basket

    useEffect(() =>{
        buyer.setBasket(JSON.parse(localStorage.getItem('cart')))
        basket = buyer.basket
        let total = 0
        basket.forEach(element => total = element.price * element.products_count + total)

        setPrice(total)
    }, [buyer.basketCount2])

    useEffect(() =>{
        buyer.setBasket(JSON.parse(localStorage.getItem('cart')))
        basket = buyer.basket
        let total = 0
        basket.forEach(element => total = element.price * element.products_count + total)
        setPrice(total)
    }, [buyer.basketCount])




    return(
        <div className="dropdown-basket-cot">
            <div className="dropdown-basket-container">
                <div className="basket-cot">
                    {buyer.basket.map(game => <DropdownBasketItem key={game.id_product} buyer1={game}/>)}
                </div>
                <div className="dropdown-basket-dash-line"></div>
                <div className="dropdown-basket-dash-line-text-cont">
                    <div className="dropdown-basket-dash-line-under-text">Итого</div><div id="Price" className="dropdown-basket-dash-line-under-text">{price}р</div>
                </div>
                <div className="BasketVoidDrop-Container-back-button">

                    <div className="BasketVoidDrop-back-text">Оформить заказ</div>
                    <img id="BasketDrop-Arrow-back" src={Arrow}></img>
                </div>
            </div>

        </div>

    );
})
const DropdownBasketItem = ({buyer1}) => {
    const [load, setLoad] = useState(false)
    const[game, setGame] = useState({})


    const {buyer} = useContext(Context)
    const[count, setCount] = useState(1)
    let nav = useNavigate();

    function deleteElem(){
        const oldCart = buyer.basket
        var index = oldCart.findIndex(obj => obj.id_product===buyer1.id_product);
        oldCart.splice(index,1);
        localStorage.setItem('cart', JSON.stringify(oldCart))
        if(buyer.isAuth===true){
            delBasket(buyer.user.id,buyer1.id_product).then(data => {})
        }
        buyer.setBasket(oldCart)
        buyer.setBasketCount(buyer.basketCount - 1)
    }
    function minusCounter(){
        if(count === 1){
            deleteElem()
        }
        else{
            const newCount = count - 1
            setCount(newCount)
            var oldCart = buyer.basket
            var index = oldCart.findIndex(obj => obj.id_product===buyer1.id_product);
            oldCart.splice(index,1, {id_product: game.id_product,  products_count: newCount, price: game.price});
            buyer.setBasket(oldCart)
            if(buyer.isAuth===true){
                updBasket(buyer.user.id,buyer1.id_product,newCount).then(data => {})
            }
            localStorage.setItem('cart', JSON.stringify(oldCart))
            buyer.setBasketCount2(buyer.basketCount2 + 1)
        }
    }
    function plusCounter(){
        const newCount = count + 1
        setCount(newCount)
        var oldCart = buyer.basket
        var index = oldCart.findIndex(obj => obj.id_product==buyer1.id_product);
        oldCart.splice(index,1, {id_product: game.id_product,  products_count: newCount, price: game.price});
        var newCart = oldCart
        buyer.setBasket(newCart)
        if(buyer.isAuth===true){
            updBasket(buyer.user.id,buyer1.id_product,newCount).then(data => {})
        }
        localStorage.setItem('cart', JSON.stringify(oldCart))
        buyer.setBasketCount2(buyer.basketCount2 + 1)


    }

    useEffect(() => {
        setTimeout(() => {
            setLoad(!load)
            },500

        )
    },[])
    useEffect(() => {
        setCount(buyer1.products_count)
    }, [buyer.basketCount2])


    useEffect(() => {
            fetchOneGame(buyer1.id_product).then(data => {
                setGame(data)

            })
        setCount(buyer1.products_count)
    },[load])

    return(
      <div  className="dropdown-basket-container-item">
        <img onClick={() => nav('/Game/' + game.id_product)} src={game.little_picture} className="dropdown-basket-img"></img>
          <div onClick={() => nav('/Game/' + game.id_product)} className="dropdown-basket-name">{game.game_name}</div>
          <div className="dropdown-basket-price">{game.price}</div>
          <div className="dropdown-basket-counter"><div  className="dropdown-basket-counter-symbol" onClick={() => minusCounter()}> -</div ><div className="dropdown-basket-counter-symbol">{count}</div><div className="dropdown-basket-counter-symbol" onClick={() => plusCounter()}>+</div> </div>
            <img onClick={() => deleteElem()} src={Cancel} className="dropdown-basket-cancel"/>
            <div className="dropdown-basket-line"></div>
      </div>


    );
}


function NavProf(props){

    const[open, setOpen] = useState(false);
    function Hide(){
        flagClose = false;
        DropCSS_Profile = "fade-out dropdown-profile";
        setOpen(flagClose)

    }
    function Open(){

        if(flagClose){
            DropCSS_Profile = "fade-out dropdown-profile";
            setOpen(!flagClose);
            flagClose = false;
        }
        else{
            DropCSS_Profile = "fade-in dropdown-profile";
            setOpen(!flagClose);
            flagClose = true;
        }
    }

    return(
        <div className="Profile" >
            <div className="FakeHeader">

                <CSSTransition in={!open}
                               timeout={200}
                               classNames="DropAnim"
                ><div onPointerLeave={Hide} className={DropCSS_Profile}>{props.children}</div></CSSTransition></div>
            <img onClick={Open} src={Profile}/>



        </div>
    );
};
const DropdownProfile = observer(() => {




    const {buyer} = useContext(Context)



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuth, setIsAuth] = useState(buyer.isAuth)
    const [flag, setFlag] = useState(false)

    function chageFlag(){
        setFlag(!flag)

    }


    const logIn = async () => {
        try {
            let data;
            data = await loginBuyer(email, password);
            buyer.setUser(data)
            buyer.setIsAuth(true);
            setIsAuth(buyer.isAuth)
            let basket = buyer.basket;
            var buyerIdBuyer = buyer.user.id
            setTimeout(() => {

                basket.forEach(element => {pushBasket(parseInt(buyerIdBuyer),element.id_product,element.products_count,element.price )})
                setTimeout(() => {
                    getBasket(buyerIdBuyer).then(data => {
                        var newData = data;

                        if(newData.length===0){
                            console.log(111)
                        }
                        else{
                            console.log(222)
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



        } catch (e){
            alert(e.response.data.message)
        }

    }
    const sigIn = async () => {
        try {

            const data = await registration(email, password);
            buyer.setUser(data)
            buyer.setIsAuth(true);
            setIsAuth(buyer.isAuth)
            let basket = buyer.basket;
            var buyerIdBuyer = buyer.user.id
            setTimeout(() => {

                basket.forEach(element => pushBasket(parseInt(buyerIdBuyer),element.id_product,element.products_count,element.price))
                getBasket(buyerIdBuyer).then(data => {
                    var newData = data;
                    var id_product
                    for(let i=0; i<newData.length; i++){
                        id_product = newData[i].productIdProduct
                        delete newData[i].productIdProduct
                        newData[i].id_product = id_product
                    }
                    buyer.setBasket(newData)
                    localStorage.setItem('cart',JSON.stringify(newData))
                })

            },1000)
        } catch (e){
            alert(e.response.data.message)
        }
    }
    const logOut = async () => {
        setFlag(flag)
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        buyer.setBasketCount(0)
        buyer.setBasket([])
        buyer.setUser({})
        buyer.setIsAuth(false);
        setIsAuth(false);

    }

    return(
        <div className="dropdown-profile-cot">
            <div className="dropdown-profile-container">
                { isAuth === false ?
                    <div>
                    <input value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" type="email" id="email" className="profile-input" placeholder="E-mail"/>
                    <input value={password} onChange={e => setPassword(e.target.value)} autoComplete="password" type="password" id="password" className="profile-input" placeholder="Пароль"/>
                        {flag === false ?
                    <div className="profile-container-back-button" onClick={logIn}>
                        <div className="BasketVoidDrop-back-text">Войти</div>
                        <img id="BasketDrop-Arrow-back" src={Arrow}></img>
                    </div> :
                            <div className="profile-container-back-button" onClick={sigIn}>
                                <div className="BasketVoidDrop-back-text">Регистрация</div>
                                <img id="BasketDrop-Arrow-back" src={Arrow}></img>
                            </div>    }
                        {flag === false ? <div onClick={chageFlag} className="RegisterButton">Нет аккаунта? Зарегистрироваться!</div> : <div className="RegisterButton" onClick={chageFlag}>Есть аккаунт? Войти!</div> }</div> :
                    <div className="profile-data-con">
                        <div className="Avatar"><img className="AvatarImg" src={MonoBear}/></div>
                        <div className="profile-data">
                            <div className="email">{buyer.user.email}</div>
                            <div className="profile-settings">Настройки профиля</div>
                        </div>
                        <ExitToAppIcon onClick={logOut} className="exit"/>
                    </div>

                }
            </div>

        </div>

    );
})



export default Header