import React from "react";
import '../css/index.scss'

const ListContainer = ({game}) =>{
    return(
        <div className="list-container">
            <div className="list-container-img-shadow"><img className="list-container-img" src={game.little_picture}></img></div>
            <div className="list-container-name">{game.game_name}</div>
            <div className="list-container-sub-name">{game.little_description}</div>
            <div className="list-container-price">{game.price}р</div>
        </div>
    )
}

export default ListContainer;