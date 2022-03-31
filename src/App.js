import React from "react";
import './index.scss';

import Blob1 from "./img/Path1.svg";
import Blob2 from "./img/Path2.svg";
import Blob3 from "./img/Path3.svg";


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


            </div>


         </div>
      </div>
  );
}

export default App;