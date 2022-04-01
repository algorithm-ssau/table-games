import React from "react";
import './scss/index.scss';

import Header from './Header';
import Footer from './Footer'

import Blob1 from "./img/Path1.svg";
import Blob2 from "./img/Path2.svg";
import Blob3 from "./img/Path3.svg";
import Blob4 from "./img/Path4.svg";
import Blob5 from "./img/Path11.svg";

import Timer from "./img/Icon ionic-ios-timer.svg";
import CheckMarkCircle from "./img/Icon ionic-ios-checkmark-circle-outline.svg";
import Percentage from "./img/percentage.svg";
import LibrarySharp from "./img/library-sharp.svg";




import Arrow from "./img/Icon ionic-ios-arrow-back.svg";


function Main() {
  return (

      <div>
          <Header/>

          <div className="Banner">

            <img className="Banner-Blob" src={Blob1}></img>
            <img className="Banner-Blob2" src={Blob2}></img>
            <div className="Banner-Container">
                <div className="Banner-Name">НЕМЕЗИДА</div>
                <div className="Banner-Sub-Name">КАРНОМОРФЫ</div>
                <div className="Banner-text">
                    Всё произошло из-за одной-единственной кошки. Должно быть, она пробралась на борт во время нашей встречи с научным кораблём "Адрастея". Забрав нужные нам образцы, мы совершили обратный гиперпрыжок, и все благополучно уснули. Все, кроме кошки. Даже девять жизней не могли её спасти.
                </div>
            <button className="Banner-Button">В корзину</button>
            </div>

            <div className="Banner-Glass"></div>
      </div>

         <div className="Container">
             <div className="Container-Headlines">
                 <div className="Container-Headlines-Name">Новинки</div>
                <div className="Container-UnderText"></div>
                 <img className="Container-Blob3" src={Blob3}></img>
                 <div className="Container-Container" id="News">
                    <img className="left-arrow-container" src={Arrow} ></img>
                     <div className="Container-for-list">
                        <div className="list-container">
                            <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                            <div className="list-container-name">Солнечный шторм</div>
                            <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                            <div className="list-container-price">1490р</div>
                        </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                     </div>

                     <img className="right-arrow-container" src={Arrow}></img>
                 </div>

            </div>

             <div className="Container-Headlines">
                 <div className="Container-Headlines-Name">Популярное</div>
                 <div className="Container-UnderText" id="UnderTextPopular"></div>
                 <img className="Container-Blob4" src={Blob4}></img>
                 <div className="Container-Container" id="Popular">
                     <img className="left-arrow-container" src={Arrow} ></img>
                     <div className="Container-for-list">
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                         <div className="list-container">
                             <div className="list-container-img-shadow"><div className="list-container-img" id="img1"></div></div>
                             <div className="list-container-name">Солнечный шторм</div>
                             <div className="list-container-sub-name">Почувствуй ярость солнца!</div>
                             <div className="list-container-price">1490р</div>
                         </div>
                     </div>

                     <img className="right-arrow-container" src={Arrow}></img>
                 </div>

             </div>

             <div className="Container-Headlines">
                 <div className="Container-Headlines-Name">Почему мы</div>
                 <div className="Container-UnderText" id="UnderTextWe"></div>
                 <img className="Container-Blob5" src={Blob5}></img>
                 <div className="Container-Container" id="We">
                     <div className="Container-for-list">
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img"  src={Timer}></img>
                             <div className="list-container-why-we-name">Быстрая доставка</div>
                             <div className="list-container-why-we-sub-name">Мы оперативно доставим настольные игры по России и по всему миру удобным Вам способом</div>
                         </div>
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img" src={CheckMarkCircle}></img>
                             <div className="list-container-why-we-name">Гарантия качества</div>
                             <div className="list-container-why-we-sub-name">Мы в #BoardGameBar гордимся качеством предоставляемых нами игр</div>
                         </div>
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img" src={Percentage}></img>
                             <div className="list-container-why-we-name">Акции и Скидки</div>
                             <div className="list-container-why-we-sub-name">Для наших клиентов действует система накопительных скидок и бонусных баллов</div>
                         </div>
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img" src={LibrarySharp} id="Shirok"></img>
                             <div className="list-container-why-we-name" >Широкий ассортимент</div>
                             <div className="list-container-why-we-sub-name">Для наших клиентов действует система накопительных скидок и бонусных баллов</div>
                         </div>
                     </div>

                 </div>

             </div>
             <Footer/>
         </div>



      </div>
  );
}

export default Main;