import React from "react";
import './index.scss';

import Blob1 from "./img/Path1.svg";
import Blob2 from "./img/Path2.svg";
import Blob3 from "./img/Path3.svg";
import Blob4 from "./img/Path4.svg";

import Arrow from "./img/Icon ionic-ios-arrow-back.svg";


function App() {
  return (

      <div>
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

         </div>




      </div>
  );
}

export default App;